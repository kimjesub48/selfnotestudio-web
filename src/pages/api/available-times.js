// 예약 가능한 시간을 가져오는 API
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({ message: '날짜가 필요합니다' });
    }

    // 디버깅: 받은 날짜 로그
    console.log('🔍 API 요청 받은 날짜:', date);

    // 환경 변수 확인
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!clientId || !clientSecret || !calendarId) {
      console.error('환경 변수가 설정되지 않았습니다:', {
        clientId: !!clientId,
        clientSecret: !!clientSecret,
        calendarId: !!calendarId
      });
      return res.status(500).json({ 
        message: 'Google Calendar API 설정이 필요합니다' 
      });
    }

    // OAuth2 클라이언트 설정
    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/auth/callback`
    );

    // 파일에서 토큰 가져오기
    const tokensPath = path.join(process.cwd(), 'google-calendar-tokens.json');
    
    let tokens;
    try {
      if (!fs.existsSync(tokensPath)) {
        return res.status(401).json({ 
          success: false, 
          message: 'Google Calendar API 인증이 필요합니다. 관리자가 /api/auth/google 로 접속하여 인증을 진행해야 합니다.' 
        });
      }
      
      const tokensData = fs.readFileSync(tokensPath, 'utf-8');
      tokens = JSON.parse(tokensData);
      console.log('✅ 토큰 파일에서 읽기 성공');
    } catch (fileError) {
      console.error('토큰 파일 읽기 실패:', fileError);
      return res.status(401).json({ 
        success: false, 
        message: 'Google Calendar API 인증 파일을 읽을 수 없습니다.' 
      });
    }

    oauth2Client.setCredentials(tokens);

    // Access token 만료 시 자동 갱신
    oauth2Client.on('tokens', (newTokens) => {
      console.log('🔄 토큰 자동 갱신됨');
      
      // 새로운 토큰을 파일에 저장
      const updatedTokens = {
        access_token: newTokens.access_token,
        refresh_token: newTokens.refresh_token || tokens.refresh_token, // refresh_token이 없으면 기존 것 유지
        expiry_date: newTokens.expiry_date,
        updated_at: new Date().toISOString()
      };
      
      try {
        fs.writeFileSync(tokensPath, JSON.stringify(updatedTokens, null, 2), 'utf-8');
        console.log('✅ 갱신된 토큰이 파일에 저장되었습니다');
      } catch (fileError) {
        console.error('토큰 파일 저장 실패:', fileError);
      }
    });

    // Calendar API 인스턴스 생성
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // 요청된 날짜의 시작과 끝 시간 설정 (한국 시간 기준)
    const startDate = new Date(`${date}T00:00:00+09:00`); // 한국 시간 00:00
    const endDate = new Date(`${date}T23:59:59+09:00`);   // 한국 시간 23:59
    
    // 디버깅: 날짜 변환 로그
    console.log('🔍 변환된 시작 날짜:', startDate.toISOString());
    console.log('🔍 변환된 종료 날짜:', endDate.toISOString());

    // 해당 날짜의 이벤트 가져오기
    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items || [];

    // 운영 시간 (13:00 ~ 23:00, 1시간 단위)
    const operatingHours = [
      '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
      '19:00', '20:00', '21:00', '22:00', '23:00'
    ];

    // 예약된 시간 추출 (시간 범위 고려)
    const bookedTimes = new Set();
    const bookedTimeDetails = {}; // 시간별 예약자 정보
    
    events.forEach(event => {
      const startTime = new Date(event.start.dateTime || event.start.date);
      const endTime = new Date(event.end.dateTime || event.end.date);
      
      // 디버깅: 이벤트 시간 로그
      console.log(`📅 이벤트: ${event.summary}`);
      console.log(`   시작: ${startTime.toISOString()}`);
      console.log(`   종료: ${endTime.toISOString()}`);
      
      // 하루 종일 이벤트인지 확인 (dateTime이 없으면 하루 종일)
      if (!event.start.dateTime && !event.end.dateTime) {
        console.log(`   → 하루 종일 이벤트, 스킵`);
        return; // 하루 종일 이벤트는 스킵
      }
      
      // 비공개 일정 필터링
      if (event.visibility === 'private') {
        console.log(`   → 비공개 일정, 스킵`);
        return; // 비공개 일정은 스킵
      }
      
      // 예약자 이름 추출 및 마스킹
      const summary = event.summary || '예약';
      const namePart = summary.split(' ')[0]; // 첫 번째 단어를 이름으로 추출
      
      // 이름 마스킹 (김주현 → 김*현)
      let maskedName = namePart;
      if (namePart.length >= 2) {
        if (namePart.length === 2) {
          maskedName = namePart[0] + '*'; // 김수 → 김*
        } else {
          const middle = '*'.repeat(namePart.length - 2);
          maskedName = namePart[0] + middle + namePart[namePart.length - 1]; // 김주현 → 김*현
        }
      }
      
      // 시간 범위 내의 모든 1시간 단위 슬롯을 예약된 것으로 표시
      // 시작 시간이 포함된 시간대부터 종료 시간이 포함된 시간대까지 모두 예약됨
      const startHour = startTime.getHours();
      const endHour = endTime.getHours();
      const endMinute = endTime.getMinutes();
      
      // 시작 시간부터 종료 시간까지 순회
      for (let hour = startHour; hour <= endHour; hour++) {
        // 13:00 ~ 23:00 범위 내에서만 처리
        if (hour >= 13 && hour <= 23) {
          // 종료 시간이 정확히 시간 단위(분이 0)이고, 현재 시간이 종료 시간과 같으면 제외
          // 예: 15:00 ~ 16:00 예약 시, 16:00은 예약되지 않음
          if (hour === endHour && endMinute === 0) {
            console.log(`   → ${hour}:00 (종료 시간 정각, 스킵)`);
            continue;
          }
          
          const normalizedHour = `${hour.toString().padStart(2, '0')}:00`;
          bookedTimes.add(normalizedHour);
          
          // 예약자 정보 저장 (시간별)
          if (!bookedTimeDetails[normalizedHour]) {
            bookedTimeDetails[normalizedHour] = [];
          }
          bookedTimeDetails[normalizedHour].push({
            name: maskedName,
            summary: summary
          });
          
          console.log(`   → 예약 시간: ${normalizedHour} (${maskedName})`);
        }
      }
    });

    // 예약 가능한 시간 계산
    const availableTimes = operatingHours.filter(time => {
      // Set에서 확인
      return !bookedTimes.has(time);
    });

    // 응답 데이터
    const result = {
      date: date,
      availableTimes: availableTimes,
      bookedTimes: Array.from(bookedTimes), // Set을 Array로 변환
      bookedTimeDetails: bookedTimeDetails, // 시간별 예약자 정보
      totalSlots: operatingHours.length,
      availableSlots: availableTimes.length,
      events: events // 디버깅용으로 이벤트 정보도 포함
    };

    console.log(`실제 캘린더 연동 - 날짜 ${date}의 예약 현황:`, result);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('예약 가능 시간 조회 오류:', error);
    
    // 인증 오류인 경우
    if (error.message.includes('invalid_grant') || error.message.includes('unauthorized')) {
      return res.status(401).json({ 
        success: false,
        message: 'Google Calendar 인증이 필요합니다. 관리자에게 문의하세요.' 
      });
    }

    // 기타 오류
    res.status(500).json({ 
      success: false,
      message: '예약 현황을 가져오는 중 오류가 발생했습니다.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

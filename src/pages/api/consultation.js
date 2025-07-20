// 상담 신청 API
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      name,
      phone,
      people,
      service,
      message,
      youtubeUrl,
      videoTitle,
      timestamp
    } = req.body;

    // 필수 필드 검증
    if (!name || !phone || !people || !service) {
      return res.status(400).json({ 
        message: '필수 정보가 누락되었습니다.' 
      });
    }

    // 상담 신청 데이터 구성
    const consultationData = {
      name,
      phone,
      people,
      service,
      message: message || '',
      youtubeUrl: youtubeUrl || '',
      videoTitle: videoTitle || '',
      timestamp: timestamp || new Date().toISOString(),
      status: 'pending' // 상담 상태: pending, contacted, completed
    };

    // 여기서 데이터 저장 및 알림 발송
    console.log('새로운 상담 신청:', consultationData);

    // 1. 사장님에게 이메일 알림 발송 (상담 신청 내용)
    console.log('사장님용 이메일 알림 API 호출 시도...');
    
    const ownerEmailData = {
      to: process.env.OWNER_EMAIL || 'owner@selfnotestudio.co.kr',
      subject: '새로운 상담 신청이 접수되었습니다',
      html: `
        <h2>🎤 셀프노트 스튜디오 상담 신청</h2>
        <p><strong>👤 이름:</strong> ${name}</p>
        <p><strong>📞 연락처:</strong> ${phone}</p>
        <p><strong>👥 사용인원:</strong> ${people}명</p>
        <p><strong>🎯 이용목적:</strong> ${service}</p>
        <p><strong>💬 상담내용:</strong> ${message || '없음'}</p>
        ${youtubeUrl ? `<p><strong>🎵 선택곡:</strong> ${videoTitle}</p><p><strong>🔗 URL:</strong> <a href="${youtubeUrl}">${youtubeUrl}</a></p>` : ''}
        <p><strong>⏰ 신청시간:</strong> ${new Date(timestamp).toLocaleString('ko-KR')}</p>
        <br>
        <p>빠른 연락 부탁드립니다! 🙏</p>
      `
    };

    try {
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://selfnote.co.kr'}/api/email-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ownerEmailData)
      });

      console.log('사장님 이메일 API 응답 상태:', emailResponse.status);
      
      if (emailResponse.ok) {
        const emailResult = await emailResponse.json();
        console.log('사장님 이메일 전송 성공 - 응답:', emailResult);
      } else {
        const errorText = await emailResponse.text();
        console.log('사장님 이메일 전송 실패 - 응답:', errorText);
      }
    } catch (error) {
      console.error('사장님 이메일 API 호출 오류:', error);
      console.error('오류 상세:', error.message);
    }

    // 2. 손님에게 카카오 알림톡 발송 (접수 완료 알림)
    console.log('손님용 카카오 알림톡 API 호출 시도...');
    try {
      // Cafe24 고정 IP 서버의 실제 API 엔드포인트
      const alimtalkUrl = process.env.ALIMTALK_SERVER_URL || 'http://175.125.92.29:3000/sendKakao';
      
      // 서버에서 요구하는 형식으로 데이터 전송
      const formData = new URLSearchParams();
      formData.append('receiver_1', phone);
      
      const alimtalkResponse = await fetch(alimtalkUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
      });

      console.log('카카오 알림톡 API 응답 상태:', alimtalkResponse.status);
      
      if (!alimtalkResponse.ok) {
        const errorText = await alimtalkResponse.text();
        console.error('카카오 알림톡 전송 실패 - 응답:', errorText);
      } else {
        const successData = await alimtalkResponse.json();
        console.log('카카오 알림톡 전송 성공 - 응답:', successData);
      }
    } catch (error) {
      console.error('카카오 알림톡 API 호출 오류:', error);
      console.error('오류 상세:', error.message);
    }

    // 3. 데이터베이스 저장 (향후 구현)
    // await saveConsultation(consultationData);

    // 임시로 콘솔에 로그 출력
    console.log('=== 새로운 상담 신청 ===');
    console.log(`이름: ${name}`);
    console.log(`연락처: ${phone}`);
    console.log(`사용인원: ${people}명`);
    console.log(`이용목적: ${service}`);
    console.log(`상담내용: ${message}`);
    if (youtubeUrl) {
      console.log(`선택곡: ${videoTitle}`);
      console.log(`URL: ${youtubeUrl}`);
    }
    console.log(`신청시간: ${timestamp}`);
    console.log('========================');

    res.status(200).json({ 
      success: true, 
      message: '상담 신청이 접수되었습니다.',
      consultationId: Date.now().toString() // 임시 ID
    });

  } catch (error) {
    console.error('상담 신청 처리 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다.' 
    });
  }
} 
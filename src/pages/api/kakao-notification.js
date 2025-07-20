// 카카오톡 알림 발송 API
export default async function handler(req, res) {
  console.log('=== 카카오톡 알림 API 진입 ===');
  console.log('요청 메서드:', req.method);
  
  if (req.method !== 'POST') {
    console.log('POST가 아닌 메서드로 요청됨');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('POST 요청 확인됨');
  console.log('요청 본문:', req.body);

  try {
    const { name, phone, people, service, message, youtubeUrl, videoTitle, timestamp } = req.body;
    
    console.log('데이터 파싱 완료');
    console.log('카카오톡 API 호출 시작');
    // REST API 키 사용 (OAuth 토큰이 아님)
    const KAKAO_REST_API_KEY = '669f7a78e4185f5dfb818decee5a7698';
    console.log('사용할 REST API 키:', KAKAO_REST_API_KEY ? `${KAKAO_REST_API_KEY.substring(0, 10)}...` : '키 없음');
    
    // REST API 키가 없으면 에러
    if (!KAKAO_REST_API_KEY) {
      console.error('카카오톡 REST API 키가 설정되지 않았습니다.');
      return res.status(500).json({ 
        success: false, 
        message: '카카오톡 API 키가 설정되지 않았습니다.' 
      });
    }

    // 카카오톡 메시지 내용 구성
    const kakaoMessage = `🎤 셀프노트 스튜디오 상담 신청

👤 이름: ${name}
📞 연락처: ${phone}
👥 사용인원: ${people}명
🎯 이용목적: ${service}
💬 상담내용: ${message || '없음'}
${youtubeUrl ? `🎵 선택곡: ${videoTitle}\n🔗 URL: ${youtubeUrl}` : ''}
⏰ 신청시간: ${new Date(timestamp).toLocaleString('ko-KR')}

빠른 연락 부탁드립니다! 🙏`;

    // 카카오톡 메시징 API 호출 (REST API 키 사용)
    const templateObject = {
      object_type: 'text',
      text: kakaoMessage,
      link: {
        web_url: process.env.NEXT_PUBLIC_SITE_URL || 'https://selfnotestudio.co.kr'
      }
    };

    console.log('전송할 템플릿 객체:', templateObject);
    console.log('카카오 API 요청 시작...');

    const requestBody = new URLSearchParams({
      template_object: JSON.stringify(templateObject)
    });

    console.log('요청 본문:', requestBody.toString());

    const kakaoResponse = await fetch('https://kapi.kakao.com/v2/api/talk/memo/default/send', {
      method: 'POST',
      headers: {
        'Authorization': `KakaoAK ${KAKAO_REST_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: requestBody
    });

    console.log('카카오 API 응답 받음. 상태:', kakaoResponse.status);

    if (kakaoResponse.ok) {
      console.log('카카오톡 알림 전송 성공');
      res.status(200).json({ success: true, message: '카카오톡 알림이 전송되었습니다.' });
    } else {
      const errorData = await kakaoResponse.json();
      console.error('카카오톡 알림 전송 실패 - 상태:', kakaoResponse.status);
      console.error('카카오톡 API 에러 상세:', errorData);
      console.error('사용된 토큰:', KAKAO_REST_API_KEY ? '키 있음' : '키 없음');
      res.status(500).json({ success: false, message: '카카오톡 알림 전송에 실패했습니다.' });
    }

  } catch (error) {
    console.error('카카오톡 알림 처리 오류:', error);
    console.error('에러 상세:', error.message);
    console.error('에러 스택:', error.stack);
    res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
  }
} 
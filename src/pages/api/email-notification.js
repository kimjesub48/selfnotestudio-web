// EmailJS를 사용한 이메일 알림 발송 API
export default async function handler(req, res) {
  console.log('=== 이메일 알림 API 진입 ===');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, phone, people, service, message, youtubeUrl, videoTitle, timestamp } = req.body;

    // 이메일 내용 구성
    const emailContent = `
🎤 셀프노트 스튜디오 상담 신청

📋 신청 정보:
• 이름: ${name}
• 연락처: ${phone}
• 사용인원: ${people}명
• 이용목적: ${service}
• 상담내용: ${message || '없음'}

${youtubeUrl ? `🎵 선택곡 정보:
• 곡명: ${videoTitle}
• URL: ${youtubeUrl}` : ''}

⏰ 신청시간: ${new Date(timestamp).toLocaleString('ko-KR')}

📞 빠른 연락 부탁드립니다!
    `;

    console.log('전송할 이메일 내용:', emailContent);

    // EmailJS API 호출
    const emailData = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_USER_ID,
      template_params: {
        to_email: process.env.ADMIN_EMAIL,
        from_name: '셀프노트 스튜디오 웹사이트',
        subject: `[상담신청] ${name}님의 녹음실 이용 상담`,
        message: emailContent,
        customer_name: name,
        customer_phone: phone,
        customer_people: people,
        customer_service: service,
        customer_message: message || '없음',
        youtube_title: videoTitle || '없음',
        youtube_url: youtubeUrl || '없음',
        request_time: new Date(timestamp).toLocaleString('ko-KR')
      }
    };

    console.log('EmailJS API 호출 시작...');

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    console.log('이메일 API 응답 상태:', response.status);

    if (response.ok) {
      console.log('이메일 전송 성공');
      res.status(200).json({ 
        success: true, 
        message: '이메일 알림이 전송되었습니다.' 
      });
    } else {
      const errorText = await response.text();
      console.error('이메일 전송 실패:', errorText);
      res.status(500).json({ 
        success: false, 
        message: '이메일 전송에 실패했습니다.' 
      });
    }

  } catch (error) {
    console.error('이메일 알림 처리 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다.' 
    });
  }
} 
import crypto from 'crypto';

// 네이버 클라우드 SMS 알림 발송 API
export default async function handler(req, res) {
  console.log('=== SMS 알림 API 진입 ===');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, phone, people, service, message, youtubeUrl, videoTitle, timestamp } = req.body;

    // SMS 메시지 내용 구성
    const smsMessage = `[셀프노트 스튜디오 상담신청]

이름: ${name}
연락처: ${phone}
사용인원: ${people}명
이용목적: ${service}
상담내용: ${message || '없음'}
${youtubeUrl ? `선택곡: ${videoTitle}` : ''}
신청시간: ${new Date(timestamp).toLocaleString('ko-KR')}

빠른 연락 부탁드립니다!`;

    console.log('전송할 SMS 메시지:', smsMessage);

    // 네이버 클라우드 SMS API 설정
    const serviceId = process.env.NAVER_SMS_SERVICE_ID;
    const accessKey = process.env.NAVER_ACCESS_KEY;
    const secretKey = process.env.NAVER_SECRET_KEY;
    const fromNumber = process.env.NAVER_FROM_NUMBER; // 발신번호
    const toNumber = process.env.ADMIN_PHONE_NUMBER; // 받을 번호 (사장님 번호)

    if (!serviceId || !accessKey || !secretKey || !fromNumber || !toNumber) {
      console.error('네이버 SMS 환경변수가 설정되지 않았습니다.');
      return res.status(500).json({ 
        success: false, 
        message: 'SMS 설정이 완료되지 않았습니다.' 
      });
    }

    // 인증 서명 생성
    const timestamp_auth = Date.now().toString();
    const method = 'POST';
    const url = `/sms/v2/services/${serviceId}/messages`;
    const message_signature = method + ' ' + url + '\n' + timestamp_auth + '\n' + accessKey;
    const signature = crypto.createHmac('sha256', secretKey).update(message_signature).digest('base64');

    // SMS 요청 데이터
    const requestData = {
      type: 'SMS',
      from: fromNumber,
      content: smsMessage,
      messages: [
        {
          to: toNumber
        }
      ]
    };

    console.log('네이버 SMS API 호출 시작...');

    // 네이버 클라우드 SMS API 호출
    const response = await fetch(`https://ncloud.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-apigw-timestamp': timestamp_auth,
        'x-ncp-iam-access-key': accessKey,
        'x-ncp-apigw-signature-v2': signature
      },
      body: JSON.stringify(requestData)
    });

    console.log('SMS API 응답 상태:', response.status);

    if (response.ok) {
      const result = await response.json();
      console.log('SMS 전송 성공:', result);
      res.status(200).json({ 
        success: true, 
        message: 'SMS 알림이 전송되었습니다.',
        messageId: result.requestId 
      });
    } else {
      const errorData = await response.json();
      console.error('SMS 전송 실패:', errorData);
      res.status(500).json({ 
        success: false, 
        message: 'SMS 전송에 실패했습니다.' 
      });
    }

  } catch (error) {
    console.error('SMS 알림 처리 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다.' 
    });
  }
} 
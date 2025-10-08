// Cafe24 서버용 카카오 알림톡 API
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// CORS 설정
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// 카카오 알림톡 발송 API
app.post('/api/send-alimtalk', async (req, res) => {
  const { phone } = req.body;
  
  console.log('=== 알림톡 요청 받음 ===');
  console.log('전화번호:', phone);

  // 알리고 정보
  const apikey = 'gsfprma05alogua7rmtwigr46cxzntzb';
  const userid = 'selfnote10';
  const senderkey = '006507751f3f2bb0cfce5a7cbb8b8bc2e1eaa027';
  const tpl_code = 'UA_9729';
  const sender = '010-7580-9997';
  const subject = '셀프노트 상담';
  const kakaoChatUrl = 'http://pf.kakao.com/_NhDxfM/chat';

  // 정확한 템플릿 메시지
  const message = `상담 신청이 접수되었습니다!
궁금한 점이나 빠른 상담이 필요하시면
아래 카카오채널 1:1채팅으로 바로 문의해 주세요`;

  const button_1 = JSON.stringify({
    button: [{
      name: '상담 바로가기',
      linkType: 'WL',
      linkMo: kakaoChatUrl,
      linkPc: kakaoChatUrl
    }]
  });

  try {
    console.log('알리고 API 호출 시작...');
    
    // form-data로 전송 (올바른 방식)
    const formData = new URLSearchParams();
    formData.append('apikey', apikey);
    formData.append('userid', userid);
    formData.append('senderkey', senderkey);
    formData.append('tpl_code', tpl_code);
    formData.append('sender', sender);
    formData.append('receiver_1', phone);
    formData.append('subject_1', subject);
    formData.append('message_1', message);
    formData.append('button_1', button_1);

    console.log('전송할 데이터:', {
      phone,
      subject,
      message: message.substring(0, 50) + '...'
    });

    const response = await axios.post('https://kakaoapi.aligo.in/akv10/alimtalk/send/', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    console.log('알림톡 전송 성공:', response.data);
    res.status(200).json({ 
      success: true, 
      result: response.data,
      message: '알림톡이 성공적으로 전송되었습니다.'
    });
  } catch (error) {
    console.error('알림톡 전송 실패:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: error.response?.data
    });
  }
});

// 서버 상태 확인용
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'running', 
    timestamp: new Date().toISOString(),
    message: 'Cafe24 알림톡 API 서버가 정상 실행 중입니다.'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Cafe24 알림톡 API 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`📞 알림톡 API: http://localhost:${PORT}/api/send-alimtalk`);
  console.log(`🔍 상태 확인: http://localhost:${PORT}/api/status`);
}); 
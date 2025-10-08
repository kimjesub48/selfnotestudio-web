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
  const { phone, name, people, service, message, videoTitle } = req.body;
  
  console.log('=== 알림톡 요청 받음 ===');
  console.log('전화번호:', phone);
  console.log('이름:', name);
  console.log('사용인원:', people);
  console.log('이용목적:', service);
  console.log('상담내용:', message);
  console.log('선곡:', videoTitle);

  // 알리고 정보
  const apikey = 'gsfprma05alogua7rmtwigr46cxzntzb';
  const userid = 'selfnote10';
  const senderkey = '006507751f3f2bb0cfce5a7cbb8b8bc2e1eaa027';
  const tpl_code = 'UB_2801'; // 새로운 템플릿 코드
  const sender = '010-7580-9997';
  const subject = '셀프노트 상담';
  const kakaoChatUrl = 'http://pf.kakao.com/_NhDxfM/chat';

  // 새로운 템플릿 메시지 (변수 포함)
  const alimtalkMessage = `선곡: ${videoTitle || '없음'}
이름: ${name}
연락처: ${phone}
사용인원: ${people}명
이용목적: ${service}
상담내용: ${message || '없음'}

※'예약문의'라고 
메시지 보내주시면 상담이 시작됩니다.`;

  const button_1 = JSON.stringify({
    button: [{
      name: '상담 바로가기',
      linkType: 'WL',
      linkMo: kakaoChatUrl,
      linkPc: kakaoChatUrl
    }]
  });

  try {
    const formData = new URLSearchParams();
    formData.append('apikey', apikey);
    formData.append('userid', userid);
    formData.append('senderkey', senderkey);
    formData.append('tpl_code', tpl_code);
    formData.append('sender', sender);
    formData.append('receiver_1', phone);
    formData.append('subject_1', subject);
    formData.append('message_1', alimtalkMessage);
    formData.append('button_1', button_1);

    console.log('알리고 API 요청 데이터:');
    console.log('템플릿 코드:', tpl_code);
    console.log('메시지:', alimtalkMessage);

    const response = await axios.post('https://kakaoapi.aligo.in/akv10/alimtalk/send/', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('알리고 API 응답:', response.data);
    res.status(200).json({ success: true, result: response.data });

  } catch (error) {
    console.error('알림톡 발송 오류:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      error: error.response?.data || error.message 
    });
  }
});

// 사장님용 카카오 알림톡 발송 API
app.post('/api/send-owner-alimtalk', async (req, res) => {
  const { phone, name, people, service, message, videoTitle, timestamp } = req.body;
  
  console.log('=== 사장님용 알림톡 요청 받음 ===');
  console.log('전화번호:', phone);
  console.log('이름:', name);
  console.log('사용인원:', people);
  console.log('이용목적:', service);
  console.log('상담내용:', message);
  console.log('선곡:', videoTitle);
  console.log('신청시간:', timestamp);

  // 알리고 정보
  const apikey = 'gsfprma05alogua7rmtwigr46cxzntzb';
  const userid = 'selfnote10';
  const senderkey = '006507751f3f2bb0cfce5a7cbb8b8bc2e1eaa027';
  const tpl_code = 'UB_2801'; // 새로운 템플릿 코드
  const sender = '010-7580-9997';
  const subject = '셀프노트 상담';
  const kakaoChatUrl = 'http://pf.kakao.com/_NhDxfM/chat';

  // 사장님용 새로운 템플릿 메시지
  const ownerMessage = `선곡: ${videoTitle || '없음'}
이름: ${name}
연락처: ${phone}
사용인원: ${people}명
이용목적: ${service}
상담내용: ${message || '없음'}

※'예약문의'라고 
메시지 보내주시면 상담이 시작됩니다.`;

  const button_1 = JSON.stringify({
    button: [{
      name: '상담 바로가기',
      linkType: 'WL',
      linkMo: kakaoChatUrl,
      linkPc: kakaoChatUrl
    }]
  });

  try {
    const formData = new URLSearchParams();
    formData.append('apikey', apikey);
    formData.append('userid', userid);
    formData.append('senderkey', senderkey);
    formData.append('tpl_code', tpl_code);
    formData.append('sender', sender);
    formData.append('receiver_1', phone);
    formData.append('subject_1', subject);
    formData.append('message_1', ownerMessage);
    formData.append('button_1', button_1);

    console.log('사장님용 알리고 API 요청 데이터:');
    console.log('템플릿 코드:', tpl_code);
    console.log('메시지:', ownerMessage);

    const response = await axios.post('https://kakaoapi.aligo.in/akv10/alimtalk/send/', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('사장님용 알리고 API 응답:', response.data);
    res.status(200).json({ success: true, result: response.data });

  } catch (error) {
    console.error('사장님용 알림톡 발송 오류:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      error: error.response?.data || error.message 
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
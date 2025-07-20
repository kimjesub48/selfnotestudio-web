// 카카오톡 메시지 테스트 스크립트
const https = require('https');

async function testKakaoMessage() {
  const KAKAO_ACCESS_TOKEN = 'KYcBciJf8rZzoZt_FxjJSsfqTdvmas9qAAAAAQoXNd0AAAGYIKiGcs2yTeNnt1bO';
  
  const templateObject = {
    object_type: 'text',
    text: '🎤 셀프노트 스튜디오 상담 신청 테스트\n\n이 메시지가 보이면 카카오톡 연동이 성공입니다!',
    link: {
      web_url: 'https://selfnotestudio.co.kr'
    }
  };

  const requestBody = new URLSearchParams({
    template_object: JSON.stringify(templateObject)
  }).toString();

  const options = {
    hostname: 'kapi.kakao.com',
    port: 443,
    path: '/v2/api/talk/memo/default/send',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${KAKAO_ACCESS_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(requestBody)
    }
  };

  console.log('카카오톡 메시지 전송 테스트 시작...');
  console.log('사용 토큰:', KAKAO_ACCESS_TOKEN.substring(0, 20) + '...');

  const req = https.request(options, (res) => {
    console.log('응답 상태:', res.statusCode);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const result = JSON.parse(data);
        if (res.statusCode === 200) {
          console.log('✅ 성공! 응답:', result);
        } else {
          console.log('❌ 실패! 에러:', result);
        }
      } catch (error) {
        console.log('❌ 응답 파싱 에러:', error.message);
        console.log('원본 응답:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.log('❌ 네트워크 에러:', error.message);
  });

  req.write(requestBody);
  req.end();
}

testKakaoMessage(); 
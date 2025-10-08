const https = require('https');

// 알리고 API 설정
const API_KEY = 'gsfprma05alogua7rmtwigr46cxzntzb';
const USER_ID = 'selfnote10';
const TPL_CODE = 'UA_9729';

// 템플릿 조회 API 호출
function getExactTemplate() {
  const postData = JSON.stringify({
    key: API_KEY,
    user_id: USER_ID,
    tpl_code: TPL_CODE
  });

  const options = {
    hostname: 'api.aligo.in',
    port: 443,
    path: '/tpl/list/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        console.log('=== 알리고 API 응답 ===');
        console.log(JSON.stringify(response, null, 2));
        
        if (response.list && response.list.length > 0) {
          const template = response.list[0];
          console.log('\n=== 승인된 템플릿 상세 정보 ===');
          console.log('템플릿 코드:', template.tpl_code);
          console.log('템플릿명:', template.tpl_name);
          console.log('발신 프로파일:', template.sender);
          
          console.log('\n=== 템플릿 내용 (정확한 형태) ===');
          console.log('---시작---');
          console.log(template.tpl_content);
          console.log('---끝---');
          
          console.log('\n=== 템플릿 내용 (문자 코드) ===');
          console.log('---시작---');
          for (let i = 0; i < template.tpl_content.length; i++) {
            const char = template.tpl_content[i];
            const code = char.charCodeAt(0);
            console.log(`위치 ${i}: '${char}' (코드: ${code})`);
          }
          console.log('---끝---');
          
          console.log('\n=== 버튼 정보 ===');
          if (template.tpl_button) {
            console.log(template.tpl_button);
          }
          
          console.log('\n=== 현재 코드와 비교 ===');
          const currentMessage = `상담 신청이 접수되었습니다!

궁금한 점이나 빠른 상담이 필요하시면 아래 카카오채널 1:1채팅으로 바로 문의해 주세요`;
          
          console.log('현재 코드 메시지:');
          console.log('---시작---');
          console.log(currentMessage);
          console.log('---끝---');
          
          console.log('\n=== 일치 여부 확인 ===');
          if (template.tpl_content === currentMessage) {
            console.log('✅ 메시지가 정확히 일치합니다!');
          } else {
            console.log('❌ 메시지가 일치하지 않습니다!');
            console.log('차이점:');
            console.log('템플릿 길이:', template.tpl_content.length);
            console.log('현재 길이:', currentMessage.length);
          }
        }
      } catch (error) {
        console.error('JSON 파싱 오류:', error);
        console.log('원본 응답:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('API 호출 오류:', error);
  });

  req.write(postData);
  req.end();
}

// 실행
getExactTemplate(); 
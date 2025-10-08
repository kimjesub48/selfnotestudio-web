// 알림톡 발송 결과 상세 확인 스크립트
const axios = require('axios');

async function checkAlimtalkResult() {
  console.log('=== 알림톡 발송 결과 상세 확인 ===');
  
  // 알리고 정보
  const apikey = 'gsfprma05alogua7rmtwigr46cxzntzb';
  const userid = 'selfnote10';
  
  // 최근 발송된 메시지 ID (로그에서 확인된 mid)
  const messageIds = [
    '1107130266',  // 최근 발송된 메시지 ID
    '1107029741'   // 이전 발송된 메시지 ID
  ];

  for (const mid of messageIds) {
    console.log(`\n📋 메시지 ID ${mid} 결과 확인 중...`);
    
    try {
      const formData = new URLSearchParams();
      formData.append('apikey', apikey);
      formData.append('userid', userid);
      formData.append('mid', mid);

      const response = await axios.post('https://kakaoapi.aligo.in/akv10/alimtalk/send_result/', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      console.log('📊 발송 결과:', response.data);
      
      if (response.data.code === 0) {
        console.log('✅ 조회 성공');
        if (response.data.info && response.data.info.length > 0) {
          const result = response.data.info[0];
          console.log(`📱 수신번호: ${result.receiver}`);
          console.log(`📊 발송상태: ${result.status}`);
          console.log(`📝 발송결과: ${result.result}`);
          console.log(`⏰ 발송시간: ${result.send_time}`);
          console.log(`💬 메시지: ${result.message}`);
        }
      } else {
        console.log('❌ 조회 실패:', response.data.message);
      }
      
    } catch (error) {
      console.error(`❌ 조회 오류:`, error.response?.data || error.message);
    }
    
    // 2초 대기
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

// 템플릿 정보 확인
async function checkTemplateInfo() {
  console.log('\n=== 템플릿 정보 확인 ===');
  
  const apikey = 'gsfprma05alogua7rmtwigr46cxzntzb';
  const userid = 'selfnote10';
  const tpl_code = 'UA_9729';
  
  try {
    const formData = new URLSearchParams();
    formData.append('apikey', apikey);
    formData.append('userid', userid);
    formData.append('tpl_code', tpl_code);

    const response = await axios.post('https://kakaoapi.aligo.in/akv10/alimtalk/template_list/', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    console.log('📋 템플릿 정보:', response.data);
    
  } catch (error) {
    console.error('❌ 템플릿 조회 오류:', error.response?.data || error.message);
  }
}

// 잔여포인트 확인
async function checkBalance() {
  console.log('\n=== 잔여포인트 확인 ===');
  
  const apikey = 'gsfprma05alogua7rmtwigr46cxzntzb';
  const userid = 'selfnote10';
  
  try {
    const formData = new URLSearchParams();
    formData.append('apikey', apikey);
    formData.append('userid', userid);

    const response = await axios.post('https://kakaoapi.aligo.in/akv10/remain/', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    console.log('💰 잔여포인트:', response.data);
    
  } catch (error) {
    console.error('❌ 잔여포인트 조회 오류:', error.response?.data || error.message);
  }
}

// 모든 확인 실행
async function runAllChecks() {
  await checkAlimtalkResult();
  await checkTemplateInfo();
  await checkBalance();
}

runAllChecks().catch(console.error); 
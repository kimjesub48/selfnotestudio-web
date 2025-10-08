// 알리고 API 직접 테스트 스크립트
const axios = require('axios');

async function testAlimtalk() {
  console.log('=== 알리고 API 직접 테스트 ===');
  
  // 알리고 정보
  const apikey = 'gsfprma05alogua7rmtwigr46cxzntzb';
  const userid = 'selfnote10';
  const senderkey = '006507751f3f2bb0cfce5a7cbb8b8bc2e1eaa027';
  const tpl_code = 'UA_9729';
  const sender = '010-7580-9997';
  const subject = '셀프노트 상담';
  const kakaoChatUrl = 'http://pf.kakao.com/_NhDxfM/chat';

  const message = '상담 신청이 접수되었습니다!\n궁금한 점이나 빠른 상담이 필요하시면\n아래 카카오채널 1:1채팅으로 바로 문의해 주세요';

  const button_1 = JSON.stringify({
    button: [{
      name: '상담 바로가기',
      linkType: 'WL',
      linkMo: kakaoChatUrl,
      linkPc: kakaoChatUrl
    }]
  });

  // 테스트할 전화번호들
  const testPhones = [
    '010-7580-9997',  // 원래 번호
    '010-1234-5678',  // 테스트 번호
    '010-0000-0000'   // 더미 번호
  ];

  for (const phone of testPhones) {
    console.log(`\n📞 ${phone} 번호로 테스트 중...`);
    
    try {
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

      const response = await axios.post('https://kakaoapi.aligo.in/akv10/alimtalk/send/', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      console.log('✅ 성공:', response.data);
      
      if (response.data.code === 0) {
        console.log(`🎉 ${phone} 번호로 알림톡 발송 성공!`);
      } else {
        console.log(`❌ ${phone} 번호 발송 실패:`, response.data.message);
      }
      
    } catch (error) {
      console.error(`❌ ${phone} 번호 오류:`, error.response?.data || error.message);
    }
    
    // 3초 대기
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}

// 테스트 실행
testAlimtalk().catch(console.error); 
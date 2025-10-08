/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const axios = require('axios');

exports.sendKakaoNotification = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { phone } = req.body; // 고객 연락처만 사용

  // 알리고 정보 입력 (아래 값들은 본인 값으로 꼭 바꿔주세요!)
  const apikey = 'gsfprma05alogua7rmtwigr46cxzntzb';
  const userid = 'selfnote10';
  const senderkey = '006507751f3f2bb0cfce5a7cbb8b8bc2e1eaa027';
  const tpl_code = 'UB_2801';
  const sender = '010-7580-9997'; // 15** 등 승인된 번호
  const subject = '셀프노트 상담';
  const kakaoChatUrl = 'http://pf.kakao.com/_NhDxfM/chat'; // 본인 카카오채널 1:1채팅 링크로 변경

  // 새로운 템플릿 메시지 (변수 포함)
  const message = `선곡: #{videoTitle}
이름: #{name}
연락처: #{phone}
사용인원: #{people}명
이용목적: #{service}
상담내용: #{message}

※'예약문의'라고 
메시지 보내주시면 상담이 시작됩니다.`;

  // 버튼 정보 (템플릿 등록 시와 동일하게)
  const button_1 = JSON.stringify({
    button: [{
      name: '상담 바로가기',
      linkType: 'WL',
      linkMo: kakaoChatUrl,
      linkPc: kakaoChatUrl
    }]
  });

  try {
    const response = await axios.post('https://kakaoapi.aligo.in/akv10/alimtalk/send/', null, {
      params: {
        apikey,
        userid,
        senderkey,
        tpl_code,
        sender,
        receiver_1: phone,
        subject_1: subject,
        message_1: message,
        button_1
      }
    });
    res.status(200).json({ success: true, result: response.data });
  } catch (error) {
    console.error('알림톡 전송 에러:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

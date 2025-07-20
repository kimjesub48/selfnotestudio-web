// 이메일 알림 발송 API
export default async function handler(req, res) {
  console.log('=== 이메일 알림 API 진입 ===');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { to, subject, html } = req.body;

    console.log('이메일 전송 요청:', { to, subject });

    // 간단한 이메일 전송 (실제로는 이메일 서비스 연동 필요)
    console.log('이메일 내용:', html);

    // 성공 응답 (실제 이메일 전송은 별도 서비스 필요)
    console.log('이메일 전송 성공 (시뮬레이션)');
    res.status(200).json({ 
      success: true, 
      message: '이메일 알림이 전송되었습니다.',
      to: to,
      subject: subject
    });

  } catch (error) {
    console.error('이메일 알림 처리 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다.' 
    });
  }
} 
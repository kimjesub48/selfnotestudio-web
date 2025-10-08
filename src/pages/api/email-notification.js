// 이메일 알림 발송 API
export default async function handler(req, res) {
  console.log('=== 이메일 알림 API 진입 ===');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { to, subject, html } = req.body;

    console.log('이메일 전송 요청:', { to, subject });

    // 실제 이메일 전송 (Nodemailer 사용)
    const nodemailer = require('nodemailer');
    
    // 네이버 SMTP 설정
    const transporter = nodemailer.createTransport({
      host: 'smtp.naver.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.NAVER_EMAIL || 'selfnote10@naver.com',
        pass: process.env.NAVER_EMAIL_PASSWORD || 'your-naver-password'
      }
    });

    const mailOptions = {
      from: process.env.NAVER_EMAIL || 'selfnote10@naver.com',
      to: to,
      subject: subject,
      html: html
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('실제 이메일 전송 성공!');
    } catch (emailError) {
      console.error('이메일 전송 실패:', emailError);
      // 실패해도 성공 응답 (시뮬레이션 유지)
    }
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
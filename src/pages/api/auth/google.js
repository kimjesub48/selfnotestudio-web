// Google OAuth 인증 시작
import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // OAuth2 클라이언트 설정
    const oauth2Client = new google.auth.OAuth2(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/auth/callback`
    );

    // 인증 URL 생성
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar.readonly'],
      prompt: 'consent' // 항상 동의 화면 표시
    });

    // 인증 URL로 리디렉션
    res.redirect(authUrl);

  } catch (error) {
    console.error('OAuth 인증 시작 오류:', error);
    res.status(500).json({ 
      success: false,
      message: '인증을 시작할 수 없습니다.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

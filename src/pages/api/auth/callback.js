// Google OAuth 콜백 처리
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ message: '인증 코드가 없습니다' });
    }

    // OAuth2 클라이언트 설정
    const oauth2Client = new google.auth.OAuth2(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/auth/callback`
    );

    // 인증 코드로 토큰 교환
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // 토큰을 파일에 저장
    const tokensPath = path.join(process.cwd(), 'google-calendar-tokens.json');
    const tokensData = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: tokens.expiry_date,
      created_at: new Date().toISOString()
    };

    try {
      fs.writeFileSync(tokensPath, JSON.stringify(tokensData, null, 2), 'utf-8');
      console.log('✅ Google Calendar 토큰이 파일에 저장되었습니다:', tokensPath);
    } catch (fileError) {
      console.error('토큰 파일 저장 실패:', fileError);
    }

    // 성공 페이지로 리디렉션
    res.redirect('/?auth=success');

  } catch (error) {
    console.error('OAuth 콜백 오류:', error);
    res.redirect('/?auth=error');
  }
}

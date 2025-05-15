import "../styles/globals.css";

export const metadata = {
  title: "일반인 녹음실 | 유튜브 커버영상 · 음원발매 · 축가녹음까지 | 셀프노트 스튜디오",
  description: "셀프노트는 일반인을 위한 셀프녹음실입니다. 노래녹음, 유튜브 커버영상, 음원발매, 셀프축가, 식전영상, 축가녹음, 커버촬영, 뮤직비디오까지 가능한 서울 녹음실입니다.",
  keywords: "일반인 녹음실, 셀프녹음실, 유튜브 커버영상, 음원발매, 축가녹음, 노래녹음, 녹음실 대여, 셀프축가, 식전영상, 커버촬영, 뮤직비디오, 서울 녹음실",
  openGraph: {
    title: "일반인 녹음실 · 유튜브 커버 · 축가녹음 | 셀프노트 스튜디오",
    description: "셀프노트는 누구나 쉽게 녹음할 수 있는 셀프녹음실입니다. 노래녹음부터 커버영상, 축가, 음원발매까지 올인원 제공!",
    url: "https://selfnote.co.kr",
    siteName: "셀프노트 스튜디오",
    images: [
      {
        url: "https://selfnote.co.kr/og-image.jpg?v=1",
        width: 1200,
        height: 630,
        alt: "셀프노트 스튜디오",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://selfnote.co.kr",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="favKZEBpe4B6nY2v9/elAQ" async></script>
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvC73w5aXp-p7K4KLg.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          as="style"
          crossOrigin="anonymous"
        />
        <style dangerouslySetInnerHTML={{ __html: `
          /* 폰트 로딩 최적화 */
          @font-face {
            font-family: 'JalnanGothic';
            src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff') format('woff');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
            size-adjust: 100%;
            ascent-override: 90%;
            descent-override: 20%;
            line-gap-override: normal;
          }
          
          @font-face {
            font-family: 'Pretendard';
            font-display: swap;
            size-adjust: 100%;
            ascent-override: 90%;
            descent-override: 20%;
            line-gap-override: normal;
          }

          @font-face {
            font-family: 'Montserrat';
            src: url('https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvC73w5aXp-p7K4KLg.woff2') format('woff2');
            font-weight: 900;
            font-style: normal;
            font-display: swap;
            size-adjust: 100%;
            ascent-override: 90%;
            descent-override: 20%;
            line-gap-override: normal;
          }
          
          /* FOUT 방지 */
          html {
            visibility: visible;
            opacity: 1;
          }
        ` }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

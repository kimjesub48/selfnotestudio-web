import "../styles/globals.css";

export const metadata = {
  title: "셀프노트 스튜디오",
  description: "오디오 제작 전문 스튜디오",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
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

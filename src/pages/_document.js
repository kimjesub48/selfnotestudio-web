import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          {/* 기본 SEO 메타 태그 */}
          {/* <title>셀프노트 스튜디오 - 전문 녹음실 | 1:1 디렉팅 | 음정보정 | 영상제작</title> */}
          <meta name="description" content="셀프노트 스튜디오는 전문 엔지니어의 1:1 맞춤 디렉팅과 음정보정, 고품질 영상제작을 제공하는 녹음실입니다. 무제한 녹음으로 완벽한 음원을 만들어보세요." />
          <meta name="keywords" content="녹음실, 셀프노트, 음정보정, 디렉팅, 영상제작, 노래녹음, 음원제작, 보컬코칭, 믹싱, 마스터링" />
          <meta name="author" content="셀프노트 스튜디오" />
          <meta name="robots" content="index, follow" />
          {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" /> */}
          <meta charset="UTF-8" />
          
          {/* Open Graph 메타 태그 (카카오톡, 페이스북 공유용) */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="셀프노트 녹음실 스튜디오" />
          <meta property="og:description" content="전문 엔지니어의 1:1 맞춤 디렉팅과 음정보정, 고품질 영상제작을 제공하는 녹음실" />
          <meta property="og:image" content="https://selfnote.co.kr/studio/studio02.webp" />
          <meta property="og:url" content="https://selfnote.co.kr" />
          <meta property="og:site_name" content="셀프노트 스튜디오" />
          <meta property="og:locale" content="ko_KR" />
          
          {/* Twitter Card 메타 태그 */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="셀프노트 녹음실 스튜디오" />
          <meta name="twitter:description" content="전문 엔지니어의 1:1 맞춤 디렉팅과 음정보정, 고품질 영상제작을 제공하는 녹음실" />
          <meta name="twitter:image" content="https://selfnote.co.kr/studio/studio02.webp" />
          
          {/* 네이버 검색 최적화 */}
          <meta name="naver-site-verification" content="" />
          <meta name="google-site-verification" content="" />
          
          {/* 캐노니컬 URL */}
          <link rel="canonical" href="https://selfnote.co.kr" />
          
          {/* 파비콘 */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          
          {/* Google Analytics 4 */}
          {process.env.NEXT_PUBLIC_GA_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                      page_title: document.title,
                      page_location: window.location.href,
                      send_page_view: true
                    });
                  `,
                }}
              />
            </>
          )}
          
          {/* 폰트 사전 로딩 */}
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
          
          {/* 폰트 스타일 인라인 */}
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
            
            /* iOS Safari 호환성을 위한 CSS 변수 */
            :root {
              --vh: 1vh;
              --vw: 1vw;
              --safe-area-inset-top: env(safe-area-inset-top);
              --safe-area-inset-right: env(safe-area-inset-right);
              --safe-area-inset-bottom: env(safe-area-inset-bottom);
              --safe-area-inset-left: env(safe-area-inset-left);
            }
            
            /* iOS Safari에서 100vh 문제 해결 */
            @supports (-webkit-touch-callout: none) {
              :root {
                --vh: calc(var(--vh, 1vh) * 100);
              }
            }
          ` }} />
          
          {/* Pretendard 폰트 스타일시트 */}
          <link 
            rel="stylesheet" 
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" 
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument; 
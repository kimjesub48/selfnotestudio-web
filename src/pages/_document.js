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
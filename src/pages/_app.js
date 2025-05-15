import { createGlobalStyle } from 'styled-components';
import { StyleSheetManager } from 'styled-components';
import Navigation from '../components/Navigation';
import '../styles/globals.css';
import { useEffect } from 'react';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    overflow-x: hidden;
    width: 100%;
    position: relative;
  }

  body {
    background-color: #fff;
    color: #333;
    line-height: 1.6;
    max-width: 100vw;
  }
`;

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // 페이지가 완전히 로드된 후에만 스타일 가시성 설정
    const handleLoad = () => {
      document.documentElement.style.visibility = 'visible';
    };
    
    // 페이지가 이미 로드되었으면 즉시 실행, 아니면 이벤트 리스너 추가
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'theme'}>
      <GlobalStyle />
      <Navigation />
      <Component {...pageProps} />
    </StyleSheetManager>
  );
}

export default MyApp; 
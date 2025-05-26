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
    
    /* iOS Safari 호환성 개선 */
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }

  body {
    background-color: #fff;
    color: #333;
    line-height: 1.6;
    max-width: 100vw;
    
    /* iOS Safari 레이아웃 안정화 */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  
  /* iOS Safari에서 flexbox 호환성 개선 */
  .audio-comparison-section {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    
    /* 다른 섹션의 영향 차단 */
    isolation: isolate !important;
    contain: layout style !important;
    position: relative !important;
    z-index: 1 !important;
  }
  
  /* 오디오 섹션 내부 요소들 보호 */
  .audio-comparison-section * {
    box-sizing: border-box !important;
  }
  
  /* iOS Safari에서 중앙 정렬 강화 */
  @supports (-webkit-appearance: none) {
    .audio-comparison-section * {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
  }
  
  /* 아이폰 Safari 전용 중앙 정렬 보정 */
  @supports (-webkit-touch-callout: none) {
    .audio-comparison-section {
      display: block !important;
      width: 100% !important;
      text-align: center !important;
    }
  }
`;

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // 페이지가 완전히 로드된 후에만 스타일 가시성 설정
    const handleLoad = () => {
      document.documentElement.style.visibility = 'visible';
    };
    
    // iOS Safari viewport 높이 계산 및 CSS 변수 설정
    const setVhProperty = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    // 초기 설정
    setVhProperty();
    
    // 리사이즈 및 오리엔테이션 변경 시 재계산
    const handleResize = () => {
      setVhProperty();
    };
    
    const handleOrientationChange = () => {
      // 오리엔테이션 변경 후 약간의 지연을 두고 재계산
      setTimeout(setVhProperty, 100);
    };
    
    // 페이지가 이미 로드되었으면 즉시 실행, 아니면 이벤트 리스너 추가
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }
    
    // 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
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
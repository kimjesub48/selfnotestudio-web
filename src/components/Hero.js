import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

// 폰트 로딩 관련 스타일 추가
const FontOptimizationStyle = styled.style`
  @font-face {
    font-family: 'Montserrat';
    font-display: swap;
    size-adjust: 100%;
    font-weight: 900;
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  width: 100%;
  background: #111216;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  opacity: ${props => props.$isVisible ? 1 : 0};
  transition: opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1);
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const VideoPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #111216;
  z-index: 2; /* 배경을 비디오 위에 올려서 페이드아웃 효과 구현 */
  opacity: ${props => props.$videoLoaded ? 0 : 1};
  transition: opacity 1.5s ease-out;
  pointer-events: none;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  opacity: 1; /* 항상 100% 표시 */
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 900px;
  text-align: center;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 5;
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: translateY(${props => props.$isVisible ? '0' : '20px'});
  transition: opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1), 
              transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
`;

const Title = styled.h1`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
  font-weight: 700;
  font-size: ${props => props.$isMobile ? '1.9rem' : '4.2rem'};
  line-height: 1.08;
  letter-spacing: -0.01em;
  margin: 0;
  position: relative;
  text-transform: uppercase;
  margin-left: 0;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  /* 폰트 로딩 중 레이아웃 시프트 방지 */
  font-display: swap;
  font-synthesis: none;
  
  /* 반응형 전환 시 애니메이션 방지 */
  transition: none !important;
  
  /* 폰트 크기 안정화 */
  @media (min-width: 901px) {
    font-size: 4.2rem;
  }
  
  @media (max-width: 900px) {
    font-size: 1.9rem;
  }
`;

const TitleText = styled.span`
  display: block;
  position: relative;
  color: #fff;
  
  /* 반응형 전환 시 애니메이션 방지 */
  transition: none !important;
`;

const Description = styled.p`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 400;
  font-size: ${props => props.$isMobile ? '1rem' : '1.1rem'};
  color: #ffffff;
  margin-top: 1.5rem;
  margin-left: 0;
  letter-spacing: 0.04em;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  /* 폰트 로딩 중 레이아웃 시프트 방지 */
  font-display: swap;
  
  /* 반응형 전환 시 애니메이션 방지 */
  transition: none !important;
  
  /* 폰트 크기 안정화 */
  @media (min-width: 901px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 900px) {
    font-size: 1rem;
  }
  
  /* 텍스트 렌더링 최적화 */
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
`;

const ScrollIndicator = styled.div`
  position: absolute;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.7;
  z-index: 5;
`;

const ScrollArrow = styled.span`
  display: inline-block;
  width: 28px;
  height: 28px;
`;

const HighlightText = styled.span`
  position: relative;
  font-size: ${props => props.$isMobile ? '2.3rem' : '5rem'};
  color: #3491FF;
  font-weight: 900;
  
  &::before {
    content: '•';
    position: absolute;
    top: ${props => props.$isMobile ? '-14px' : '-25px'};
    left: ${props => props.$isMobile ? '25%' : '25%'};
    transform: translateX(-50%);
    font-size: ${props => props.$isMobile ? '0.9rem' : '1.5rem'};
    color: #3491FF;
    opacity: 1;
    z-index: 10;
  }
  
  &::after {
    content: '•';
    position: absolute;
    top: ${props => props.$isMobile ? '-14px' : '-25px'};
    left: ${props => props.$isMobile ? '75%' : '75%'};
    transform: translateX(-50%);
    font-size: ${props => props.$isMobile ? '0.9rem' : '1.5rem'};
    color: #3491FF;
    opacity: 1;
    z-index: 10;
  }
`;

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);
  
  // 모바일 체크 함수
  const checkMobile = useCallback(() => {
    return window.innerWidth <= 900;
  }, []);

  // 비디오 로딩 및 재생 처리
  useEffect(() => {
    if (videoRef.current) {
      // IntersectionObserver를 사용하여 뷰포트에 들어올 때만 비디오 로드
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log('Video in viewport - loading video');
          
          // 비디오 로드 이벤트
          const handleVideoLoaded = () => {
            console.log('Video data loaded');
            
            // 비디오 재생 시도
            const playPromise = videoRef.current.play();
            
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  console.log('Video playing - showing video');
                  // 재생 성공 시 즉시 비디오 표시 (배경은 천천히 사라짐)
                  setVideoLoaded(true);
                })
                .catch(error => {
                  console.log('Auto-play was prevented:', error);
                  // 자동 재생이 차단된 경우에도 비디오 표시
                  setVideoLoaded(true);
                });
            }
          };
          
          // 비디오 로드 중 상태 표시
          const handleLoadStart = () => {
            console.log('Video loading started');
          };
          
          videoRef.current.addEventListener('loadeddata', handleVideoLoaded);
          videoRef.current.addEventListener('loadstart', handleLoadStart);
          
          // 비디오 로드 확인을 위한 백업 타이머
          const timer = setTimeout(() => {
            if (!videoLoaded) {
              console.log('Video load timeout - forcing loaded state');
              setVideoLoaded(true);
            }
          }, 3000);
          
          // 옵저버 연결 해제
          observer.disconnect();
          
          return () => {
            if (videoRef.current) {
              videoRef.current.removeEventListener('loadeddata', handleVideoLoaded);
              videoRef.current.removeEventListener('loadstart', handleLoadStart);
            }
            clearTimeout(timer);
          };
        }
      }, {
        rootMargin: '0px',
        threshold: 0.1
      });
      
      observer.observe(videoRef.current);
      
      return () => {
        observer.disconnect();
      };
    }
  }, [videoLoaded]);

  // 폰트 로딩 처리
  useEffect(() => {
    // 초기 렌더링 상태 업데이트 - 더 빠르게 표시
    const initialTimer = setTimeout(() => {
      setInitialRender(false);
      // 컴포넌트 페이드인 시작
      setIsVisible(true);
    }, 10); // 100ms에서 10ms로 감소
    
    // 폰트 로딩 확인
    if ('fonts' in document) {
      // 필수 폰트만 먼저 로드
      document.fonts.load('400 1em system-ui').then(() => {
        setFontsLoaded(true);
        
        // 나머지 폰트는 비동기적으로 로드
        Promise.all([
          document.fonts.load('900 1em Montserrat'),
          document.fonts.load('400 1em Pretendard'),
          document.fonts.load('400 1em JalnanGothic')
        ]).catch((err) => {
          console.warn('Font loading failed:', err);
        });
      });
    } else {
      // fonts API를 지원하지 않는 브라우저에서는 타임아웃으로 처리
      const timer = setTimeout(() => {
        console.log('Font loading timeout - setting as loaded');
        setFontsLoaded(true);
      }, 100); // 시간 감소
      return () => clearTimeout(timer);
    }
    
    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    // 초기 모바일 체크
    setIsMobile(checkMobile());
    
    // 리사이즈 이벤트 리스너 - 디바운스 적용
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsMobile(checkMobile());
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [checkMobile]);

  return (
    <>
      {/* 폰트 최적화를 위한 스타일 */}
      <FontOptimizationStyle />
      
      <HeroSection $isVisible={isVisible} id="hero">
        <BackgroundContainer>
          <BackgroundOverlay />
          <VideoBackground
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/studio/studio01.webp"
          >
            <source src="/videos/hero.webm" type="video/webm" />
          </VideoBackground>
          <VideoPlaceholder $videoLoaded={videoLoaded} />
        </BackgroundContainer>

        <ContentContainer $isMobile={isMobile} $isVisible={isVisible}>
          <Title 
            $isMobile={isMobile} 
            className={`${fontsLoaded ? 'fonts-loaded' : ''} ${initialRender ? 'initial-render' : ''}`}
          >
            <TitleText>누구나 쉽게, <HighlightText $isMobile={isMobile}>녹음</HighlightText> 하세요!</TitleText>
            <TitleText></TitleText>
          </Title>
          <Description 
            $isMobile={isMobile} 
            className={`${fontsLoaded ? 'fonts-loaded' : ''} ${initialRender ? 'initial-render' : ''}`}
          >
            NAVER 대중음악 인플루언서 공식 선정<br />
            YouTube 구독자 205만 채널 운영<br />
            Google Creator Awards 수상
          </Description>
        </ContentContainer>

        <ScrollIndicator>
          <span style={{fontSize: '0.95rem', color: '#fff', marginBottom: '4px'}}>아래로 스크롤</span>
          <ScrollArrow>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 11L14 18L21 11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ScrollArrow>
        </ScrollIndicator>
      </HeroSection>
    </>
  );
} 
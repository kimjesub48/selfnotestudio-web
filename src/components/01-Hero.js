import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { trackEvents, trackPageTime } from '../utils/analytics';

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
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(2px);
  }
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

// 유튜브 검색창 스타일 컴포넌트들
const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 2rem auto 0;
  position: relative;
  z-index: 6;
`;

const SearchForm = styled.form`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 60px 16px 24px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: #fff;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  outline: none;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    border-color: #3491FF;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 4px rgba(52, 145, 255, 0.1);
  }
  
  @media (max-width: 900px) {
    padding: 14px 50px 14px 20px;
    font-size: 0.9rem;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border: none;
  background: #3491FF;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #2176e6;
    transform: translateY(-50%) scale(1.05);
  }
  
  @media (max-width: 900px) {
    width: 36px;
    height: 36px;
    right: 6px;
  }
`;

const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(17, 18, 22, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 10;
  margin-top: 8px;
  display: ${props => props.$show ? 'block' : 'none'};
  
  /* 커스텀 스크롤바 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const SearchResultItem = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const VideoThumbnail = styled.img`
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
  
  @media (max-width: 900px) {
    width: 60px;
    height: 45px;
  }
`;

const VideoInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const VideoTitle = styled.div`
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.3;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  
  @media (max-width: 900px) {
    font-size: 0.85rem;
  }
`;

const VideoChannel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  @media (max-width: 900px) {
    font-size: 0.75rem;
  }
`;

const VideoTitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 4px;
`;

const MRBadge = styled.span`
  background: #FF6B6B;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 12px;
  flex-shrink: 0;
  
  @media (max-width: 900px) {
    font-size: 0.65rem;
    padding: 1px 5px;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);
  const pageTimeTracker = useRef(null);
  
  // 유튜브 검색 관련 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef(null);
  const router = useRouter();

  // YouTube API 키 (기존 키 사용)
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || 'AIzaSyAVz0C91E_VUu16gl9-KyWyA1PZOcxoY3Y';
  
  if (!YOUTUBE_API_KEY) {
    console.warn('YouTube API 키가 설정되지 않았습니다. YouTube 검색 기능이 제한됩니다.');
  }

  // 페이지 체류시간 추적 시작
  useEffect(() => {
    pageTimeTracker.current = trackPageTime('Hero Section');
    
    return () => {
      if (pageTimeTracker.current) {
        pageTimeTracker.current();
      }
    };
  }, []);

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

  // 유튜브 검색 함수
  const searchYoutube = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    
    try {
      // 검색 모드에 따라 검색어 조정
      const searchQueryMR = `${query} MR 반주 instrumental karaoke`;
      
      // API 키가 유효한지 확인
      if (!YOUTUBE_API_KEY) {
        console.error('YouTube API 키가 설정되지 않았습니다');
        setSearchResults([]);
        setShowResults(false);
        return;
      }
      
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(searchQueryMR)}&key=${YOUTUBE_API_KEY}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.items || []);
        setShowResults(true);
        
        // 검색 이벤트 추적
        trackEvents.content.youtubeSearch(`MR: ${query}`);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('YouTube API error:', response.status, errorData);
        
        // API 키 에러인 경우 사용자에게 알림
        if (response.status === 400 || response.status === 403) {
          setSearchResults([]);
          setShowResults(false);
        }
      }
    } catch (error) {
      console.error('YouTube search error:', error);
      setSearchResults([]);
      setShowResults(false);
    } finally {
      setIsSearching(false);
    }
  };

  // 검색 입력 핸들러 (디바운스 적용)
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // 이전 타이머 취소
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // 새로운 타이머 설정 (300ms 후 검색 실행)
    searchTimeoutRef.current = setTimeout(() => {
      searchYoutube(value);
    }, 300);
  };

  // 검색 폼 제출 핸들러
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchYoutube(searchQuery);
    }
  };

  // 비디오 선택 핸들러
  const handleVideoSelect = (video) => {
    const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
    const videoTitle = video.snippet.title;
    
    // 선택 이벤트 추적
    trackEvents.content.youtubeVideoSelected(videoTitle, videoUrl);
    
    // 주문 페이지로 이동 (선택된 비디오 정보와 함께)
    router.push({
      pathname: '/order',
      query: {
        youtube: videoUrl,
        title: videoTitle
      }
    });
    
    // 검색 결과 숨기기
    setShowResults(false);
    setSearchQuery('');
  };

  // 검색 결과 외부 클릭 시 숨기기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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

          {/* 유튜브 검색창 (개발 중 숨김) */}
          {/* 
          <SearchContainer className="search-container">
            <SearchForm onSubmit={handleSearchSubmit}>
              <SearchInput
                type="text"
                placeholder="MR 반주를 검색해보세요 (예: 아이유 좋은날 MR)"
                value={searchQuery}
                onChange={handleSearchInput}
                autoComplete="off"
              />
              <SearchButton type="submit">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 5.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SearchButton>
            </SearchForm>

            <SearchResults $show={showResults}>
              {isSearching ? (
                <LoadingSpinner>검색 중...</LoadingSpinner>
              ) : searchResults.length > 0 ? (
                searchResults.map((video) => {
                  // MR 여부 확인 (제목에 MR, 반주, instrumental, karaoke 등이 포함되어 있는지)
                  const isMR = /MR|반주|instrumental|karaoke|backing track/i.test(video.snippet.title);
                  
                  return (
                    <SearchResultItem
                      key={video.id.videoId}
                      onClick={() => handleVideoSelect(video)}
                    >
                      <VideoThumbnail
                        src={video.snippet.thumbnails.default.url}
                        alt={video.snippet.title}
                      />
                      <VideoInfo>
                        <VideoTitleContainer>
                          <VideoTitle style={{ flex: 1 }}>{video.snippet.title}</VideoTitle>
                          {isMR && <MRBadge>MR</MRBadge>}
                        </VideoTitleContainer>
                        <VideoChannel>{video.snippet.channelTitle}</VideoChannel>
                      </VideoInfo>
                    </SearchResultItem>
                  );
                })
              ) : searchQuery && !isSearching ? (
                <LoadingSpinner>검색 결과가 없습니다</LoadingSpinner>
              ) : null}
            </SearchResults>
          </SearchContainer>
          */}

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
          <ScrollArrow onClick={() => trackEvents.content.scrollToSection('Why Choose Us')}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 11L14 18L21 11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ScrollArrow>
        </ScrollIndicator>
      </HeroSection>
    </>
  );
} 
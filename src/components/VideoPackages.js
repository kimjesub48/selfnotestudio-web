import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Section = styled.section`
  background-color: #13151C;
  padding: 80px 0 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  
  @media (max-width: 900px) {
    padding: 60px 0 80px;
  }
`;

const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 0;
`;

const MainTitle = styled.h2`
  font-family: 'JalnanGothic', sans-serif;
  font-size: 1.9rem;
  color: #FFFFFF;
  font-weight: 300;
  margin-bottom: 15px;
  
  @media (max-width: 900px) {
    display: none;
  }
`;

const MobileTitle = styled.h2`
  display: none;
  
  @media (max-width: 900px) {
    display: block;
    font-family: 'JalnanGothic', sans-serif;
    font-size: 1.3rem;
    color: #FFFFFF;
    font-weight: 300;
    margin-bottom: 15px;
  }
`;

const SubTitle = styled.div`
  font-size: 2.5rem;
  font-family: 'JalnanGothic', sans-serif;
  font-weight: 300;
  background: linear-gradient(to right, #00DCDF, #3491FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.4;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 900px) {
    font-size: 1.8rem;
    margin-bottom: 0px;
  }
`;

const Spacer = styled.div`
  height: ${props => props.height || '40px'};
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 30px;
  padding: 5px;
  width: 300px;
  margin: 0 auto 30px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 10px 20px;
  background: ${props => props.active ? 'linear-gradient(to right, #00DCDF, #3491FF)' : 'transparent'};
  color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.7)'};
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  
  &:hover {
    color: #fff;
  }
  
  &:focus {
    outline: none;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

// PC에서 영상과 패키지 카드를 가로로 배치하기 위한 컨테이너
const ContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

const VideoSection = styled.div`
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
`;

const PackagesSection = styled.div`
  width: 100%;
  margin-top: 40px;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
`;

const VideoContainer = styled.div`
  width: 100%;
  max-width: ${props => props.isVertical ? '350px' : '650px'};
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: ${props => props.isVertical ? '177.78%' : '56.25%'}; /* 9:16 또는 16:9 비율 */
  height: 0;
  overflow: hidden;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

// 썸네일 스타일
const VideoThumbnail = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.thumbnail});
  background-size: cover;
  background-position: center;
  transition: opacity 0.3s ease;
  opacity: ${props => props.isHidden ? 0 : 1};
  z-index: 2;
  border-radius: 16px;
`;

// 재생 버튼 스타일
const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: none;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  padding: 0;

  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-top: 18px solid transparent;
    border-bottom: 18px solid transparent;
    border-left: 30px solid white;
    margin-left: 5px;
  }
`;

const Button = styled.a`
  display: inline-block;
  background-color: white;
  color: #3491FF;
  font-size: 17px;
  font-weight: 700;
  padding: 14px 30px;
  border-radius: 12px;
  text-decoration: none;
  margin-top: 40px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 900px) {
    font-size: 16px;
    padding: 12px 25px;
  }
`;

// 패키지 카드 컨테이너 스타일
const PackageCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;

// 패키지 카드 스타일
const PackageCard = styled.div`
  background: rgba(30, 33, 43, 0.7);
  border-radius: 12px;
  padding: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  width: 100%;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: rgba(40, 43, 53, 0.8);
  }
  
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }
`;

// 할인 배지 스타일
const DiscountBadge = styled.div`
  position: absolute;
  top: -10px;
  right: 20px;
  background: #FF3B3B;
  padding: 3px 10px;
  border-radius: 20px;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  
  @media (max-width: 900px) {
    right: 10px;
    top: -8px;
    font-size: 0.7rem;
  }
`;

// 패키지 내용 컨테이너
const PackageInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

// 패키지 제목 스타일
const PackageTitle = styled.h3`
  font-size: 1.2rem;
  color: white;
  margin: 0 0 5px;
  font-weight: 600;
`;

// 패키지 설명 스타일
const PackageDescription = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0;
  line-height: 1.4;
  
  @media (max-width: 900px) {
    margin-bottom: 15px;
  }
`;

// 설명 줄 스타일
const DescriptionLine = styled.div`
  margin-bottom: 3px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 900px) {
    display: ${props => props.hideOnMobile ? 'none' : 'block'};
    margin-bottom: 0;
  }
`;

// 가격 컨테이너
const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
  @media (max-width: 900px) {
    align-items: flex-start;
    width: 100%;
  }
`;

// 원래 가격 스타일
const OriginalPrice = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: line-through;
  margin-bottom: 2px;
`;

// 패키지 가격 스타일
const PackagePrice = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  color: #00E1FF;
  margin-bottom: 0;
  
  @media (max-width: 900px) {
    font-size: 1.5rem;
  }
`;

export default function VideoPackages() {
  const [isMobile, setIsMobile] = useState(false);
  const [videoType, setVideoType] = useState('horizontal'); // 기본값 설정
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  // 컴포넌트가 마운트되었을 때 실행
  useEffect(() => {
    setMounted(true);
    
    // 초기 모바일 체크
    const mobile = window.innerWidth <= 900;
    setIsMobile(mobile);
    
    // 모바일에서는 세로 영상을 기본값으로 설정
    if (mobile) {
      setVideoType('vertical');
    } else {
      setVideoType('horizontal');
    }
    
    const checkMobile = () => {
      const isMobileView = window.innerWidth <= 900;
      setIsMobile(isMobileView);
    };
    
    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', checkMobile);
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // YouTube 동영상 ID
  const horizontalVideoId = 'p9GyzuY4ex8'; // 가로 영상 ID
  const verticalVideoId = 'zZYdy5KaiGY';   // 세로 영상 ID
  
  // YouTube 썸네일 URL
  const getYoutubeThumbnail = (videoId) => `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
  // 현재 활성화된 비디오 ID 가져오기
  const getCurrentVideoId = () => videoType === 'vertical' ? verticalVideoId : horizontalVideoId;
  
  // 비디오 재생 처리
  const handlePlayVideo = () => {
    setIsPlaying(true);
  };
  
  // 탭 변경 처리
  const handleTabChange = (newVideoType) => {
    if (newVideoType === videoType) return;
    
    // 비디오 타입 변경 및 재생 상태 초기화
    setVideoType(newVideoType);
    setIsPlaying(false);
    
    // 디버깅을 위한 로그 추가
    console.log(`비디오 타입 변경: ${newVideoType}`);
  };
  
  // 저장된 스크롤 위치로 이동하는 함수
  useEffect(() => {
    // URL에 해시가 있으면 스크롤 실행
    if (typeof window !== 'undefined' && window.location.hash === '#video-packages-cards') {
      // 패키지 카드 위치로 스크롤 (약간의 지연을 주어 렌더링 완료 후 스크롤)
      setTimeout(() => {
        const packageSection = document.querySelector('.package-cards-section');
        if (packageSection) {
          packageSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, []);
  
  // 패키지 데이터
  const packagesData = [
    {
      id: 'basic',
      title: "일반 영상 패키지",
      description: [
        "1:1 디렉팅 녹음 + 기본 촬영 1각도 + 기본 편집 제공", 
        ""
      ],
      mobileDescription: "1:1 디렉팅 녹음 + 기본 촬영 1각도 + 기본 편집 제공",
      price: "150,000원",
      originalPrice: null,
      discount: null,
      monthly: false,
    },
    {
      id: 'premium',
      title: "프리미엄 영상 패키지",
      description: [
        "1:1 디렉팅 녹음 + 다각도 촬영 2각도 + 고급 편집 제공", 
        "+ 4K 영상"
      ],
      mobileDescription: "1:1 디렉팅 녹음 + 다각도 촬영 2각도 + 고급 편집 제공 + 4K 영상",
      price: "200,000원",
      originalPrice: null,
      discount: "추천",
      monthly: false,
    },
    {
      id: 'pro',
      title: "프로 영상 패키지",
      description: [
        "1:1 디렉팅 녹음 + 피부 보정 + 다각도 3각도 + 프로 편집 제공", 
        "가사 포함 + 4K 영상"
      ],
      mobileDescription: "1:1 디렉팅 녹음 + 피부 보정 + 다각도 3각도 + 프로 편집 제공 + 가사 포함 + 4K 영상",
      price: "250,000원",
      originalPrice: "300,000원",
      discount: "할인 중",
      monthly: false,
    }
  ];
  
  // 서버 사이드 렌더링 시 window 객체에 접근하지 않도록 함
  if (!mounted) {
    return (
      <Section id="video-packages">
        <TitleWrapper>
          <MainTitle>한 번의 녹음, 한 편의 영상으로.</MainTitle>
          <MobileTitle>영상도, 음원도 한번에?<br /></MobileTitle>
          <SubTitle>녹음 + 영상 패키지로<br />만족도를 높이세요!</SubTitle>
        </TitleWrapper>
        <Spacer height="40px" />
      </Section>
    );
  }
  
  // 현재 URL의 origin 부분 (서버 사이드 렌더링 안전하게)
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  
  return (
    <Section id="video-packages">
      <TitleWrapper>
        <MainTitle>한 번의 녹음, 한 편의 영상으로.</MainTitle>
        <MobileTitle>
         영상도, 음원도 한번에?<br />          
        </MobileTitle>
        <SubTitle>
         녹음 + 영상 패키지로<br />
         만족도를 높이세요!
        </SubTitle>
      </TitleWrapper>
      
      <Spacer height="40px" />
      
      <TabContainer>
        <Tab 
          active={videoType === 'horizontal'} 
          onClick={() => {
            console.log('가로 영상 탭 클릭');
            handleTabChange('horizontal');
          }}
          type="button"
          aria-label="가로 영상 보기"
        >
          가로 영상
        </Tab>
        <Tab 
          active={videoType === 'vertical'} 
          onClick={() => {
            console.log('세로 영상 탭 클릭');
            handleTabChange('vertical');
          }}
          type="button"
          aria-label="세로 영상 보기"
        >
          세로 영상
        </Tab>
      </TabContainer>
      
      <ContentContainer>
        <VideoSection>
          <VideoContainer isVertical={videoType === 'vertical'}>
            <VideoWrapper isVertical={videoType === 'vertical'}>
              {videoType === 'vertical' ? (
                <>
                  {isPlaying ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${verticalVideoId}?modestbranding=1&rel=0&showinfo=0&color=white&iv_load_policy=3&enablejsapi=1&playsinline=1&origin=${encodeURIComponent(origin)}&controls=1&autoplay=1`}
                      title="셀프노트 스튜디오 쇼츠 영상"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      playsinline="1"
                      loading="lazy"
                      fetchpriority="low"
                    ></iframe>
                  ) : (
                    <>
                      <VideoThumbnail 
                        thumbnail={getYoutubeThumbnail(verticalVideoId)} 
                        onClick={handlePlayVideo}
                        style={{ cursor: 'pointer' }}
                      />
                      <PlayButton onClick={handlePlayVideo} />
                    </>
                  )}
                </>
              ) : (
                <>
                  {isPlaying ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${horizontalVideoId}?modestbranding=1&rel=0&showinfo=0&color=white&iv_load_policy=3&enablejsapi=1&playsinline=1&origin=${encodeURIComponent(origin)}&controls=1&autoplay=1`}
                      title="셀프노트 스튜디오 데모 영상"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      playsinline="1"
                      loading="lazy"
                      fetchpriority="low"
                    ></iframe>
                  ) : (
                    <>
                      <VideoThumbnail 
                        thumbnail={getYoutubeThumbnail(horizontalVideoId)} 
                        onClick={handlePlayVideo}
                        style={{ cursor: 'pointer' }}
                      />
                      <PlayButton onClick={handlePlayVideo} />
                    </>
                  )}
                </>
              )}
            </VideoWrapper>
          </VideoContainer>
        </VideoSection>
        
        <PackagesSection className="package-cards-section" id="video-packages-cards">
          <PackageCardsContainer>
            {packagesData.map(pkg => (
              <PackageCard key={pkg.id}>
                {pkg.discount && <DiscountBadge>{pkg.discount}</DiscountBadge>}
                <PackageInfo>
                  <PackageTitle>{pkg.title}</PackageTitle>
                  <PackageDescription>
                    {isMobile ? (
                      <DescriptionLine>{pkg.mobileDescription}</DescriptionLine>
                    ) : (
                      pkg.description.map((line, i) => (
                        <DescriptionLine key={i}>{line}</DescriptionLine>
                      ))
                    )}
                  </PackageDescription>
                </PackageInfo>
                <PriceContainer>
                  {pkg.originalPrice && <OriginalPrice>{pkg.originalPrice}</OriginalPrice>}
                  <PackagePrice>{pkg.price}</PackagePrice>
                </PriceContainer>
              </PackageCard>
            ))}
          </PackageCardsContainer>
        </PackagesSection>
      </ContentContainer>
      
      <Spacer height="40px" />
      
      <Button href="/packages#video-packages-cards">모든 패키지 알아보기 &gt;</Button>
    </Section>
  );
} 
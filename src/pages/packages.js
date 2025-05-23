import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import SEOHead from '../components/SEOHead';
import Footer from '../components/Footer';

// 스타일 컴포넌트
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: #181A1B;
  padding: 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContent = styled.main`
  flex: 1;
  background: #181A1B;
  padding: 60px 0;
  color: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const BackArrow = styled.a`
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
  margin-bottom: 30px;
  
  &:hover {
    color: #00DCDF;
  }
  
  svg {
    margin-right: 8px;
  }
`;

const PageTitle = styled.h1`
  font-family: 'JalnanGothic', sans-serif;
  font-size: 2.5rem;
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
  
  @media (max-width: 900px) {
    font-size: 1.8rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  color: #bdbdbd;
  text-align: center;
  margin-bottom: 50px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 900px) {
    font-size: 1rem;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 10px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 20px;
  }
`;

const Tab = styled.button`
  background: ${props => props.active ? 'linear-gradient(90deg, #00DCDF 0%, #3491FF 100%)' : 'rgba(255, 255, 255, 0.1)'};
  color: #fff;
  border: none;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(90deg, #00DCDF 0%, #3491FF 100%)' : 'rgba(255, 255, 255, 0.2)'};
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px;
  }
`;

const PackageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const PackageTitle = styled.h2`
  font-size: 2rem;
  color: #fff;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const PackagePrice = styled.div`
  font-size: 1.5rem;
  color: #00DCDF;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 30px 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  font-size: 1.1rem;
  color: #e0e0e0;
  
  &:before {
    content: "✓";
    color: #00DCDF;
    margin-right: 10px;
    font-weight: bold;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const RecommendBox = styled.div`
  background: rgba(0, 220, 223, 0.1);
  border-left: 4px solid #00DCDF;
  padding: 15px;
  margin-top: 20px;
  border-radius: 0 8px 8px 0;
`;

const RecommendTitle = styled.h3`
  font-size: 1.1rem;
  color: #00DCDF;
  margin-bottom: 8px;
`;

const RecommendText = styled.p`
  font-size: 1rem;
  color: #e0e0e0;
`;

const BackButton = styled.a`
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  margin-top: 40px;
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  cursor: pointer;
`;

const VideoThumbnail = styled.div`
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 비율 */
  background-image: url(${props => props.thumbnail});
  background-size: cover;
  background-position: center;
  position: relative;
  display: ${props => props.isPlaying ? 'none' : 'block'};
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all 0.3s ease;
  
  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 30px solid white;
    margin-left: 7px;
  }
  
  ${VideoContainer}:hover & {
    background: rgba(0, 220, 223, 0.8);
    transform: translate(-50%, -50%) scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    
    &:before {
      border-top: 15px solid transparent;
      border-bottom: 15px solid transparent;
      border-left: 22px solid white;
      margin-left: 5px;
    }
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 비율 */
  height: 0;
  overflow: hidden;
  display: ${props => props.isPlaying ? 'block' : 'none'};
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const ScrollableOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  
  // 모바일에서만 적용
  @media (max-width: 900px) {
    pointer-events: none;
    
    // 컨트롤 영역만 포인터 이벤트 활성화
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40px; // 컨트롤 영역 높이
      pointer-events: auto;
    }
  }
`;

const SampleVideoTitle = styled.h3`
  font-size: 1.3rem;
  color: #00DCDF;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// 패키지 데이터
const packageData = [
  {
    id: 1,
    name: "일반 촬영",
    price: "15만원 / 부가세 별도",
    features: [
      "촬영 각도: 1각도 (1개의 고정 컷)",
      "촬영 횟수: 2회",
      "배경 선택: 가능",
      "가사 포함: X",
      "후반 작업: 색보정 포함, 컷 편집 없음"
    ],
    recommendation: "간단한 유튜브 업로드용 영상",
    videoId: "GPUfIOWN8KA"
  },
  {
    id: 2,
    name: "프리미엄 촬영",
    price: "20만원 / 부가세 별도",
    features: [
      "촬영 각도: 2각도 (다양한 구도 편집 가능)",
      "촬영 횟수: 4회",
      "배경 선택: 가능",
      "가사 포함: X",
      "후반 작업: 색보정 + 컷 편집 포함"
    ],
    recommendation: "퀄리티 있는 SNS 업로드용 영상",
    videoId: "1CX4X9xO984"
  },
  {
    id: 3,
    name: "프로 촬영",
    price: "30만원 / 부가세 별도",
    features: [
      "촬영 각도: 2각도 이상",
      "촬영 횟수: 4회",
      "배경 선택: 가능",
      "가사 포함: O",
      "후반 작업: 색보정 + 컷 편집 + 피부 보정 + 음정 보정 포함"
    ],
    recommendation: "자작곡 뮤직비디오, 고퀄 커버 영상",
    videoId: "bSM_dObA6qQ"
  },
  {
    id: 4,
    name: "스페셜 무비 촬영",
    price: "45만원 / 부가세 별도",
    features: [
      "촬영 각도: 다양한 각도",
      "촬영 횟수: 4~6회",
      "배경 선택: 가능",
      "가사 포함: O",
      "후반 작업: 색보정 + 컷 편집 + 피부 보정 + 음정 보정 + 하이라이트 메이킹 포함 + 사진 편집 포함"
    ],
    recommendation: "결혼식 축가 영상, 감동 연출용",
    videoId: "-3ibjD2rUBc"
  }
];

export default function Packages() {
  const [activeTab, setActiveTab] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsPlaying(false); // 탭 변경 시 비디오 재생 상태 초기화
  };
  
  const handleVideoClick = () => {
    setIsPlaying(true);
  };
  
  const activePackage = packageData.find(pkg => pkg.id === activeTab);
  const thumbnailUrl = `https://img.youtube.com/vi/${activePackage.videoId}/maxresdefault.jpg`;
  
  return (
    <PageContainer>
      <SEOHead 
        title="영상 패키지 - 셀프노트 스튜디오"
        description="셀프노트 스튜디오의 다양한 영상 패키지를 확인하세요. 일반 촬영, 프리미엄 촬영, 프로 촬영, 스페셜 무비 촬영까지 목적에 맞는 최적의 패키지를 선택할 수 있습니다."
        keywords="영상 패키지, 셀프노트 스튜디오, 유튜브 영상 제작, 뮤직비디오, 커버 영상, 축가 영상, 녹음실"
        ogImage="https://selfnote.co.kr/studio/studio02.webp?v=2"
        url="https://selfnote.co.kr/packages"
      />
      
      <Header>
        {/* 로고 제거 */}
      </Header>
      
      <MainContent>
        <Container>
          <BackArrow href="/#video-packages-cards">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 8H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 15L1 8L8 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            뒤로 가기
          </BackArrow>
          
          <PageTitle>영상 패키지</PageTitle>
          <PageSubtitle>
            셀프노트 스튜디오에서는 다양한 영상 패키지를 제공합니다.
            목적에 맞는 최적의 패키지를 선택하여 퀄리티 높은 영상을 제작하세요.
          </PageSubtitle>
          
          <TabContainer>
            {packageData.map(pkg => (
              <Tab 
                key={pkg.id}
                active={activeTab === pkg.id}
                onClick={() => handleTabClick(pkg.id)}
              >
                {pkg.name}
              </Tab>
            ))}
          </TabContainer>
          
          <PackageContainer>
            <PackageTitle>{activePackage.name}</PackageTitle>
            <PackagePrice>{activePackage.price}</PackagePrice>
            
            <FeatureList>
              {activePackage.features.map((feature, index) => (
                <FeatureItem key={index}>{feature}</FeatureItem>
              ))}
            </FeatureList>
            
            <RecommendBox>
              <RecommendTitle>추천 대상</RecommendTitle>
              <RecommendText>{activePackage.recommendation}</RecommendText>
            </RecommendBox>
          </PackageContainer>
          
          <SampleVideoTitle>{activePackage.name} 샘플 영상</SampleVideoTitle>
          <VideoContainer onClick={handleVideoClick}>
            <VideoThumbnail 
              thumbnail={thumbnailUrl}
              isPlaying={isPlaying}
            >
              <PlayButton />
            </VideoThumbnail>
            <VideoWrapper isPlaying={isPlaying}>
              <iframe
                src={`https://www.youtube.com/embed/${activePackage.videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=${isPlaying ? 1 : 0}`}
                title={`${activePackage.name} 샘플 영상`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                playsinline="1"
                loading="lazy"
                fetchpriority="low"
              ></iframe>
              <ScrollableOverlay />
            </VideoWrapper>
          </VideoContainer>
          
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <BackButton href="/#video-packages-cards">메인으로 돌아가기</BackButton>
          </div>
        </Container>
      </MainContent>
      
      <Footer />
    </PageContainer>
  );
} 
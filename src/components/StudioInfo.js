import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  background-color: #FFFFFF;
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  
  @media (max-width: 900px) {
    padding: 40px 0;
  }
`;

const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const MainTitle = styled.h2`
  font-family: 'JalnanGothic', sans-serif;
  font-size: 1.9rem;
  color: #222222;
  font-weight: 300;
  margin-bottom: 0;
  
  @media (max-width: 900px) {
    font-size: 1.3rem;
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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 30px;
  align-items: center;
  
  @media (max-width: 900px) {
    padding: 0 20px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
  
  @media (max-width: 900px) {
    order: 2;
  }
`;

const EquipmentSection = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const VideoSection = styled.div`
  width: 100%;
  position: relative;
  border-radius: 0;
  overflow: visible;
  box-shadow: none;
  background: none;
  @media (max-width: 900px) {
    width: 100%;
    border-radius: 0;
    overflow: visible;
    box-shadow: none;
    background: none;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 720px;
  aspect-ratio: 16/9;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    width: 100%;
    min-width: 0;
    aspect-ratio: 16/9;
    border-radius: 16px;
  }
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
    z-index: 1;
    display: block;
  }
`;

const ScrollableOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  
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

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  padding: 0;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: translate(-50%, -50%) scale(1.05);
  }

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
  
  @media (max-width: 900px) {
    width: 60px;
    height: 60px;
    
    &:before {
      border-top: 14px solid transparent;
      border-bottom: 14px solid transparent;
      border-left: 22px solid white;
    }
  }
`;

const YOUTUBE_ID = 'wtv1tZ-xT5I';
const YOUTUBE_THUMBNAIL = `https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`;

const VideoThumbnail = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('${YOUTUBE_THUMBNAIL}');
  background-size: cover;
  background-position: center;
  transition: opacity 0.3s ease;
  opacity: ${props => props.isHidden ? 0 : 1};
  z-index: 2;
  border-radius: 16px;
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SpaceInfo = styled.div`
  margin-bottom: 30px;
`;

const SpaceTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: 500;
  position: relative;
  padding-left: 15px;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 6px;
    height: 16px;
    background: linear-gradient(to bottom, #00DCDF, #3491FF);
    border-radius: 3px;
  }
`;

const SpaceDesc = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 15px;
  @media (max-width: 900px) {
    display: none;
  }
`;

const EquipmentListTitle = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 700;
  color: #3491FF;
  letter-spacing: -1px;
  margin-bottom: 12px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    font-size: 1.1rem;
    margin-top: 0;
    margin-bottom: 8px;
    text-align: left;
    justify-content: flex-start;
    display: flex;
  }
  @media (min-width: 901px) {
    display: none;
  }
`;

const EquipmentListTitleBar = styled.span`
  display: none;
  @media (max-width: 900px) {
    display: inline-block;
    width: 6px;
    height: 22px;
    background: linear-gradient(180deg, #00DCDF 0%, #3491FF 100%);
    border-radius: 3px;
    margin-right: 10px;
    vertical-align: middle;
  }
`;

const EquipmentList = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  gap: 32px;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 900px) {
    display: block;
    margin-top: 12px;
  }
`;

const EquipmentTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: 500;
  position: relative;
  padding-left: 15px;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 6px;
    height: 16px;
    background: linear-gradient(to bottom, #00DCDF, #3491FF);
    border-radius: 3px;
  }
`;

const EquipmentItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const EquipmentIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #fff !important;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #e0e0e0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 6px;
    background: #fff;
  }

  .fallback-icon {
    width: 24px;
    height: 24px;
    color: #3491FF;
  }
`;

const EquipmentName = styled.span`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;

// PC: 동영상 오른쪽 세로, 모바일: 2x2 그리드 갤러리
const GalleryColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-left: 40px;
  height: 720px;
  justify-content: stretch;
  @media (max-width: 900px) {
    margin-left: 0;
    margin-top: 32px;
    gap: 0;
    height: auto;
  }
`;

// 갤러리 슬라이드 컨테이너 스타일
const GalleryContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
`;

const GalleryGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  overflow-x: auto;
  padding: 10px 0;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

// 슬라이드 네비게이션 버튼
const SlideNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  padding: 15px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-50%) scale(1.1);
  }
  
  &.prev {
    left: -20px;
  }
  
  &.next {
    right: -20px;
  }
  
  @media (max-width: 768px) {
    padding: 12px;
    
    &.prev {
      left: -10px;
    }
    
    &.next {
      right: -10px;
    }
  }
`;

const ArrowIcon = styled.svg`
  width: 42px;
  height: 42px;
  fill: white;
  filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.5));
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
`;

const GalleryImg = styled.img`
  width: 320px;
  height: 180px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  background: #fff;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
  
  @media (max-width: 900px) {
    width: 100%;
    aspect-ratio: 1/1;
  }
`;

// 장비 데이터
const equipmentData = [
  { 
    name: "Neumann TLM-103", 
    logo: "/logo/neuman.webp" 
  },
  { 
    name: "RME Fireface UFX2", 
    logo: "/logo/rme.webp" 
  },
  { 
    name: "Neve 1073DPA", 
    logo: "/logo/neve.webp" 
  },
  { 
    name: "Tube-Tech CL-1B", 
    logo: "/logo/tubetech.webp" 
  },
  { 
    name: "Cubase Pro 12", 
    logo: "/logo/cubase.webp" 
  }
];

// 스튜디오 룸 데이터
const roomData = [
  {
    name: "스튜디오 1",
    image: "/studio/studio01.webp"
  },
  {
    name: "스튜디오 2",
    image: "/studio/studio02.webp"
  },
  {
    name: "스튜디오 3",
    image: "/studio/studio03.webp"
  },
  {
    name: "스튜디오 4",
    image: "/studio/studio04.webp"
  },
  {
    name: "스튜디오 5",
    image: "/studio/studio05.webp"
  },
  {
    name: "스튜디오 6",
    image: "/studio/studio06.webp"
  },
  {
    name: "스튜디오 7",
    image: "/studio/studio07.webp"
  },
  {
    name: "스튜디오 8",
    image: "/studio/studio08.webp"
  },
  {
    name: "스튜디오 9",
    image: "/studio/studio09.webp"
  },
  {
    name: "스튜디오 10",
    image: "/studio/studio10.webp"
  },
  {
    name: "스튜디오 11",
    image: "/studio/studio11.webp"
  },
  {
    name: "스튜디오 12",
    image: "/studio/studio12.webp"
  },
  {
    name: "스튜디오 13",
    image: "/studio/studio13.webp"
  },
  {
    name: "스튜디오 14",
    image: "/studio/studio14.webp"
  },
  {
    name: "스튜디오 15",
    image: "/studio/studio15.webp"
  },
  {
    name: "스튜디오 16",
    image: "/studio/studio16.webp"
  },
  {
    name: "스튜디오 17",
    image: "/studio/studio17.webp"
  }
];

export default function StudioInfo() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const galleryRef = React.useRef(null);

  const handleImageError = (index) => {
    setImageErrors(prev => ({
      ...prev,
      [index]: true
    }));
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleModalClick = () => {
    setSelectedImage(null);
  };
  
  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };
  
  // 갤러리 슬라이드 네비게이션 함수
  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = 350; // 스크롤할 픽셀 양
      if (direction === 'prev') {
        galleryRef.current.scrollLeft -= scrollAmount;
      } else {
        galleryRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <Section id="studio-info">
      <TitleWrapper>
        <MainTitle>전문가의 손길로 완성되는</MainTitle>
        <div style={{ height: '8px' }}></div>
        <SubTitle>최적의 공간, 최고의 장비</SubTitle>
      </TitleWrapper>
      <ContentWrapper>
        <VideoSection>
          <VideoContainer>
            {isVideoPlaying ? (
              <>
                <iframe
                  src="https://www.youtube.com/embed/wtv1tZ-xT5I?rel=0&modestbranding=1&autoplay=1&playsinline=1"
                  title="셀프노트 스튜디오 시설 둘러보기"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  playsinline="1"
                  loading="lazy"
                  fetchpriority="low"
                ></iframe>
                <ScrollableOverlay />
              </>
            ) : (
              <>
                <VideoThumbnail isHidden={isVideoPlaying} />
                <PlayButton onClick={handlePlayVideo} />
              </>
            )}
          </VideoContainer>
        </VideoSection>
        
        <GalleryContainer>
          <SlideNavButton className="prev" onClick={() => scrollGallery('prev')} aria-label="이전 이미지">
            <ArrowIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </ArrowIcon>
          </SlideNavButton>
          <SlideNavButton className="next" onClick={() => scrollGallery('next')} aria-label="다음 이미지">
            <ArrowIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </ArrowIcon>
          </SlideNavButton>
          <GalleryGrid ref={galleryRef}>
            {roomData.map((room, index) => (
              <GalleryImg 
                key={index} 
                src={room.image} 
                alt={room.name} 
                onClick={() => handleImageClick(room.image)}
              />
            ))}
          </GalleryGrid>
        </GalleryContainer>

        <EquipmentSection>
          <EquipmentListTitle>
            <EquipmentListTitleBar />
            주요 장비 리스트
          </EquipmentListTitle>
          <EquipmentList>
            {equipmentData.map((item, index) => (
              <EquipmentItem key={index}>
                <EquipmentIcon>
                  {!imageErrors[index] ? (
                    <img 
                      src={item.logo} 
                      alt={`${item.name} 로고`}
                      onError={() => handleImageError(index)}
                      loading="eager"
                    />
                  ) : (
                    <svg 
                      className="fallback-icon" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" 
                        fill="currentColor"
                      />
                    </svg>
                  )}
                </EquipmentIcon>
                <EquipmentName>{item.name}</EquipmentName>
              </EquipmentItem>
            ))}
          </EquipmentList>
        </EquipmentSection>
      </ContentWrapper>

      {selectedImage && (
        <Modal onClick={handleModalClick}>
          <ModalImage src={selectedImage} alt="확대된 이미지" />
        </Modal>
      )}
    </Section>
  );
} 
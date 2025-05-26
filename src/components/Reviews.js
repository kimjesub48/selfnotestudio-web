import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  background: #F7F9FB;
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
  margin-bottom: 50px;
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

const ReviewsRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const ReviewCard = styled.div`
  background-color: #FFFFFF;
  border-radius: 16px;
  padding: 0;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #F0F0F0;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  width: 280px;
  overflow: hidden;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  }
  
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const ReviewContent = styled.p`
  color: #333333;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
  padding: 0 24px;
`;

const ReviewAuthor = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  padding: 0 24px 24px;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  color: #222222;
  font-weight: 600;
  font-size: 16px;
`;

const AuthorDescription = styled.span`
  color: #777777;
  font-size: 14px;
  margin-top: 3px;
`;

const ReviewImage = styled.div`
  width: 100%;
  height: 180px;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  margin-bottom: 20px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const PlayButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(80, 80, 80, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  
  &:hover {
    transform: scale(1.1);
    background: rgba(60, 60, 60, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 12px solid white;
    margin-left: 3px;
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  background: linear-gradient(to right, #00DCDF, #3491FF);
  color: white;
  font-size: 17px;
  font-weight: 700;
  padding: 14px 30px;
  border-radius: 12px;
  text-decoration: none;
  margin-top: 50px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 900px) {
    font-size: 16px;
    padding: 12px 25px;
  }
`;

// 모달 컴포넌트 스타일
const ModalOverlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen'
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const ModalContent = styled.div`
  background-color: #000;
  border-radius: 16px;
  width: 80%;
  max-width: 900px;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;
  z-index: 1100;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  
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
  pointer-events: none;
`;

// 리뷰 데이터
const reviewsData = [
  {
    content: "처음 녹음했는데 가수된 느낌이에요! 제 목소리가 이렇게 좋게 들릴 수 있다는 것에 정말 놀랐어요. 녹음부터 믹싱까지 완벽했습니다.",
    author: "김oo",
    description: "이벤트",
    image: "/blog/blog-01.webp",
    profileImage: "",
    initials: "민",
    youtubeUrl: "https://www.youtube.com/watch?v=CeDsUL7LHBY",
    youtubeId: "CeDsUL7LHBY"
  },
  {
    content: "시간당 녹음 무제한 최고였습니다. 다른 스튜디오는 시간에 쫓겨서 제대로 만족스럽게 녹음을 못했는데, 여기서는 충분히 연습하고 녹음할 수 있어서 좋았어요!",
    author: "박oo",
    description: "취미 녹음",
    image: "/blog/blog-02.webp",
    profileImage: "",
    initials: "준",
    youtubeUrl: "https://www.youtube.com/watch?v=Gvn06zzb2wg",
    youtubeId: "Gvn06zzb2wg"
  },
  {
    content: "영상 패키지까지 함께 했는데 퀄리티가 정말 좋았어요. 음원과 영상이 함께 있으니 SNS에 공유하기도 좋고, 반응도 엄청 좋네요!",
    author: "이oo",
    description: "유튜브 영상 제작",
    image: "/blog/blog-03.webp",
    profileImage: "",
    initials: "지",
    youtubeUrl: "https://www.youtube.com/watch?v=1CX4X9xO984",
    youtubeId: "1CX4X9xO984"
  },
  {
    content: "1:1 맞춤 디렉팅이 정말 좋았습니다. 제가 어떤 부분이 부족한지 몰랐는데, 프로 엔지니어분이 코칭해주시니 확실히 실력이 늘었어요. 다음에도 또 이용할게요!",
    author: "강oo",
    description: "결혼식 식전영상",
    image: "/blog/blog-04.webp",
    profileImage: "",
    initials: "현",
    youtubeUrl: "https://www.youtube.com/watch?v=-3ibjD2rUBc",
    youtubeId: "-3ibjD2rUBc"
  }
];

export default function Reviews() {
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  // origin 파라미터 추가 (SSR 안전)
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  
  // 모바일 여부 체크
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    
    // 초기 체크
    checkMobile();
    
    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', checkMobile);
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // 비디오 모달 열기
  const openVideoModal = (videoId) => {
    setCurrentVideoId(videoId);
    setIsModalOpen(true);
    setIsVideoPlaying(false);
    document.body.style.overflow = 'hidden'; // 모달 열릴 때 스크롤 방지
  };
  
  // 비디오 모달 닫기
  const closeVideoModal = () => {
    setIsModalOpen(false);
    setIsVideoPlaying(false);
    document.body.style.overflow = ''; // 모달 닫힐 때 스크롤 복원
  };
  
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.keyCode === 27 && isModalOpen) {
        closeVideoModal();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen]);
  
  return (
    <Section id="reviews">
      <TitleWrapper>
        <MainTitle>100% 실제 이용 고객들의</MainTitle>
        <div style={{ height: '8px' }}></div>
        <SubTitle>생생한 리얼 후기</SubTitle>
      </TitleWrapper>
      
      <ReviewsRow>
        {reviewsData.map((review, index) => (
          <ReviewCard key={index}>
            {review.image && (
              <ReviewImage image={review.image}>
                <img src={review.image} alt={`${review.author}의 셀프노트 이용 후기`} />
              </ReviewImage>
            )}
            <ReviewContent>
              {review.content}
            </ReviewContent>
            <ReviewAuthor>
              <AuthorInfo>
                <AuthorName>{review.author}</AuthorName>
                <AuthorDescription>{review.description}</AuthorDescription>
              </AuthorInfo>
            </ReviewAuthor>
            <PlayButton 
              onClick={() => openVideoModal(review.youtubeId)}
              aria-label="작업물 보기"
              title="작업물 보기"
            />
          </ReviewCard>
        ))}
      </ReviewsRow>
      
      {/* 비디오 모달 */}
      <ModalOverlay isOpen={isModalOpen} onClick={closeVideoModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={closeVideoModal}>&times;</CloseButton>
          <VideoContainer>
            {isModalOpen && (
              <>
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  playsinline="1"
                  loading="lazy"
                  fetchpriority="low"
                ></iframe>
                <ScrollableOverlay />
              </>
            )}
          </VideoContainer>
        </ModalContent>
      </ModalOverlay>
    </Section>
  );
} 
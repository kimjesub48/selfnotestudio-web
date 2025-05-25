import { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Spacer from './common/Spacer';
import React from 'react';
import Image from 'next/image';
import ReactDOM from 'react-dom/client';

// 비디오 카드 컴포넌트: 각각의 특징을 소개하는 카드 섹션
const VideoCard = React.memo(({ index, isMobile, styles, expandedCards, toggleCard }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // 비디오 기본 스타일
  const videoStyle = {
    objectFit: 'cover',
    objectPosition: 'center center',
    width: `${styles.pcVideoSize}px`,
    height: `${styles.pcVideoSize}px`,
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 2,
    borderRadius: '32px',
    display: 'block',
    opacity: videoLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease',
    transform: 'translate(-50%, -50%)'
  };

  // 비디오 컨테이너 스타일 (비디오를 감싸는 박스)
  const videoContainerStyle = {
    position: 'relative',
    width: `${styles.pcVideoSize}px`,
    height: `${styles.pcVideoSize}px`,
    overflow: 'hidden',
    padding: 0,
    backgroundColor: '#272840',
    borderRadius: '32px',
    margin: isMobile ? '0 auto' : '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  // 포스터 플레이스홀더 스타일
  const posterStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: `${styles.pcVideoSize}px`,
    height: `${styles.pcVideoSize}px`,
    backgroundColor: '#272840',
    zIndex: videoLoaded ? 0 : 1,
    opacity: videoLoaded ? 0 : 1,
    transition: 'opacity 0.3s ease',
    borderRadius: '32px',
    transform: 'translate(-50%, -50%)'
  };

  // 더보기 버튼 스타일
  const moreButtonStyle = {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: 0,
    color: '#E3E3C9',
    fontSize: '0.95rem',
  };

  // 배지(태그) 스타일
  const badgeStyle = {
    fontSize: isMobile ? '1rem' : '1.1rem',
    borderRadius: '50px',
    color: '#51B7F1',
    padding: '6px 12px',
    background: '#272840',
    border: '1px solid #4E4F6A',
    display: 'inline-block'
  };

  // 각 카드의 컨텐츠 데이터
  const cardData = [
    {
      badge: '무제한 녹음',
      title: '원하는 만큼 자유롭게',
      highlight: '시간당 무제한 녹음',
      description: "셀프노트 스튜디오는 시간당 곡수 제한 없이\n자유로운 녹음이 가능합니다. 원하는 만큼 반복,수정하고\n새로운 시도를 거듭하며 최고의 결과물을 만들어보세요."
    },
    {
      badge: '1:1 맞춤 디렉팅',
      title: '프로 엔지니어와',
      highlight: '1:1 맞춤 디렉팅',
      description: "수많은 프로 아티스트들과 함께한 노하우를 통해 \n발음, 호흡, 감정 표현까지 세심하게 디렉팅합니다.\n1:1 디렉팅을 직접 경험해보세요"
    },
    {
      badge: '완성도 높은 결과',
      title: '노래 실력이 바뀐다',
      highlight: '음정보정으로 실력UP',
      description: "단순한 녹음 파일을 넘어서, 완성도 높은 음원을 제공\n음정 보정(튠)은 물론, 발음 교정과 보컬 코칭, 믹싱으로\n누구나 음원발매, 유튜브 업로드 가능합니다."
    },
    {
      badge: '영상 패키지',
      title: '가수들도 선택한',
      highlight: '확실한 영상 퀄리티!',
      description: "임창정, DK, 임도혁, 전철민 등 유명 가수들이 선택한\n확실한 영상 퀄리티! 색보정, 컷 편집, 피부 보정이 포함된\n고퀄리티 영상을 지금 바로 확인하세요!"
    }
  ];

  const data = cardData[index];

  // 비디오 URL 생성
  const getVideoUrl = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const videoFiles = ['card1.mp4', 'card2.mp4', 'card3.mp4', 'card4.mp4'];
    return `${baseUrl}/videos/${videoFiles[index]}`;
  };

  // 빠른 로딩을 위한 즉시 재생 처리
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
      // 즉시 재생 시도
      video.play().catch(() => {
        console.log(`Card ${index + 1} autoplay prevented, but video loaded`);
      });
    };

    const handleLoadedData = () => {
      setVideoLoaded(true);
      // 즉시 재생 시도
      video.play().catch(() => {
        console.log(`Card ${index + 1} autoplay prevented, but video loaded`);
      });
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    
    // 즉시 로드 시작
    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [index]);

  return (
    <>
      <div className={`why-card-simple ${index % 2 === 1 ? 'reverse' : ''}`} style={{ 
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 0
      }}>
        <div className="why-card-text-simple" style={{ 
          textAlign: isMobile ? 'center' : (index % 2 === 1 ? 'right' : 'left'),
          alignItems: isMobile ? 'center' : (index % 2 === 1 ? 'flex-end' : 'flex-start'),
          display: 'flex',
          flexDirection: 'column',
          maxWidth: styles.pcTextMaxWidth,
          color: '#222222',
          width: isMobile ? '100%' : 'auto',
          order: isMobile ? 0 : (index % 2 === 1 ? 1 : 0),
          justifyContent: 'center',
          gap: isMobile ? '8px' : '12px',
          padding: 0
        }}>
          {/* 배지 */}
          <span className="why-badge-simple" style={{
            ...badgeStyle,
            alignSelf: isMobile ? 'flex-start' : (index % 2 === 1 ? 'flex-end' : 'flex-start'),
            marginBottom: isMobile ? '0' : '12px'
          }}>{data.badge}</span>

          {/* 제목 */}
          <h3 className="why-card-title-simple jalnan" style={{ 
            fontSize: isMobile ? '1.3rem' : '2rem',
            fontWeight: 'normal',
            color: '#FFFFFF',
            margin: 0,
            marginBottom: isMobile ? '0' : '12px'
          }}>
            {data.title}<br />
            <span className="why-highlight-simple jalnan" style={{ 
              fontSize: isMobile ? '1.3rem' : '2rem',
              color: '#3491FF'
            }}>{data.highlight}</span>
          </h3>

          {/* 모바일에서 더보기 버튼 또는 설명 텍스트 */}
          {isMobile && !expandedCards[index] ? (
            <>
              <button onClick={() => toggleCard(index)} style={moreButtonStyle}>
                더보기 {'>'}
              </button>
            </>
          ) : (
            <p className="why-desc-simple" style={{ 
              whiteSpace: 'pre-line',
              textAlign: isMobile ? 'left' : (index % 2 === 1 ? 'right' : 'left'),
              fontSize: isMobile ? '0.9rem' : '1rem',
              lineHeight: isMobile ? '1.5' : '1.6',
              color: '#E0E0E0',
              margin: 0
            }}>
              {data.description}
            </p>
          )}
        </div>

        <div 
          ref={containerRef}
          className="why-card-img-simple why-choose-us-video-container" 
          style={{
            ...videoContainerStyle,
            order: isMobile ? 1 : (index % 2 === 1 ? 0 : 1),
            marginLeft: !isMobile && index % 2 === 0 ? styles.pcGap : 0,
            marginRight: !isMobile && index % 2 === 1 ? styles.pcGap : 0,
            padding: 0,
            marginTop: isMobile ? '-4px' : 0
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={videoStyle}
            className="why-choose-us-video"
            webkit-playsinline="true"
            x5-playsinline="true"
          >
            <source src={getVideoUrl()} type="video/mp4" />
          </video>
          <div style={posterStyle} />
        </div>
      </div>
    </>
  );
});

VideoCard.displayName = 'VideoCard';

// WhyChooseUs 메인 컴포넌트
export default function WhyChooseUs() {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedCards, setExpandedCards] = useState([false, false, false, false]);
  const [mounted, setMounted] = useState(false);

  // 모바일 체크 함수
  const checkMobile = useCallback(() => {
    return window.innerWidth <= 900;
  }, []);

  // 컴포넌트 마운트 및 리사이즈 이벤트 처리
  useEffect(() => {
    setMounted(true);
    setIsMobile(checkMobile());
    
    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [checkMobile]);

  // 카드 토글 함수
  const toggleCard = (index) => {
    setExpandedCards(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  // 스타일 설정
  const styles = {
    pcVideoSize: isMobile ? 330 : 320,
    pcGap: isMobile ? 20 : 80,
    pcTextMaxWidth: isMobile ? 320 : 380,
  };

  // 실제 렌더링
  return (
    <>
      {/* 아주 간단한 아이폰 중앙 정렬 */}
      <style>{`
        @media (max-width: 900px) {
          .why-choose-us-video-container {
            text-align: center !important;
          }
          .why-choose-us-video {
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
          }
        }
      `}</style>
      <section
        className="why-section-simple" 
        id="why-choose-us"
        style={{ 
          background: '#13151C',
          padding: isMobile ? '60px 0' : '100px 0',
          width: '100%',
          margin: 0,
          overflow: 'hidden'
        }}
      >
        <div className="why-section-title jalnan" style={{ 
          fontSize: isMobile ? '1.3rem' : '1.9rem',
          color: '#FFFFFF',
          fontWeight: 300,
          fontFamily: 'JalnanGothic',
          marginBottom: '15px',
          textAlign: 'center'
        }}>녹음실 고민되시나요?</div>

        <div className="why-subtitle" style={{
          fontSize: isMobile ? '1.8rem' : '2.5rem',
          fontFamily: 'JalnanGothic',
          fontWeight: 300,
          background: 'linear-gradient(to right, #00DCDF, #3491FF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.4,
          textAlign: 'center',
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: isMobile ? '0px' : '40px'
        }}>
          셀프노트와 함께하면<br />녹음이 쉬워집니다!
        </div>
        
        <Spacer height={{ mobile: 40, pc: 40 }} isMobile={isMobile} />

        {mounted && (
          <div className="why-cards-simple" style={{ 
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            gap: 0,
            background: '#13151C',
            alignItems: 'center',
            width: '100%'
          }}>
            {[0, 1, 2, 3].map((index, i) => (
              <React.Fragment key={index}>
                <div style={{ 
                  background: '#13151C',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <VideoCard
                    index={index}
                    isMobile={isMobile}
                    styles={styles}
                    expandedCards={expandedCards}
                    toggleCard={toggleCard}
                  />
                </div>
                {index < 3 && <Spacer height={{ mobile: 80, pc: 100 }} isMobile={isMobile} />}
              </React.Fragment>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
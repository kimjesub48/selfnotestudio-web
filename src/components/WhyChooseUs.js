import { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Spacer from './common/Spacer';
import React from 'react';
import Image from 'next/image';
import ReactDOM from 'react-dom/client';

// 비디오 카드 컴포넌트: 각각의 특징을 소개하는 카드 섹션
const VideoCard = React.memo(({ index, isMobile, styles, expandedCards, toggleCard }) => {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const containerRef = useRef(null);

  // iOS 감지
  useEffect(() => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);
  }, []);

  // 비디오 기본 스타일
  const videoStyle = {
    objectFit: 'cover',
    objectPosition: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    borderRadius: '32px',
    display: 'block',
    opacity: videoLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease'
  };

  // 비디오 컨테이너 스타일 (비디오를 감싸는 박스)
  const videoContainerStyle = {
    position: 'relative',
    width: `${styles.pcVideoSize}px`,
    height: `${styles.pcVideoSize}px`,
    overflow: 'hidden',
    padding: 0,
    backgroundColor: '#272840',
    borderRadius: '32px'
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
    // 인덱스에 따라 올바른 파일명 반환
    const videoFiles = ['card1.mp4', 'card2.mp4', 'card3.mp4', 'card4.mp4'];
    return `${baseUrl}/videos/${videoFiles[index]}`;
  };
  
  // 포스터 이미지 URL 생성
  const getPosterUrl = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    return `${baseUrl}/images/card${index + 1}-poster.jpg${index >= 2 ? '?v=3' : ''}`;
  };

  // 비디오 재생 로직 개선
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // iOS Safari에서도 작동하도록 설정
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    
    // 비디오 이벤트 리스너
    const handleCanPlay = () => {
      setVideoLoaded(true);
      // iOS에서 자동재생 시도
      if (isIOS) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log(`iOS Video ${index + 1} autoplay failed:`, error);
            // 자동재생 실패시 포스터 이미지 유지
            setVideoLoaded(false);
          });
        }
      }
    };

    const handleLoadedData = () => {
      setVideoLoaded(true);
    };

    const handleError = () => {
      console.log(`Video ${index + 1} load error`);
      setVideoLoaded(false);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    
    // 비디오 로드
    video.load();
    
    // IntersectionObserver를 사용하여 뷰포트에 들어올 때만 비디오 로드
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // 비디오 재생 시도 (iOS가 아닌 경우)
        if (!isIOS) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.then(() => {
              setVideoLoaded(true);
            }).catch(error => {
              console.log(`Video ${index + 1} autoplay failed:`, error);
              setVideoLoaded(false);
            });
          }
        }
        observer.disconnect();
      }
    }, {
      rootMargin: '100px',
      threshold: 0.1
    });
    
    observer.observe(video);
    
    return () => {
      observer.disconnect();
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.pause();
      video.src = '';
      video.load();
    };
  }, [index, isIOS]);

  return (
    <>
      <div className={`why-card-simple ${index % 2 === 1 ? 'reverse' : ''}`} style={{ 
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'center' : 'flex-start',
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
          className="why-card-img-simple" 
          style={{
            ...videoContainerStyle,
            order: isMobile ? 1 : (index % 2 === 1 ? 0 : 1),
            marginLeft: !isMobile && index % 2 === 0 ? styles.pcGap : 0,
            marginRight: !isMobile && index % 2 === 1 ? styles.pcGap : 0,
            padding: 0,
            marginTop: isMobile ? '-4px' : 0
          }}
        >
          {/* 포스터 이미지 (동영상 로드 전 보여줄 이미지) */}
          <img 
            src={getPosterUrl()}
            alt={`Card ${index + 1}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              borderRadius: '32px',
              zIndex: videoLoaded ? 0 : 1
            }}
            loading="eager" // 모든 이미지 즉시 로드
          />
          
          <video
            ref={videoRef}
            key={`card${index + 1}-video`}
            autoPlay={!isIOS}
            loop
            muted
            defaultMuted
            playsInline
            preload="auto"
            poster={getPosterUrl()}
            style={videoStyle}
            playsinline="true"
            webkit-playsinline="true"
            x5-playsinline="true"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
            loading="lazy"
            fetchpriority="low"
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoLoaded(false)}
            onCanPlay={() => {
              if (isIOS) {
                const video = videoRef.current;
                if (video) {
                  video.play().catch(() => {
                    setVideoLoaded(false);
                  });
                }
              }
            }}
          >
            <source src={getVideoUrl()} type="video/mp4" />
            동영상을 로드할 수 없습니다.
          </video>
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
          background: '#13151C'
        }}>
          {[0, 1, 2, 3].map((index, i) => (
            <React.Fragment key={index}>
              <div style={{ background: '#13151C' }}>
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
  );
}
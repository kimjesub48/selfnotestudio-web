'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const MainTitle = styled.h2`
  font-family: 'JalnanGothic', sans-serif;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  background: linear-gradient(to right, #00DCDF, #3491FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  line-height: 1.4;
  font-weight: 300;
`;

const SubTitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: #333;
  line-height: 1.5;
`;

const PlayerContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  /* 완전한 중앙 정렬 보장 */
  text-align: center;
  
  /* iOS Safari 호환성 개선 */
  -webkit-box-align: center;
  -webkit-box-pack: center;
  -webkit-flex-direction: column;
  -webkit-align-items: center;
  -webkit-justify-content: center;
`;

const CardsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  padding: 0 20px;
  
  /* 완전한 중앙 정렬을 위한 스타일 */
  margin: 0 auto;
  text-align: center;
  
  /* iOS Safari 호환성 개선 */
  -webkit-box-align: center;
  -webkit-box-pack: center;
  -webkit-align-items: center;
  -webkit-justify-content: center;
`;

const AlbumCard = styled.div`
  width: 320px;
  height: 320px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  position: relative;
  
  /* 완전한 중앙 정렬을 위한 스타일 */
  margin: 0 auto;
  display: block;
  
  @media (max-width: 768px) {
    width: 320px;
    height: 320px;
  }
  
  @media (max-width: 480px) {
    width: 300px;
    height: 300px;
  }
`;

const AlbumImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
  filter: ${props => props.grayscale ? 'grayscale(100%)' : 'grayscale(0%)'};
  transition: filter 0.5s ease;
`;

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: transparent;
  border: none;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
  
  &:before {
    content: '';
    display: block;
    ${props => props.isPlaying ? `
      width: 34px;
      height: 48px;
      border-left: 12px solid white;
      border-right: 12px solid white;
    ` : `
      width: 0;
      height: 0;
      border-top: 28px solid transparent;
      border-bottom: 28px solid transparent;
      border-left: 46px solid white;
    `}
  }
  
  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
    
    &:before {
      ${props => props.isPlaying ? `
        width: 30px;
        height: 42px;
        border-left: 10px solid white;
        border-right: 10px solid white;
      ` : `
        border-top: 24px solid transparent;
        border-bottom: 24px solid transparent;
        border-left: 38px solid white;
      `}
    }
  }
  
  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
    
    &:before {
      ${props => props.isPlaying ? `
        width: 26px;
        height: 36px;
        border-left: 9px solid white;
        border-right: 9px solid white;
      ` : `
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
        border-left: 32px solid white;
      `}
    }
  }
`;

const AlbumInfo = styled.div`
  text-align: center;
  margin-top: 24px;
  color: #333;
  padding: 0 20px;
  width: 100%;
  
  /* 완전한 중앙 정렬을 위한 스타일 */
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
`;

const AlbumTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  font-family: 'JalnanGothic', sans-serif;
  color: #333;
  font-weight: 300;
`;

const AlbumArtist = styled.p`
  font-size: 1rem;
  margin: 5px 0 0;
  opacity: 0.8;
  color: #333;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px auto 15px auto;
  position: relative;
  width: 300px;
  height: 50px;
  border-radius: 30px;
  background: #f0f0f0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 4px;
  
  /* iOS Safari 호환성 개선 */
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -webkit-align-items: center;
`;

const ToggleOption = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  cursor: pointer;
  user-select: none;
  color: ${props => props.active ? '#fff' : '#555'};
  font-weight: ${props => props.active ? '500' : '400'};
  transition: color 0.3s ease;
  text-align: center;
  font-size: 15px;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ToggleSlider = styled.div`
  position: absolute;
  width: calc(50% - 8px);
  height: calc(100% - 8px);
  background: linear-gradient(to right, #00DCDF, #3491FF);
  border-radius: 25px;
  top: 4px;
  left: ${props => props.position === 'right' ? 'calc(50% + 4px)' : '4px'};
  transition: left 0.3s ease;
  z-index: 1;
`;

const AudioModeIndicator = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  pointer-events: none;
  opacity: 0.8;
`;

const HelpText = styled.p`
  text-align: center;
  margin: 20px auto 0;
  max-width: 600px;
  font-size: 14px;
  color: #777;
  line-height: 1.5;
  padding: 0 20px;
`;

const AudioErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
  padding: 8px;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: 4px;
  text-align: center;
`;

const LoadingStatus = styled.div`
  font-size: 12px;
  color: #7f8c8d;
  margin-top: 5px;
`;

// 녹음실 대여 카드 스타일
const RentalCardSection = styled.div`
  margin: 40px auto 0 auto;
  width: 100%;
  max-width: 600px;
  padding: 0 20px;
  text-align: center;
`;

const RentalCard = styled.div`
  background: linear-gradient(135deg, #374151 0%, #1e293b 50%, #0f172a 100%);
  border-radius: 12px;
  padding: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  
  &:hover {
    background: linear-gradient(135deg, #4b5563 0%, #334155 50%, #1e293b 100%);
  }
  
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }
`;

const RentalInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const RentalTitle = styled.h3`
  font-size: 1.2rem;
  color: white;
  margin: 0 0 5px;
  font-weight: 600;
`;

const RentalDescription = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0;
  line-height: 1.4;
  
  @media (max-width: 900px) {
    margin-bottom: 15px;
  }
`;

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

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
  @media (max-width: 900px) {
    align-items: flex-start;
    width: 100%;
  }
`;

const RentalPrice = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  color: #00E1FF;
  margin-bottom: 0;
  display: flex;
  align-items: flex-end;
  
  @media (max-width: 900px) {
    font-size: 1.5rem;
  }
`;

const PriceUnit = styled.span`
  font-size: 0.9rem;
  color: #999;
  font-weight: 400;
  margin-left: 4px;
  margin-bottom: 4px;
`;

// 카카오톡 상담 버튼 스타일
const KakaoButton = styled.a`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: auto;
  height: 50px;
  border-radius: 25px;
  background-color: #FEE500; /* 카카오톡 노란색 */
  display: flex;
  align-items: center;
  padding: 0 20px 0 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
  }
  
  @media (max-width: 768px) {
    height: 45px;
    padding: 0 15px 0 10px;
    bottom: 20px;
    right: 20px;
  }
`;

const KakaoIcon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 208 191'%3E%3Cpath fill='%23391B1B' d='M104 0C46.56 0 0 36.71 0 82c0 29.28 19.47 54.97 48.75 69.48-1.59 5.99-10.24 38.34-10.58 40.98-.41 3.21 1.16 3.18 2.39 2.32 1-0.7 39.97-27.14 56.14-38.19 2.38 0.13 4.74 0.41 7.3 0.41 57.44 0 104-36.71 104-82C208 36.71 161.44 0 104 0z'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 8px;
  
  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
    margin-right: 6px;
  }
`;

const KakaoText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #391B1B;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const KakaoTooltip = styled.span`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  
  ${KakaoButton}:hover & {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

// 할인 배지 스타일
const PopularBadge = styled.div`
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

export default function AudioComparisonClient() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMode, setAudioMode] = useState('original'); // 'original' or 'tuned'
  const [isMobile, setIsMobile] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const originalAudioRef = useRef(null);  // 오리지널 오디오 참조
  const tunedAudioRef = useRef(null);     // 음정보정 오디오 참조
  
  // 타임스탬프 생성 - 캐싱 방지용
  const timestamp = useRef(new Date().getTime());
  
  // 인라인 트리거 - 사용자 인터랙션 확보용
  const [interactionTrigger, setInteractionTrigger] = useState(false);
  
  // 절대 경로로 오디오 파일 URL 생성
  const getAudioUrl = (path) => {
    // 현재 도메인 기준 절대 경로 생성 및 타임스탬프 추가
    const baseUrl = window.location.origin;
    return `${baseUrl}${path}?t=${timestamp.current}`;
  };
  
  // 앨범 데이터
  const albums = [
    {
      id: 1,
      title: "운이 좋았지",
      artist: "Cover 김영미",
      image: "/images/audio.webp",
      audioOriginal: getAudioUrl("/audio/be-1.mp3"),
      audioTuned: getAudioUrl("/audio/af-1.mp3")
    }
  ];

  // 오디오 경로 디버깅 - 개발자 콘솔에서 확인용
  useEffect(() => {
    console.log("오디오 경로 확인:", {
      original: albums[currentIndex].audioOriginal,
      tuned: albums[currentIndex].audioTuned
    });
    
    // 오디오 파일 존재 여부 확인을 위한 fetch 요청
    const checkAudioFile = async (url, label) => {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        console.log(`${label} 파일 상태:`, response.status, response.ok);
        if (!response.ok) {
          setAudioError(`${label} 파일을 찾을 수 없습니다. (${response.status})`);
        }
      } catch (error) {
        console.error(`${label} 파일 확인 중 오류:`, error);
      }
    };
    
    checkAudioFile(albums[currentIndex].audioOriginal, '오리지널');
    checkAudioFile(albums[currentIndex].audioTuned, '음정보정');
  }, [currentIndex, albums]);

  // 모바일 환경 감지
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // 오디오 요소 초기화 - 컴포넌트 마운트 시 한 번만 실행
  useEffect(() => {
    const createAudioWithSafeguards = (url, label) => {
      const audio = new Audio();
      
      // 속성 설정
      audio.preload = 'auto';
      audio.crossOrigin = 'anonymous';
      
      // Apple 디바이스 모바일 재생 활성화
      audio.playsInline = true;
      
      // 이벤트 리스너
      audio.addEventListener('canplaythrough', () => {
        console.log(`${label} 완전 로드 완료`);
        setIsAudioLoaded(true);
        setAudioError(null);
      });
      
      audio.addEventListener('error', (e) => {
        console.error(`${label} 초기 로드 오류:`, e);
        if (audio.error) {
          console.error(`${label} 오류 상세:`, {
            code: audio.error.code,
            message: audio.error.message
          });
          
          // 오류 코드에 따른 메시지
          let errorMsg = "";
          switch(audio.error.code) {
            case 1: // MEDIA_ERR_ABORTED
              errorMsg = "재생이 중단되었습니다.";
              break;
            case 2: // MEDIA_ERR_NETWORK
              errorMsg = "네트워크 오류로 다운로드에 실패했습니다.";
              break;
            case 3: // MEDIA_ERR_DECODE
              errorMsg = "오디오 디코딩 실패.";
              break;
            case 4: // MEDIA_ERR_SRC_NOT_SUPPORTED
              errorMsg = "오디오 형식이 지원되지 않거나 파일을 찾을 수 없습니다.";
              break;
            default:
              errorMsg = "알 수 없는 오류가 발생했습니다.";
          }
          
          setAudioError(`${label}: ${errorMsg}`);
        } else {
          setAudioError(`${label} 로드 실패: 알 수 없는 오류`);
        }
      });
      
      // 소스 설정 및 로드
      audio.src = url;
      
      // iOS Safari에서의 문제 해결을 위한 특별 처리
      try {
        audio.load();
        // iOS에서 짧은 무음 재생으로 오디오 시스템 활성화
        audio.volume = 0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // 성공적으로 재생됨 - 즉시 일시정지
              audio.pause();
              audio.volume = 1.0; // 볼륨 복원
              console.log(`${label} 초기화 재생 성공`);
            })
            .catch(err => {
              // 자동 재생 차단됨 - 정상적인 동작
              console.log(`${label} 초기화 재생 차단됨 (정상)`, err);
              audio.volume = 1.0; // 볼륨 복원
            });
        }
      } catch (e) {
        console.log(`${label} 초기화 중 오류 - 무시됨`, e);
      }
      
      return audio;
    };
    
    try {
      // 음원 캐시 방지를 위해 타임스탬프 업데이트
      timestamp.current = new Date().getTime();
      
      // 오디오 URL 생성
      const originalUrl = getAudioUrl("/audio/be-1.mp3");
      const tunedUrl = getAudioUrl("/audio/af-1.mp3");
      
      console.log('오디오 URL 생성:', { originalUrl, tunedUrl });
      
      // 오디오 객체 생성 및 초기화
      originalAudioRef.current = createAudioWithSafeguards(originalUrl, '오리지널');
      tunedAudioRef.current = createAudioWithSafeguards(tunedUrl, '음정보정');
      
      console.log('오디오 객체 초기화 완료');
    } catch (error) {
      console.error('오디오 객체 초기화 오류:', error);
      setAudioError(`오디오 초기화 오류: ${error.message}`);
    }
    
    return () => {
      // 컴포넌트 언마운트 시 정리
      const stopAndCleanAudio = (audio) => {
        if (audio) {
          try {
            audio.pause();
            // 이벤트 리스너 제거
            audio.oncanplaythrough = null;
            audio.onerror = null;
            audio.onended = null;
            audio.onplaying = null;
            audio.onpause = null;
            // 소스 정리
            audio.src = '';
            audio.load();
          } catch (e) {
            console.error('오디오 정리 중 오류:', e);
          }
        }
      };
      
      stopAndCleanAudio(originalAudioRef.current);
      stopAndCleanAudio(tunedAudioRef.current);
    };
  }, []);

  // 사용자 인터랙션 이벤트 핸들러
  const handleUserInteraction = () => {
    setInteractionTrigger(true);
    
    // 오디오 컨텍스트 초기화 - 모바일 자동재생 정책 문제 해결
    const initAudio = () => {
      try {
        // 더미 오디오 컨텍스트 생성 및 시작
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // 무음으로 설정
        gainNode.gain.value = 0;
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // 짧게 실행 후 정지
        oscillator.start(0);
        oscillator.stop(0.001);
        
        console.log('오디오 컨텍스트 초기화 완료');
      } catch (error) {
        console.error('오디오 컨텍스트 초기화 오류:', error);
      }
    };
    
    initAudio();
  };
  
  // 페이지 로드 시 사용자 인터랙션 리스너 등록
  useEffect(() => {
    const handleDocumentInteraction = () => {
      handleUserInteraction();
      // 한 번 인터랙션 후 리스너 제거
      document.removeEventListener('click', handleDocumentInteraction);
      document.removeEventListener('touchstart', handleDocumentInteraction);
    };
    
    document.addEventListener('click', handleDocumentInteraction);
    document.addEventListener('touchstart', handleDocumentInteraction);
    
    return () => {
      document.removeEventListener('click', handleDocumentInteraction);
      document.removeEventListener('touchstart', handleDocumentInteraction);
    };
  }, []);

  // 오디오 제어 함수
  const togglePlay = () => {
    // 사용자 인터랙션 처리
    handleUserInteraction();
    
    // 현재 상태 로깅 (디버깅용)
    console.log('토글 재생 시작 - 현재 모드:', audioMode);
    
    // 현재 오디오 객체를 가져옴
    const currentAudio = audioMode === 'original' ? originalAudioRef.current : tunedAudioRef.current;
    
    if (!currentAudio) {
      console.error('오디오 객체를 찾을 수 없습니다.');
      setAudioError('오디오 객체를 찾을 수 없습니다.');
      return;
    }
    
    // 현재 상태 확인
    console.log('현재 상태:', {
      mode: audioMode,
      isPlaying,
      src: currentAudio.src,
      readyState: currentAudio.readyState,
      paused: currentAudio.paused
    });
    
    // 재생 중이면 정지, 정지 중이면 재생
    if (isPlaying) {
      currentAudio.pause();
      setIsPlaying(false);
    } else {
      // 모든 오디오 중지 (현재 선택된 모드의 오디오만 재생하기 위함)
      if (originalAudioRef.current) originalAudioRef.current.pause();
      if (tunedAudioRef.current) tunedAudioRef.current.pause();
      
      // 현재 선택된 모드에 따라 소스 확인 및 재설정
      const audioSrc = audioMode === 'original' 
        ? albums[currentIndex].audioOriginal 
        : albums[currentIndex].audioTuned;
      
      // 소스가 없거나 비어있으면 설정
      if (!currentAudio.src || currentAudio.src === '') {
        console.log(`${audioMode} 오디오 소스 설정:`, audioSrc);
        currentAudio.src = audioSrc;
        currentAudio.load();
      }
      
      // 재생 시도
      try {
        console.log(`${audioMode} 오디오 재생 시도:`, currentAudio.src);
        
        // 사용자 인터랙션 후 재생 시도
        const playPromise = currentAudio.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setAudioError(null);
              console.log('재생 성공:', audioMode);
            })
            .catch(err => {
              console.error('재생 실패:', err.message);
              
              if (err.name === 'NotAllowedError') {
                setAudioError('브라우저에서 자동 재생이 차단되었습니다. 플레이 버튼을 다시 클릭해주세요.');
              } else if (err.name === 'NotSupportedError') {
                setAudioError('오디오 형식이 지원되지 않습니다.');
              } else {
                setAudioError(`오디오 재생에 실패했습니다: ${err.message}`);
              }
              setIsPlaying(false);
            });
        }
      } catch (error) {
        console.error('재생 오류:', error);
        setAudioError(`재생 중 오류가 발생했습니다: ${error.message}`);
        setIsPlaying(false);
      }
    }
  };
  
  // 모드 변경 시 재생 중이면 새 모드로 전환
  useEffect(() => {
    // 모드 변경 로깅 (디버깅용)
    console.log('오디오 모드 변경:', audioMode, '재생 상태:', isPlaying);
    
    // 모드 변경 후 재생 중일 때만 실행
    if (isPlaying) {
      const prevAudio = audioMode === 'original' ? tunedAudioRef.current : originalAudioRef.current;
      const currentAudio = audioMode === 'original' ? originalAudioRef.current : tunedAudioRef.current;
      
      if (!prevAudio || !currentAudio) return;
      
      const currentTime = prevAudio.currentTime;
      prevAudio.pause();
      
      try {
        // 현재 모드에 맞는 오디오 소스 확인
        const audioSrc = audioMode === 'original' 
          ? albums[currentIndex].audioOriginal 
          : albums[currentIndex].audioTuned;
        
        // 소스가 없거나 비어있으면 설정
        if (!currentAudio.src || currentAudio.src === '') {
          console.log(`모드 변경: ${audioMode} 오디오 소스 설정:`, audioSrc);
          currentAudio.src = audioSrc;
          currentAudio.load();
        }
        
        // 이전 오디오와 같은 시점부터 재생
        currentAudio.currentTime = currentTime;
        const promise = currentAudio.play();
        
        if (promise !== undefined) {
          promise
            .then(() => {
              console.log('모드 전환 재생 성공:', audioMode);
            })
            .catch(err => {
              console.error('모드 전환 재생 실패:', err);
              setIsPlaying(false);
            });
        }
      } catch (error) {
        console.error('모드 전환 오류:', error);
        setIsPlaying(false);
      }
    }
  }, [audioMode, isPlaying, albums, currentIndex]);
  
  // 오디오 모드 전환 핸들러 - 토글 버튼용
  const handleToggleMode = (mode) => {
    console.log('토글 모드 변경:', mode, '현재 모드:', audioMode);
    if (mode !== audioMode) {
      setAudioMode(mode);
    }
  };

  // 오디오 파일 로드 및 설정
  useEffect(() => {
    if (!originalAudioRef.current || !tunedAudioRef.current) return;
    
    // 오디오 요소 생성 및 설정
    const setupAudioElement = (audio, src, label) => {
      if (!audio) return;
      
      // 이벤트 리스너 설정
      const onEnded = () => {
        console.log(`${label} 재생 완료`);
        setIsPlaying(false);
      };
      
      const onError = (e) => {
        console.error(`${label} 오류:`, e);
        console.error(`${label} 오류 코드:`, audio.error ? audio.error.code : '알 수 없음');
        setAudioError(`${label} 파일을 로드할 수 없습니다. (오류: ${audio.error ? audio.error.message : '알 수 없음'})`);
      };
      
      const onCanPlay = () => {
        console.log(`${label} 재생 준비 완료`);
        setIsAudioLoaded(true);
        setAudioError(null);
      };
      
      // 기존 리스너 제거
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('canplay', onCanPlay);
      
      // 새 리스너 추가
      audio.addEventListener('ended', onEnded);
      audio.addEventListener('error', onError);
      audio.addEventListener('canplay', onCanPlay);
      
      // 소스 설정
      if (audio.src !== src) {
        console.log(`${label} 소스 설정:`, src);
        audio.src = src;
        audio.load();
      }
      
      return () => {
        audio.removeEventListener('ended', onEnded);
        audio.removeEventListener('error', onError);
        audio.removeEventListener('canplay', onCanPlay);
      };
    };
    
    // 양쪽 오디오 설정
    const originalCleanup = setupAudioElement(
      originalAudioRef.current, 
      albums[currentIndex].audioOriginal, 
      '오리지널 오디오'
    );
    
    const tunedCleanup = setupAudioElement(
      tunedAudioRef.current, 
      albums[currentIndex].audioTuned, 
      '음정보정 오디오'
    );
    
    return () => {
      if (originalCleanup) originalCleanup();
      if (tunedCleanup) tunedCleanup();
    };
  }, [currentIndex, albums]);

  // 녹음실 대여 데이터
  const rentalData = {
    title: "#녹음실 대여",
    description: [
      "1:1 디렉팅 녹음 + 무제한 곡 수",
      "스튜디오 1시간 대여 + 음원 파일 제공"
    ],
    mobileDescription: "1:1 디렉팅 녹음 + 무제한 곡 수, 스튜디오 1시간 대여 + 음원 파일 제공",
    price: "50,000원"
  };

  // 홈페이지 진입 시 해시 제거
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <section className="audio-comparison-section" id="audio-comparison" style={{ 
      background: '#FFFFFF', 
      padding: isMobile ? '60px 20px 80px' : '80px 20px 100px', 
      color: '#333',
      overflow: 'hidden',
      // 완전한 중앙 정렬을 위한 스타일
      display: 'block',
      width: '100%',
      maxWidth: '100vw',
      textAlign: 'center',
      margin: '0 auto',
      WebkitTextSizeAdjust: '100%',
      WebkitTapHighlightColor: 'transparent'
    }}>
      {/* 1x1 투명 GIF - 모바일 자동재생 정책을 우회하기 위한 더미 요소 */}
      <img 
        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" 
        alt="" 
        style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }}
        onClick={handleUserInteraction}
      />

      <TitleWrapper>
        <MainTitle>
          비교 음원 플레이어
        </MainTitle>
        <SubTitle>녹음 전후의 차이를 직접 체험해보세요.</SubTitle>
      </TitleWrapper>

      <PlayerContainer>
        <CardsWrapper>
          <AlbumCard
            onMouseDown={(e) => {
              // 사용자 인터랙션 처리
              handleUserInteraction();
              
              // 좌클릭은 오리지널, 우클릭은 음정보정 모드로 바로 전환
              if (e.button === 0 && audioMode !== 'original') {
                e.preventDefault();
                handleToggleMode('original');
              } else if (e.button === 2 && audioMode !== 'tuned') {
                e.preventDefault();
                handleToggleMode('tuned');
              }
            }}
            onContextMenu={(e) => e.preventDefault()} // 우클릭 메뉴 방지
          >
            <AudioModeIndicator>
              {audioMode === 'original' ? '오리지널' : '음정보정'} 모드
            </AudioModeIndicator>
            <AlbumImage 
              src={albums[currentIndex].image}
              grayscale={audioMode === 'original'}
              onClick={(e) => {
                e.stopPropagation();
                handleUserInteraction();
                togglePlay();
              }}
            >
              <PlayButton 
                isPlaying={isPlaying} 
                onClick={(e) => {
                  e.stopPropagation();
                  handleUserInteraction();
                  togglePlay();
                }} 
              />
            </AlbumImage>
          </AlbumCard>
        </CardsWrapper>
        
        <AlbumInfo>
          <AlbumTitle>{albums[currentIndex].title}</AlbumTitle>
          <AlbumArtist>{albums[currentIndex].artist}</AlbumArtist>
          {audioError && <AudioErrorMessage>{audioError}</AudioErrorMessage>}
        </AlbumInfo>
      </PlayerContainer>

      <ToggleContainer>
        <ToggleSlider position={audioMode === 'original' ? 'left' : 'right'} />
        <ToggleOption 
          active={audioMode === 'original'}
          onClick={() => {
            handleUserInteraction();
            handleToggleMode('original');
          }}
        >
          오리지널
        </ToggleOption>
        <ToggleOption 
          active={audioMode === 'tuned'}
          onClick={() => {
            handleUserInteraction();
            handleToggleMode('tuned');
          }}
        >
          음정보정
        </ToggleOption>
      </ToggleContainer>

      <HelpText>
        {isMobile ? (
          "버튼을 누르거나 드래그해서 실시간으로 비교해보세요."
        ) : (
          <>
            토글 버튼으로 모드를 전환하거나, 마우스를 클릭한 상태에서<br/>
            좌(오리지널)/우(음정보정)로 드래그하여 실시간 비교가 가능합니다.
          </>
        )}
      </HelpText>
      
      {/* 녹음실 대여 상품 카드 */}
      <RentalCardSection>
        <RentalCard>
          <PopularBadge>인기 상품</PopularBadge>
          <RentalInfo>
            <RentalTitle>{rentalData.title}</RentalTitle>
            <RentalDescription>
              {isMobile ? (
                rentalData.description.map((line, i) => (
                  <DescriptionLine key={i}>{line}</DescriptionLine>
                ))
              ) : (
                rentalData.description.map((line, i) => (
                  <DescriptionLine key={i}>{line}</DescriptionLine>
                ))
              )}
            </RentalDescription>
          </RentalInfo>
          <PriceContainer>
            <RentalPrice>
              {rentalData.price}
              <PriceUnit>시간당</PriceUnit>
            </RentalPrice>
          </PriceContainer>
        </RentalCard>
      </RentalCardSection>
      
      {/* 카카오톡 상담 버튼 */}
      <KakaoButton href="http://pf.kakao.com/_NhDxfM/chat" target="_blank" rel="noopener noreferrer">
        <KakaoIcon />
        <KakaoText>예약하기</KakaoText>
      </KakaoButton>
    </section>
  );
} 
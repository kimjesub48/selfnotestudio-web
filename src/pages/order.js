import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { trackEvents } from '../utils/analytics';
import ConsultationForm from '../components/ConsultationForm';

const OrderContainer = styled.div`
  min-height: 100vh;
  background: #111216;
  color: #fff;
  padding: 80px 24px 40px;
`;

const OrderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-family: 'JalnanGothic', sans-serif;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #3491FF;
`;

const YoutubeVideoSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #3491FF;
  font-weight: 600;
`;

const VideoInfo = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
  
  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

const VideoThumbnail = styled.img`
  width: 120px;
  height: 90px;
  border-radius: 8px;
  object-fit: cover;
`;

const VideoDetails = styled.div`
  flex: 1;
`;

const VideoTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 8px;
  color: #fff;
  line-height: 1.4;
`;

const VideoUrl = styled.p`
  font-size: 0.9rem;
  color: #3491FF;
  word-break: break-all;
  background: rgba(52, 145, 255, 0.1);
  padding: 8px 12px;
  border-radius: 6px;
  margin: 8px 0;
`;

const OrderForm = styled.form`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #fff;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3491FF;
    background: rgba(255, 255, 255, 0.15);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3491FF;
    background: rgba(255, 255, 255, 0.15);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #3491FF;
    background: rgba(255, 255, 255, 0.15);
  }
  
  option {
    background: #111216;
    color: #fff;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #3491FF 0%, #2980FF 100%);
  border: none;
  color: white;
  padding: 16px 24px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: 20px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(52, 145, 255, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const BackButton = styled.button`
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 12px 24px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  
  &:hover {
    border-color: #3491FF;
    color: #3491FF;
  }
`;

const PriceInfo = styled.div`
  background: rgba(52, 145, 255, 0.1);
  border: 1px solid rgba(52, 145, 255, 0.3);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

const PriceTitle = styled.h3`
  color: #3491FF;
  margin-bottom: 12px;
  font-size: 1.2rem;
`;

const PriceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PriceItem = styled.li`
  color: #fff;
  margin-bottom: 8px;
  padding-left: 20px;
  position: relative;
  
  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: #3491FF;
    font-weight: bold;
  }
`;



export default function OrderPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    people: '',
    service: 'self',
    message: '',
    youtubeUrl: '',
    videoTitle: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // URL 파라미터에서 YouTube 정보 가져오기
    const { youtube, title } = router.query;
    if (youtube) {
      setFormData(prev => ({
        ...prev,
        youtubeUrl: youtube,
        videoTitle: title || ''
      }));
    }
  }, [router.query]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 상담 신청 데이터 구성
      const consultationData = {
        ...formData,
        timestamp: new Date().toISOString()
      };

      // 실제 상담 신청 API 호출
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consultationData)
      });

      const result = await response.json();

      if (result.success) {
        // 분석 추적
        trackEvents.booking.complete();
        
        // 성공 메시지 표시
        alert('상담 신청이 완료되었습니다! 빠른 시일 내에 연락드리겠습니다.');
        
        // 홈페이지로 이동
        router.push('/');
      } else {
        throw new Error(result.message || '상담 신청에 실패했습니다.');
      }
      
    } catch (error) {
      console.error('상담 신청 오류:', error);
      alert(error.message || '상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : '';
  };

  const videoId = getVideoId(formData.youtubeUrl);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : '';

  return (
    <>
      <Head>
        <title>녹음실 이용 상담 | 셀프노트 스튜디오</title>
        <meta name="description" content="YouTube 링크로 간편하게 녹음실 이용 상담하기" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <OrderContainer>
        <OrderContent>
          <BackButton onClick={() => router.back()}>
            ← 돌아가기
          </BackButton>
          
          <PageTitle>녹음실 이용 상담</PageTitle>

          {formData.youtubeUrl && (
            <YoutubeVideoSection>
              <SectionTitle>선택하신 곡</SectionTitle>
              <VideoInfo>
                {thumbnailUrl && (
                  <VideoThumbnail 
                    src={thumbnailUrl} 
                    alt={formData.videoTitle}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <VideoDetails>
                  <VideoTitle>{formData.videoTitle || '선택된 YouTube 비디오'}</VideoTitle>
                  <VideoUrl>{formData.youtubeUrl}</VideoUrl>
                </VideoDetails>
              </VideoInfo>
            </YoutubeVideoSection>
          )}

          <OrderForm onSubmit={handleSubmit}>
            <SectionTitle>상담 정보</SectionTitle>
            
            <PriceInfo>
              <PriceTitle>🎤 녹음실 서비스</PriceTitle>
              <PriceList>
                <PriceItem>시간당 50,000원 </PriceItem>
                <PriceItem>곡 수 무제한 </PriceItem>
                <PriceItem>1:1 디렉팅 </PriceItem>
                <PriceItem>완성도 높은 결과 </PriceItem>                   
              </PriceList>
            </PriceInfo>

            <FormGroup>
              <Label htmlFor="name">이름 *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="이름을 입력해주세요"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">연락처 *</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="010-0000-0000"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="people">사용 인원 *</Label>
              <Select
                id="people"
                name="people"
                value={formData.people}
                onChange={handleInputChange}
                required
              >
                <option value="">인원 선택</option>
                <option value="1">1명</option>
                <option value="2">2명</option>
                <option value="3">3명</option>
                <option value="4">4명</option>
                <option value="5">5명 이상</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="service">이용 목적 *</Label>
              <Select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                required
              >
                <option value="self">커버곡, 취미</option>
                <option value="guide">이벤트 (축가, 프로포즈) </option>
                <option value="professional">음원 발매용</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">상담 내용</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="녹음하고 싶은 곡, 예약 희망 시간, 특별한 요청사항 등을 자유롭게 적어주세요..."
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '상담 신청 중...' : '상담 신청하기'}
            </SubmitButton>
          </OrderForm>
        </OrderContent>
      </OrderContainer>
    </>
  );
} 
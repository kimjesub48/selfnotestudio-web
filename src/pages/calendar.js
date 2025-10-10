import React from 'react';
import styled from 'styled-components';
import SEOHead from '../components/SEOHead';
import Navigation from '../components/Navigation';
import BookingForm from '../components/07-Calendar-Form';
import Footer from '../components/Footer';
import Link from 'next/link';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #181A1B;
`;

const CalendarContainer = styled.div`
  flex: 1;
  padding: 120px 20px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
  @media (max-width: 900px) {
    padding: 100px 20px 60px;
  }
`;

const Title = styled.h1`
  font-family: 'JalnanGothic', sans-serif;
  font-size: 2.5rem;
  color: #fff;
  font-weight: 600;
  margin-bottom: 18px;
  text-align: center;
  
  @media (max-width: 900px) {
    font-size: 1.7rem;
    margin-bottom: 14px;
  }
`;

const SubText = styled.p`
  font-size: 1.15rem;
  color: #bdbdbd;
  margin-bottom: 40px;
  text-align: center;
  line-height: 1.6;
  
  .mobile-only {
    display: none;
  }
  
  @media (max-width: 900px) {
    font-size: 1rem;
    margin-bottom: 32px;
    padding: 0 1rem;
    
    .mobile-only {
      display: block;
    }
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 900px) {
    padding: 0 1.5rem;
  }
`;

const HomeButtonWrapper = styled.div`
  margin-top: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  
  @media (max-width: 900px) {
    margin-top: 40px;
  }
`;

const HomeButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #3491FF 0%, #00DCDF 100%);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
  
  @media (max-width: 900px) {
    padding: 14px 28px;
    font-size: 1rem;
  }
`;

const CalendarPage = () => {
  return (
    <PageWrapper>
      <SEOHead 
        title="예약 현황 - 셀프노트 녹음실 스튜디오"
        description="셀프노트 스튜디오의 실시간 예약 현황을 확인하고 원하는 시간대에 예약하세요."
        keywords="녹음실 예약, 셀프노트, 예약현황, 실시간 예약"
        url="https://selfnote.co.kr/calendar"
      />
      
      <Navigation />
      
      <CalendarContainer>
        <ContentWrapper>
          <Title>실시간 예약 현황</Title>
          <SubText>
            예약 가능한 시간을 확인하신 후<br className="mobile-only" />
            카카오톡으로 편하게 문의해주세요
          </SubText>
          
          <BookingForm />
          
          <HomeButtonWrapper>
            <Link href="/" passHref legacyBehavior>
              <HomeButton>
                전체 서비스 보러가기
              </HomeButton>
            </Link>
          </HomeButtonWrapper>
        </ContentWrapper>
      </CalendarContainer>
      
      <Footer />
    </PageWrapper>
  );
};

export default CalendarPage;


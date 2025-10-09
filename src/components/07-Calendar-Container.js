import React from 'react';
import styled from 'styled-components';
import BookingForm from './07-Calendar-Form';

const CalendarSectionWrapper = styled.section`
  background: #181A1B;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: #fff;
  
  @media (max-width: 900px) {
    padding: 60px 0;
  }
`;

const Container = styled.div`
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

const Title = styled.h2`
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

const CalendarSection = () => {
  return (
    <CalendarSectionWrapper id="calendar">
      <Container>
        <Title>실시간 예약 현황</Title>
        <SubText>
          예약 가능한 시간을 확인하신 후<br className="mobile-only" />
          카카오톡으로 편하게 문의해주세요
        </SubText>
        
        <BookingForm />
      </Container>
    </CalendarSectionWrapper>
  );
};

export default CalendarSection;


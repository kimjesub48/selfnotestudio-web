import React, { useState } from 'react';
import styled from 'styled-components';

// ============================================
// 네이버 스타일 예약 폼 컴포넌트
// ============================================

const BookingFormWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 900px) {
    padding: 24px;
    border-radius: 12px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 900px) {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }
`;

const SectionDescription = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 24px;
  line-height: 1.5;
  
  @media (max-width: 900px) {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 40px;
  
  @media (max-width: 900px) {
    gap: 4px;
    margin-bottom: 32px;
  }
`;

const DayHeader = styled.div`
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
  padding: 12px 0;
  
  &:first-child {
    color: #ef5350;
  }
  
  &:last-child {
    color: #3491FF;
  }
  
  @media (max-width: 900px) {
    font-size: 0.8rem;
    padding: 8px 0;
  }
`;

const DateCell = styled.button`
  aspect-ratio: 1;
  border: none;
  background: ${props => {
    if (props.$isToday) return '#00B894';
    if (props.$isSelected) return '#3491FF';
    if (props.$isPast) return 'transparent';
    return '#f8f9fa';
  }};
  color: ${props => {
    if (props.$isSelected || props.$isToday) return '#fff';
    if (props.$isPast) return '#ddd';
    if (props.$isSunday) return '#ef5350';
    if (props.$isSaturday) return '#3491FF';
    return '#222';
  }};
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: ${props => props.$isSelected || props.$isToday ? '600' : '400'};
  cursor: ${props => props.$isPast ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  pointer-events: ${props => props.$isPast ? 'none' : 'auto'};
  
  &:hover {
    ${props => !props.$isPast && !props.$isSelected && `
      background: #e3f2fd;
      transform: scale(1.05);
    `}
  }
  
  @media (max-width: 900px) {
    font-size: 0.8rem;
    border-radius: 6px;
    min-height: 36px;
    min-width: 36px;
    padding: 4px;
  }
`;

const TimeSection = styled.div`
  margin-bottom: 40px;
  
  @media (max-width: 900px) {
    margin-bottom: 32px;
  }
`;

const TimeLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
  margin-bottom: 12px;
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
`;

const TimeButton = styled.div`
  padding: 14px;
  border: 2px solid ${props => {
    if (props.$isBooked) return '#ff6b6b';
    return '#e0e0e0';
  }};
  background: ${props => {
    if (props.$isBooked) return '#ffebee';
    return '#fff';
  }};
  color: ${props => {
    if (props.$isBooked) return '#ff6b6b';
    return '#222';
  }};
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: default;
  transition: all 0.2s ease;
  text-align: center;
  
  @media (max-width: 900px) {
    padding: 12px;
    font-size: 0.9rem;
  }
`;

const EmptyDateCell = styled.div`
  aspect-ratio: 1;
`;

const MonthNavigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const MonthDisplay = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #222;
  min-width: 150px;
  text-align: center;
  
  @media (max-width: 900px) {
    font-size: 1.1rem;
    min-width: 120px;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f5f5f5;
    color: #222;
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const InfoBox = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 32px;
  
  @media (max-width: 900px) {
    padding: 16px;
    margin-bottom: 24px;
  }
`;

const InfoText = styled.p`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
  
  strong {
    color: #3491FF;
    font-weight: 600;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, #FEE500 0%, #FFD700 100%);
  color: #3C1E1E;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(254, 229, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: linear-gradient(135deg, #FFD700 0%, #FFC107 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(254, 229, 0, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 900px) {
    padding: 16px;
    font-size: 1rem;
  }
`;

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookedTimeDetails, setBookedTimeDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [authRequired, setAuthRequired] = useState(false);
  
  // 운영 시간 (13:00 ~ 23:00, 1시간 단위)
  const timeSlots = [
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00', '22:00', '23:00'
  ];
  
  // 달력 생성 함수
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const calendar = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // 빈 칸 추가 (이전 달)
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendar.push(null);
    }
    
    // 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      
      calendar.push({
        date: date,
        day: day,
        isSunday: dayOfWeek === 0,
        isSaturday: dayOfWeek === 6,
        isPast: date < today,
        isToday: date.getTime() === today.getTime()
      });
    }
    
    return calendar;
  };
  
  const calendar = generateCalendar();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  
  const handleDateSelect = async (dateInfo) => {
    if (dateInfo && !dateInfo.isPast) {
      setSelectedDate(dateInfo.date);
      
      // 선택된 날짜의 예약 가능 시간 가져오기
      await fetchAvailableTimes(dateInfo.date);
    }
  };

  // 예약 가능한 시간 가져오기
  const fetchAvailableTimes = async (date) => {
    setLoading(true);
    setAuthRequired(false);
    
    try {
      // 한국 시간 기준으로 날짜 문자열 생성
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`; // YYYY-MM-DD 형식
      const response = await fetch(`/api/available-times?date=${dateString}`);
      const data = await response.json();
      
      if (data.success) {
        setAvailableTimes(data.data.availableTimes);
        setBookedTimeDetails(data.data.bookedTimeDetails || {});
      } else {
        if (data.message.includes('인증')) {
          setAuthRequired(true);
        } else {
          console.error('예약 현황 조회 실패:', data.message);
          // 실패 시 모든 시간을 사용 가능으로 표시
          setAvailableTimes(timeSlots);
        }
      }
    } catch (error) {
      console.error('예약 현황 조회 오류:', error);
      // 오류 시 모든 시간을 사용 가능으로 표시
      setAvailableTimes(timeSlots);
    } finally {
      setLoading(false);
    }
  };
  
  const handleKakaoClick = () => {
    if (!selectedDate) {
      alert('달력에서 날짜를 선택해주세요.');
      return;
    }
    
    const formattedDate = `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`;
    
    // 카카오톡 채널로 이동
    window.open('http://pf.kakao.com/_NhDxfM/chat', '_blank');
    
    // 사용자에게 안내
    alert(`카카오톡으로 연결됩니다.\n\n${formattedDate}의 예약 가능한 시간을 확인하셨나요?\n원하시는 시간을 말씀해주시면 예약을 도와드리겠습니다!`);
  };
  
  const currentMonthText = `${currentMonth.getFullYear()}.${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;
  
  // 이전 달 버튼 비활성화 (현재 달보다 이전이면)
  const today = new Date();
  const isPrevMonthDisabled = currentMonth.getFullYear() === today.getFullYear() && 
                               currentMonth.getMonth() === today.getMonth();
  
  return (
    <BookingFormWrapper>
      <MonthNavigation>
        <NavButton onClick={handlePrevMonth} disabled={isPrevMonthDisabled}>
          ‹
        </NavButton>
        <MonthDisplay>{currentMonthText}</MonthDisplay>
        <NavButton onClick={handleNextMonth}>
          ›
        </NavButton>
      </MonthNavigation>
      
      <CalendarGrid>
        {dayNames.map((day, index) => (
          <DayHeader key={index}>{day}</DayHeader>
        ))}
        {calendar.map((dateInfo, index) => {
          if (!dateInfo) {
            return <EmptyDateCell key={`empty-${index}`} />;
          }
          
          const isSelected = selectedDate && 
                           selectedDate.getTime() === dateInfo.date.getTime();
          
          return (
            <DateCell
              key={index}
              $isSelected={isSelected}
              $isToday={dateInfo.isToday}
              $isPast={dateInfo.isPast}
              $isSunday={dateInfo.isSunday}
              $isSaturday={dateInfo.isSaturday}
              onClick={() => handleDateSelect(dateInfo)}
            >
              {dateInfo.day}
            </DateCell>
          );
        })}
      </CalendarGrid>
      
      {selectedDate && (
        <TimeSection>
          <TimeLabel>
            <span style={{ color: '#3491FF', fontSize: '1.2em', fontWeight: '600' }}>
              {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일
            </span>
            의 예약 현황입니다
            {loading && <span style={{ marginLeft: '8px', fontSize: '0.8rem', color: '#666' }}>(로딩 중...)</span>}
            {authRequired && <span style={{ marginLeft: '8px', fontSize: '0.8rem', color: '#ff6b6b' }}>(인증 필요)</span>}
          </TimeLabel>
          
          <TimeGrid>
            {timeSlots.map((time) => {
              const isAvailable = availableTimes.includes(time);
              const isBooked = !isAvailable && availableTimes.length > 0;
              const bookingInfo = bookedTimeDetails[time];
              
              return (
                <TimeButton
                  key={time}
                  $isBooked={isBooked}
                >
                  {time}
                  {isBooked && bookingInfo && bookingInfo.length > 0 && (
                    <span style={{ fontSize: '0.7rem', display: 'block', marginTop: '2px' }}>
                      {bookingInfo[0].name} (예약됨)
                    </span>
                  )}
                  {isBooked && (!bookingInfo || bookingInfo.length === 0) && (
                    <span style={{ fontSize: '0.7rem', display: 'block', marginTop: '2px' }}>예약됨</span>
                  )}
                  {isAvailable && (
                    <span style={{ fontSize: '0.7rem', display: 'block', marginTop: '2px' }}>예약 가능</span>
                  )}
                </TimeButton>
              );
            })}
          </TimeGrid>
        </TimeSection>
      )}
      
      {!selectedDate && (
        <InfoBox>
          <InfoText>
            📅 달력에서 날짜를 선택하면 실시간 예약 현황을 확인할 수 있습니다
          </InfoText>
        </InfoBox>
      )}
      
      {authRequired && (
        <InfoBox>
          <InfoText>
            <strong style={{ color: '#ff6b6b' }}>
              ⚠️ 실시간 예약 현황을 불러올 수 없습니다
            </strong>
            <br />
            관리자에게 문의해주세요
          </InfoText>
        </InfoBox>
      )}
      
      <SubmitButton
        onClick={handleKakaoClick}
        disabled={!selectedDate}
      >
        카카오톡으로 문의하기
      </SubmitButton>
    </BookingFormWrapper>
  );
};

export default BookingForm;

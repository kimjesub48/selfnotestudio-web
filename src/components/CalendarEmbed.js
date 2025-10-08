import React from 'react';
import styled from 'styled-components';

// ============================================
// 구글 캘린더 설정 가이드
// ============================================
// 
// 1. 구글 캘린더(https://calendar.google.com) 접속
// 2. 왼쪽 "내 캘린더" 목록에서 공유할 캘린더 선택
// 3. 캘린더 옆 "..." 클릭 → "설정 및 공유" 선택
// 4. "액세스 권한" 섹션:
//    - "공개 사용 설정" 체크 ✅
//    - "일반 공개로 설정" 선택
// 5. 페이지 하단 "통합" 섹션으로 스크롤
// 6. "캘린더 ID" 복사 (예: xxxxx@group.calendar.google.com)
// 7. 아래 CALENDAR_ID 상수에 붙여넣기
//
// ⚠️ 운영 시 주의사항:
// - 예약 확정 일정: 일정 생성 시 "기본 공개 설정" 또는 "전체 공개" 선택
// - 개인/내부 일정: 일정 생성 시 "비공개" 선택
// - 비공개 일정은 홈페이지에 표시되지 않습니다
//
// ============================================

// 🔧 여기에 구글 캘린더 ID를 입력하세요
const CALENDAR_ID = 'YOUR_CALENDAR_ID@group.calendar.google.com';

// 구글 캘린더 임베드 URL 생성
const getCalendarUrl = () => {
  // 캘린더 ID 인코딩
  const encodedCalendarId = encodeURIComponent(CALENDAR_ID);
  
  // 구글 캘린더 임베드 URL
  // 파라미터 설명:
  // - src: 캘린더 ID
  // - ctz: 타임존 (Asia/Seoul)
  // - showTitle=0: 캘린더 제목 숨기기
  // - showNav=1: 네비게이션 표시
  // - showDate=1: 날짜 표시
  // - showPrint=0: 프린트 버튼 숨기기
  // - showTabs=1: 탭 표시
  // - showCalendars=0: 캘린더 목록 숨기기
  // - mode=MONTH: 월간 뷰
  // - height=600: 높이
  // - wkst=1: 주 시작일 (1=월요일)
  // - bgcolor=%23ffffff: 배경색
  
  return `https://calendar.google.com/calendar/embed?src=${encodedCalendarId}&ctz=Asia%2FSeoul&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&mode=MONTH&height=600&wkst=1&bgcolor=%23ffffff`;
};

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  background: #fff;
  
  @media (max-width: 900px) {
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CalendarIframe = styled.iframe`
  width: 100%;
  height: 600px;
  border: none;
  display: block;
  
  @media (max-width: 900px) {
    height: 500px;
  }
  
  @media (max-width: 480px) {
    height: 450px;
  }
`;

const CalendarEmbed = () => {
  return (
    <CalendarContainer>
      <CalendarIframe
        src={getCalendarUrl()}
        frameBorder="0"
        scrolling="no"
        title="실시간 예약 현황"
      />
    </CalendarContainer>
  );
};

export default CalendarEmbed;


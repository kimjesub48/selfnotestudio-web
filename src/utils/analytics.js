// Google Analytics 유틸리티 함수들

// GA가 로드되었는지 확인
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// 페이지뷰 추적
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// 이벤트 추적
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// 셀프노트 스튜디오 전용 이벤트들
export const trackEvents = {
  // 예약 관련
  booking: {
    start: () => event({
      action: 'booking_start',
      category: 'engagement',
      label: '예약 프로세스 시작'
    }),
    complete: () => event({
      action: 'booking_complete',
      category: 'conversion',
      label: '예약 완료'
    }),
    abandon: () => event({
      action: 'booking_abandon', 
      category: 'engagement',
      label: '예약 중단'
    })
  },
  
  // 문의 관련
  contact: {
    phone: () => event({
      action: 'phone_click',
      category: 'engagement', 
      label: '전화번호 클릭'
    }),
    kakao: () => event({
      action: 'kakao_click',
      category: 'engagement',
      label: '카카오톡 문의'
    }),
    form: () => event({
      action: 'contact_form',
      category: 'engagement',
      label: '문의 폼 작성'
    })
  },
  
  // 콘텐츠 상호작용
  content: {
    videoPlay: (videoName) => event({
      action: 'video_play',
      category: 'engagement',
      label: videoName
    }),
    scrollToSection: (section) => event({
      action: 'scroll_to_section',
      category: 'engagement', 
      label: section
    }),
    downloadPriceList: () => event({
      action: 'download_price_list',
      category: 'engagement',
      label: '가격표 다운로드'
    })
  },
  
  // 소셜 미디어
  social: {
    youtube: () => event({
      action: 'youtube_click',
      category: 'social',
      label: 'YouTube 채널 방문'
    }),
    instagram: () => event({
      action: 'instagram_click', 
      category: 'social',
      label: 'Instagram 방문'
    }),
    blog: () => event({
      action: 'blog_click',
      category: 'social', 
      label: '블로그 방문'
    })
  }
};

// 페이지별 체류시간 측정
export const trackPageTime = (pageName) => {
  const startTime = Date.now();
  
  return () => {
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000); // 초 단위
    
    event({
      action: 'page_time',
      category: 'engagement',
      label: pageName,
      value: duration
    });
  };
}; 
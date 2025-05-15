import { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(19, 21, 28, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  height: 70px;
  display: flex;
  align-items: center;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Logo = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  
  @media (max-width: 900px) {
    margin-left: -10px; /* 모바일에서 로고를 좌측으로 이동 */
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  height: 100%;

  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none !important;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: ${props => props.$marginLeft || '0'};
  margin-right: ${props => props.$marginRight || '0'};
  padding-left: ${props => props.$paddingLeft || '0'};
  padding-right: ${props => props.$paddingRight || '0'};

  &:hover {
    color: #3491FF;
    text-decoration: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 900px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #1C1D1F;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  transition-duration: ${props => props.$isOpen ? '0.5s' : '0s'};
  z-index: 2000;
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  padding: 80px 0 0 0;
`;

const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MobileNavLink = styled.a`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none !important;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 16px 24px;
  width: 100%;
  text-align: left;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  transition: all ${props => props.$isOpen ? '0.3s' : '0s'} ease;
  background: transparent;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
  }
`;

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  transition: all 0.3s ease;
  z-index: 2001;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
`;

const MenuIcon = styled.span`
  margin-right: 12px;
  opacity: 0.7;
  font-size: 20px;
`;

const ReservationButton = styled.a`
  background: linear-gradient(135deg, #3491FF 0%, #1C6FE3 100%);
  color: #fff;
  text-decoration: none !important;
  font-size: 15px;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.3px;
  box-shadow: 0 2px 8px rgba(52, 145, 255, 0.15);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    transition: left 0.5s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #3491FF 0%, #1559BD 100%);
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 145, 255, 0.2);

    &::before {
      left: 100%;
    }
  }
`;

const MobileReservationButton = styled(ReservationButton)`
  width: calc(100% - 48px);
  margin: 24px auto;
  padding: 15px 0;
  font-size: 16px;
  border-radius: 12px;
  background: linear-gradient(135deg, #3491FF 0%, #1C6FE3 100%);
  box-shadow: 0 4px 15px rgba(52, 145, 255, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(52, 145, 255, 0.25);
    background: linear-gradient(135deg, #3491FF 0%, #1559BD 100%);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export default function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 스크롤 위치 조정 함수 추가
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // 모바일 여부 확인
      const isMobile = window.innerWidth <= 900;
      // 네비게이션 바 높이 (모바일: 70px)
      const navHeight = 70;
      // 추가 여백
      const offset = isMobile ? 20 : 0;
      
      // 타겟 요소의 위치 계산
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      // 네비게이션 바 높이와 추가 여백을 고려한 최종 위치
      const offsetPosition = targetPosition - navHeight - offset;
      
      // 스크롤 이동
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // 모바일 메뉴가 열려있으면 닫기
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  if (!mounted) {
    return null; // 클라이언트 사이드 렌더링 전까지는 아무것도 보여주지 않음
  }

  const navItems = [
    { name: '서비스 소개', href: '#why-choose-us', marginLeft: '0px', marginRight: '0px' },
    { name: '음원 비교', href: '#audio-comparison', marginLeft: '0px', marginRight: '0px' },
    { name: '영상 패키지', href: '#video-packages', marginLeft: '0px', marginRight: '0px' },
    { name: '스튜디오 소개', href: '#studio-info', marginLeft: '0px', marginRight: '0px' },
    { name: '고객 후기', href: '#reviews', marginLeft: '0px', marginRight: '0px' },
    { name: '가격 안내', href: '#price-section', marginLeft: '0px', marginRight: '0px' },
  ];

  return (
    <NavContainer style={{ 
      background: isScrolled ? 'rgba(19, 21, 28, 0.95)' : 'transparent',
      borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
    }}>
      <NavContent>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Logo>SELF_NOTE</Logo>
        </Link>
        
        <NavLinks>
          {navItems.map((item, index) => (
            <NavLink 
              key={index} 
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href.substring(1))}
              $marginLeft={item.marginLeft} 
              $marginRight={item.marginRight}
              $paddingLeft={item.paddingLeft}
              $paddingRight={item.paddingRight}
            >
              {item.name}
            </NavLink>
          ))}
          <NavLink 
            href="#reservation"
            onClick={(e) => handleSmoothScroll(e, 'reservation')}
            style={{ textDecoration: 'none' }}
          >
            <ReservationButton>예약하기</ReservationButton>
          </NavLink>
        </NavLinks>

        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          ☰
        </MobileMenuButton>

        <MobileMenu $isOpen={isMobileMenuOpen}>
          <CloseButton onClick={() => setIsMobileMenuOpen(false)}>
            ×
          </CloseButton>
          <MenuContainer>
            {navItems.map((item, index) => (
              <MobileNavLink 
                key={index} 
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href.substring(1))}
                $isOpen={isMobileMenuOpen}
                style={{ textDecoration: 'none', width: '100%' }}
              >
                <MenuIcon>•</MenuIcon>
                {item.name}
              </MobileNavLink>
            ))}
            <MobileReservationButton 
              href="#reservation"
              onClick={(e) => handleSmoothScroll(e, 'reservation')}
              style={{ textDecoration: 'none', width: '100%' }}
            >
              예약하기
            </MobileReservationButton>
          </MenuContainer>
        </MobileMenu>
      </NavContent>
    </NavContainer>
  );
} 
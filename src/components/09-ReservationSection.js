import React, { useState } from 'react';
import styled from 'styled-components';

const ReservationSectionWrapper = styled.section`
  background: #181A1B;
  padding: 100px 0 80px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: #fff;
  @media (max-width: 900px) {
    padding: 60px 0 40px 0;
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
  }
`;

const SubText = styled.p`
  font-size: 1.15rem;
  color: #bdbdbd;
  margin-bottom: 38px;
  text-align: center;
  @media (max-width: 900px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-bottom: 38px;
  width: 100%;
  max-width: 500px;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 20px;
    max-width: 100%;
  }
`;

const CTAButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 36px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  width: 100%;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const PhoneButton = styled(CTAButton)`
  background: linear-gradient(90deg, #00DCDF 0%, #3491FF 100%);
  color: #fff;
  &:hover {
    filter: brightness(1.08);
    transform: translateY(-2px);
  }
`;

const KakaoButton = styled(CTAButton)`
  background: #FEE500;
  color: #222;
  &:hover {
    filter: brightness(0.95);
    transform: translateY(-2px);
  }
`;

const MapBox = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto 0 auto;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.13);
  background: #222;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-4px);
  }
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
  
  @media (max-width: 900px) {
    margin: 0 20px;
    width: calc(100% - 40px);
    border-radius: 12px;
  }
`;

const ImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 90%;
  max-height: 80%;
  
  @media (max-width: 900px) {
    max-width: 95%;
    max-height: 70%;
  }
  
  @media (max-width: 480px) {
    max-width: 98%;
    max-height: 60%;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  
  &:hover {
    color: #00DCDF;
  }
`;

const Hours = styled.p`
  margin-top: 32px;
  font-size: 1.05rem;
  color: #bdbdbd;
  text-align: center;
`;

const Address = styled.p`
  margin-top: 8px;
  font-size: 1.05rem;
  color: #bdbdbd;
  text-align: center;
`;

const NaverButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(90deg, #00DCDF 0%, #3491FF 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
  
  &:hover {
    filter: brightness(1.08);
    transform: translateX(-50%) translateY(-2px);
  }
  
  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 0.9rem;
    bottom: 10px;
  }
`;

export default function ReservationSection() {
  const [showModal, setShowModal] = useState(false);
  
  const handleMapClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };
  
  const handleNaverMapClick = () => {
    window.open('https://map.naver.com/p/search/%EC%85%80%ED%94%84%EB%85%B8%ED%8A%B8%20%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4/place/301511746?placePath=?entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh', '_blank');
  };
  
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <ReservationSectionWrapper id="reservation">
      <Title>지금 바로 예약하세요</Title>
      <SubText>편하게 문의하고 예약할 수 있습니다.</SubText>
      <ButtonGroup>
        <PhoneButton href="tel:010-7580-9997">전화 문의하기</PhoneButton>
        <KakaoButton href="http://pf.kakao.com/_NhDxfM/chat" target="_blank">카카오톡 상담하기</KakaoButton>
      </ButtonGroup>
      <MapBox onClick={handleMapClick}>
        <img src="/map/naver-map.JPG" alt="셀프녹음실 위치" />
      </MapBox>
      <Hours>운영시간: 오후 1시 ~ 오후 11시</Hours>
      <Address>주소: 서울특별시 중랑구 사가정로 49길 15</Address>
      
      {showModal && (
        <ImageModal onClick={closeModal}>
          <CloseButton onClick={closeModal}>×</CloseButton>
          <ModalImageContainer>
            <ModalImage 
              src="/map/naver-map.JPG" 
              alt="셀프녹음실 위치 확대" 
            />
            <NaverButton onClick={(e) => {
              e.stopPropagation();
              handleNaverMapClick();
            }}>네이버 지도에서 보기</NaverButton>
          </ModalImageContainer>
        </ImageModal>
      )}
    </ReservationSectionWrapper>
  );
} 
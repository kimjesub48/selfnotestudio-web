import React from 'react';
import styled from 'styled-components';
import { FaYoutube, FaInstagram } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';

const LogoImg = styled.img`
  width: 120px;
  height: auto;
  opacity: 0.85;
  z-index: 2;
  margin-left: auto;
  @media (max-width: 900px) {
    width: 88px;
    margin-left: 16px;
  }
`;

const FooterWrapper = styled.footer`
  width: 100%;
  background: #232323;
  color: #bdbdbd;
  padding: 48px 0 28px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1rem;
  position: relative;
`;

const FooterInner = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MenuLinks = styled.div`
  display: flex;
  gap: 28px;
  margin-bottom: 22px;
  font-size: 1.05rem;
  color: #bdbdbd;
  a {
    color: #bdbdbd;
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
      color: #fff;
    }
  }
`;

const BizInfo = styled.div`
  text-align: left;
  font-size: 0.98rem;
  margin-bottom: 18px;
  line-height: 1.7;
  
  @media (max-width: 768px) {
    .email {
      display: block;
      margin-top: 2px;
    }
  }
`;

const CopyrightRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 28px;
  font-size: 0.97rem;
  color: #bdbdbd;
`;

const Copyright = styled.div`
  color: #888;
`;

const SNSRow = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 10px;
  position: relative;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const SNSCircle = styled.a`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #2d2d2d;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdbdbd;
  font-size: 1.35rem;
  transition: background 0.2s, color 0.2s;
  text-decoration: none;
  &:hover {
    background: #fff;
    color: #232323;
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterInner>
        <BizInfo>
          셀프노트 스튜디오 / 사업자등록번호: 894-05-00109<br />
          주소: 서울특별시 중랑구 사가정로49길 15<br />
          연락처: 010-7580-9997 / <span className="email">이메일: selfnote10@naver.com</span>
        </BizInfo>
        <CopyrightRow>
          <Copyright>© 2025 Selfnote Studio. All Rights Reserved.</Copyright>
        </CopyrightRow>
        <SNSRow>
          <SNSCircle href="https://www.youtube.com/@selfnote" target="_blank" rel="noopener noreferrer"><FaYoutube /></SNSCircle>
          <SNSCircle href="https://www.instagram.com/selfnote_studio/" target="_blank" rel="noopener noreferrer"><FaInstagram /></SNSCircle>
          <SNSCircle href="https://blog.naver.com/selfnote10" target="_blank" rel="noopener noreferrer"><SiNaver /></SNSCircle>
          <LogoImg src="/logo/selfnotelogo.webp" alt="셀프노트 로고" />
        </SNSRow>
      </FooterInner>
    </FooterWrapper>
  );
} 
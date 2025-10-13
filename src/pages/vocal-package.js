import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #fff;
  
  * {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  
  input, textarea {
    user-select: text;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
  }
`;

const HeroSection = styled.section`
  background: #1a1a2e;
  padding: 120px 24px 60px;
  text-align: center;
  color: white;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  }
  
  @media (max-width: 768px) {
    padding: 100px 20px 40px;
  }
`;

const PeriodBadge = styled.div`
  display: inline-block;
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 20px;
  letter-spacing: 1px;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.3;
  letter-spacing: -0.5px;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.8;
  margin-bottom: 8px;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const PriceTag = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-top: 32px;
  letter-spacing: -1px;
  
  span {
    font-size: 1.1rem;
    opacity: 0.6;
    text-decoration: line-through;
    margin-right: 16px;
    font-weight: 400;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ProductSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  
  @media (max-width: 768px) {
    gap: 40px;
    padding: 40px 20px;
    max-width: 800px;
  }
`;

const GalleryContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const GalleryTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 8px;
  text-align: center;
`;

const GallerySubtitle = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 24px;
  text-align: center;
`;

const MainImageContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  display: block;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 640px) {
    border-radius: 8px;
  }
`;

const ImageNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%) ${props => props.$direction === 'prev' ? 'rotate(180deg)' : 'rotate(0deg)'};
  ${props => props.$direction === 'prev' ? 'left: 15px;' : 'right: 15px;'}
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  user-select: none;
  padding: 0;
  
  &::before {
    content: '';
    width: 14px;
    height: 14px;
    border-right: 3px solid white;
    border-top: 3px solid white;
    transform: rotate(45deg);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }
  
  &:hover {
    transform: translateY(-50%) ${props => props.$direction === 'prev' ? 'rotate(180deg) scale(1.2)' : 'rotate(0deg) scale(1.2)'};
  }
  
  &:hover::before {
    filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.5));
  }
  
  &:active {
    transform: translateY(-50%) ${props => props.$direction === 'prev' ? 'rotate(180deg) scale(1)' : 'rotate(0deg) scale(1)'};
  }
  
  @media (max-width: 640px) {
    width: 36px;
    height: 36px;
    ${props => props.$direction === 'prev' ? 'left: 10px;' : 'right: 10px;'}
    
    &::before {
      width: 12px;
      height: 12px;
      border-width: 2.5px;
    }
  }
`;

const ImageIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

const IndicatorDot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$active ? '#2c3e50' : '#d1d5db'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  
  &:hover {
    background: ${props => props.$active ? '#2c3e50' : '#9ca3af'};
    transform: scale(1.2);
  }
`;

// Why 섹션  
const WhySection = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 40px 32px;
  margin: 24px 0;
  
  @media (max-width: 768px) {
    padding: 32px 20px;
  }
`;

const WhyTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #222;
  text-align: center;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const WhySubtitle = styled.p`
  font-size: 1.05rem;
  color: #666;
  text-align: center;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 24px;
  }
`;

const WhyCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  
  @media (min-width: 769px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const WhyCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
`;

const WhyCardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  
  @media (max-width: 768px) {
    height: 180px;
  }
`;

const WhyCardContent = styled.div`
  padding: 24px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const WhyCardTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 16px;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const WhyCardText = styled.p`
  font-size: 0.95rem;
  color: #555;
  line-height: 1.7;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const WhyCardDivider = styled.div`
  height: 1px;
  background: #e9ecef;
  margin: 16px 0;
`;

const WhyCardList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    padding: 8px 0;
    font-size: 0.9rem;
    color: #666;
    display: flex;
    align-items: flex-start;
    gap: 8px;
    line-height: 1.6;
    
    &:before {
      content: '✓';
      color: #1db954;
      font-weight: 700;
      font-size: 1rem;
      flex-shrink: 0;
      margin-top: 2px;
    }
  }
`;

const ReviewCard = styled.div`
  max-width: 700px;
  margin: 24px auto;
  padding: 24px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  
  @media (max-width: 640px) {
    padding: 20px;
    margin: 20px auto;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

const AuthorName = styled.span`
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.95rem;
`;

const ReviewDate = styled.span`
  font-size: 0.85rem;
  color: #999;
`;

const SongName = styled.div`
  color: #333;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 12px;
`;

const ReviewText = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: #555;
  margin: 0;
  word-break: keep-all;
  
  @media (max-width: 640px) {
    font-size: 0.9rem;
  }
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  margin-top: 16px;
  
  @media (max-width: 968px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
`;

const ThumbnailItem = styled.div`
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  border: 3px solid ${props => props.$selected ? '#1db954' : 'transparent'};
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  ${props => props.$selected && `
    &:after {
      content: '✓';
      position: absolute;
      top: 4px;
      right: 4px;
      width: 24px;
      height: 24px;
      background: #1db954;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      font-weight: bold;
    }
  `}
`;

// 플레이리스트
const PlaylistSection = styled.div`
  margin-top: 48px;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 32px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

const PlaylistTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
`;

const PlaylistSubtitle = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 24px;
`;

const PlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PlaylistItem = styled.div`
  background: white;
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 2px solid ${props => props.$isPlaying ? '#1db954' : '#e9ecef'};
  transition: all 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
    border-color: #1db954;
  }
  
  @media (max-width: 768px) {
    padding: 10px 12px;
    gap: 10px;
  }
`;

const PlaylistItemTop = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const PlaylistNumber = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: #999;
  
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    font-size: 0.85rem;
  }
`;

const PlaylistAlbumArt = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  object-fit: cover;
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const PlaylistInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PlaylistTrackTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: #2c3e50;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const PlaylistArtist = styled.div`
  font-size: 0.85rem;
  color: #999;
`;

const PlaylistDuration = styled.div`
  font-size: 0.85rem;
  color: #999;
  min-width: 45px;
  text-align: right;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const PlayIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.$isPlaying ? '#1db954' : 'white'};
  color: ${props => props.$isPlaying ? 'white' : '#2c3e50'};
  border: 2px solid ${props => props.$isPlaying ? '#1db954' : '#e9ecef'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  ${PlaylistItem}:hover & {
    background: #1db954;
    color: white;
    border-color: #1db954;
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 0.85rem;
  }
`;

const InlineProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #e9ecef;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  
  &:hover {
    height: 6px;
    transition: height 0.2s ease;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.$progress || 0}%;
    background: #1db954;
    transition: width 0.1s linear;
  }
  
  &:hover::before {
    background: #1ed760;
  }
`;

const ShowMoreButton = styled.button`
  width: 100%;
  padding: 16px;
  margin-top: 16px;
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background: #f8f9fa;
    border-color: #1db954;
    color: #1db954;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const CarouselSection = styled.div`
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid #e9ecef;
`;

const CarouselTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:before,
  &:after {
    content: '';
    width: 40px;
    height: 1px;
    background: #dee2e6;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  padding: 0 60px;
  
  @media (max-width: 768px) {
    padding: 0 50px;
  }
`;

const CarouselTrack = styled.div`
  overflow: hidden;
`;

const CarouselSlide = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  
  @media (max-width: 968px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CarouselItem = styled.div`
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  ${props => props.$direction === 'prev' ? 'left: 10px;' : 'right: 10px;'}
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #495057;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover:not(:disabled) {
    background: #2c3e50;
    color: white;
    transform: translateY(-50%) scale(1.1);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
`;

const CarouselIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;

const Indicator = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$active ? '#2c3e50' : '#dee2e6'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  
  &:hover {
    background: ${props => props.$active ? '#2c3e50' : '#adb5bd'};
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: ${props => props.$visible ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  
  img {
    max-width: 90%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 8px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f0f0f0;
    transform: rotate(90deg);
  }
`;

const ModalNav = styled.button`
  position: absolute;
  top: 50%;
  ${props => props.$direction === 'prev' ? 'left: 20px;' : 'right: 20px;'}
  transform: translateY(-50%);
  background: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f0f0f0;
    transform: translateY(-50%) scale(1.1);
  }
  
  @media (max-width: 640px) {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const BadgeRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

const Badge = styled.span`
  padding: 6px 14px;
  background: ${props => props.$color || '#f8f9fa'};
  color: ${props => props.$textColor || '#495057'};
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  border: 1px solid ${props => props.$borderColor || '#e9ecef'};
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  .stars {
    color: #ffc107;
    font-size: 1.2rem;
    letter-spacing: 2px;
  }
  
  .rating-number {
    color: #222;
    font-weight: 700;
    font-size: 0.95rem;
  }
  
  .review-count {
    color: #999;
    font-size: 0.9rem;
  }
  
  .divider {
    color: #ddd;
    margin: 0 4px;
  }
`;

const ProductTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #222;
  line-height: 1.4;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  margin: 20px auto;
  border-radius: 12px;
  overflow: hidden;
  
  video {
    width: 100%;
    max-width: 800px;
    height: auto;
    display: block;
    margin: 0 auto;
    border-radius: 12px;
    
    @media (max-width: 768px) {
      max-width: 300px;
    }
  }
`;

const PriceSection = styled.div`
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px 0;
  margin: 16px auto;
  max-width: 800px;
  width: 100%;
`;

const DiscountInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  
  .discount-rate {
    font-size: 2rem;
    font-weight: 900;
    color: #e53e3e;
  }
  
  .original-price {
    font-size: 1.1rem;
    color: #999;
    text-decoration: line-through;
  }
`;

const FinalPrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
  
  .price {
    font-size: 2.8rem;
    font-weight: 900;
    color: #222;
  }
  
  .unit {
    font-size: 1.2rem;
    font-weight: 700;
    color: #222;
  }
  
  @media (max-width: 768px) {
    .price {
      font-size: 2.2rem;
    }
    .unit {
      font-size: 1rem;
    }
  }
`;

const BenefitSection = styled.div`
  background: #f9fafb;
  border-radius: 8px;
  padding: 20px;
  margin: 16px auto;
  max-width: 800px;
  width: 100%;
`;

const BenefitTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const BenefitList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    padding: 8px 0;
    font-size: 0.95rem;
    color: #444;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &:before {
      content: '•';
      color: #667eea;
      font-size: 1.2rem;
      font-weight: 900;
    }
  }
`;

const StudioInfo = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0;
  
  .studio-name {
    font-size: 1rem;
    font-weight: 700;
    color: #222;
    margin-bottom: 4px;
  }
  
  .studio-followers {
    font-size: 0.85rem;
    color: #666;
  }
`;

const FollowButton = styled.button`
  padding: 8px 20px;
  background: white;
  border: 1px solid #667eea;
  border-radius: 6px;
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #667eea;
    color: white;
  }
`;

const ApplyButton = styled.button`
  width: 100%;
  padding: 18px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  
  &:hover {
    background: #34495e;
    box-shadow: 0 4px 12px rgba(44, 62, 80, 0.3);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const TabContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const TabMenu = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 40px;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabButton = styled.button`
  padding: 16px 32px;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.$active ? '#2c3e50' : '#999'};
  border-bottom: 2px solid ${props => props.$active ? '#2c3e50' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  letter-spacing: 0.3px;
  
  &:hover {
    color: #2c3e50;
  }
  
  @media (max-width: 768px) {
    padding: 14px 24px;
    font-size: 0.9rem;
  }
`;

const TabContent = styled.div`
  padding-bottom: 60px;
`;

const DetailSection = styled.div`
  max-width: 800px;
  margin: 0 auto;
  
  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #222;
    margin-bottom: 24px;
  }
  
  p {
    font-size: 1.05rem;
    line-height: 1.8;
    color: #555;
    margin-bottom: 24px;
  }
`;

const PackageCard = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  
  h4 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #667eea;
    margin-bottom: 16px;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      padding: 8px 0;
      font-size: 1rem;
      color: #444;
      display: flex;
      align-items: center;
      gap: 12px;
      
      &:before {
        content: '•';
        color: #667eea;
        font-size: 1.5rem;
      }
    }
  }
`;

const FormSection = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  
  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 32px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  
  label {
    display: block;
    font-size: 0.95rem;
    font-weight: 600;
    color: #444;
    margin-bottom: 8px;
    
    span {
      color: #e53e3e;
      margin-left: 4px;
    }
  }
  
  input, textarea {
    width: 100%;
    padding: 14px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const AccountInfo = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 24px;
  margin: 32px 0;
  
  h4 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #222;
    margin-bottom: 16px;
  }
  
  p {
    font-size: 1rem;
    color: #444;
    margin: 8px 0;
    
    strong {
      color: #667eea;
      font-weight: 700;
    }
  }
`;

const CheckboxGroup = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 24px 0;
  cursor: pointer;
  
  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  
  span {
    font-size: 0.95rem;
    color: #444;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 18px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  
  &:hover:not(:disabled) {
    background: #34495e;
    box-shadow: 0 4px 12px rgba(44, 62, 80, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

const FixedBottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.1);
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100000;
  transform: translateY(${props => props.$visible ? '0' : '100%'});
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 12px 20px;
  }
`;

const FixedButton = styled.button`
  padding: 16px 48px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  
  &:hover {
    background: #34495e;
    box-shadow: 0 4px 12px rgba(44, 62, 80, 0.3);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 14px;
  }
`;

export default function VocalPackage() {
  const [activeTab, setActiveTab] = useState('details');
  const [showFixedBar, setShowFixedBar] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    song: '',
    message: '',
    agreed: false
  });
  
  const [showAllTracks, setShowAllTracks] = useState(false);
  
  // 오디오 플레이어 상태
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  
  // 이미지 번호 매핑 (vocal-07 제외)
  const imageNumbers = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12];
  
  // 랜덤 성씨 배열
  const randomLastNames = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한'];
  
  // 곡명 배열 (순서대로)
  const songTitles = [
    '보라빛 향기',
    'xoxz',
    '상사화',
    'baby',
    '홍연',
    '어른',
    '잠수',
    '진심이 담긴 노래',
    '어제처럼',
    'Young and Beautiful',
    '시작의 아이'
  ];
  
  // 수강생 후기 배열
  const studentReviews = [
    '처음 녹음이었는데 너무 친절하게 알려주셔서 편하게 녹음할 수 있었어요! 완성된 곡 들으니 제가 이렇게 잘 부를 수 있다는게 신기하더라구요 ㅎㅎ 인스타에 우대체 한 곡 계속 올리고 싶던 곡이었는데 이렇게 구매할 수 있어서 좋았습니다. 다음에도 꼭 다시 이용하고자 합니다~!',
    '보컬 레슨도 받고 녹음도 하니까 실력이 정말 늘어요. 선생님이 제 목소리의 장점을 찾아서 살려주셔서 감사합니다! 비싸고 고퀄리티 않을 거 같아서 가격에 구매했는데 너무 좋아요 배송도 하루만에 배송이라구요 근데 배송이 너무 좋았어요~!',
    '친구 생일 선물로 녹음했는데 대박 좋아했어요! 스튜디오 분위기도 좋고 결과물도 프로페셔널해서 만족스러워요. 다행히 좋다고 하고 진짜 디테일하게 가르쳐 줘서 구매할 수 있다라고요.',
    '녹음실 처음이라 떨렸는데 엔지니어님이 디테일하게 디렉팅 해주셔서 금방 적응했어요. 다음에도 또 오고 싶어요! 인스타나 우대체에서 2개정도 올릴 수 있어서 가격대도 좋고 너무 만족합니다~!',
    '이 프로그램 진짜 강추합니다. 처음엔 자신 없었는데 지금은 노래방 가는게 너무 즐거워요 ㅋㅋ 다양한 상품으로 또 좋아요 진행에도 빠르게 작업해서 주셔서 구매가 가능합니다.',
    '평소에 좋아하던 곡인데 제 목소리로 들으니까 감동이었어요. 믹싱도 너무 깔끔하게 해주셔서 감사합니다! 배송이 하루만에 왔습니다 저렴한 가격에 구매했는데 너무 좋아요 다음에도 꼭 다시 이용하고자 합니다.',
    '보컬 트레이닝 받으면서 녹음 경험도 쌓을 수 있어서 좋았어요. 체계적인 커리큘럼 덕분에 실력이 많이 늘었습니다. 가격대비 훌륭하고 퀄리티도 좋아서 만족스럽습니다~!',
    '제 감성을 그대로 살려서 녹음해주셨어요. 진심이 담긴 곡이라 더 의미있었고, 결과물도 너무 만족스럽습니다! 다음에 또 구매하고 싶어요 가격도 좋고 퀄리티도 최고입니다.',
    '노래를 잘 부르고 싶다는 소망이 있었는데 셀프노트에서 이뤄졌어요. 선생님들 너무 감사합니다! 처음 녹음이었는데 너무 친절하게 알려주셔서 편하게 녹음할 수 있었어요.',
    '영어 곡 녹음도 꼼꼼하게 봐주셔서 좋았어요. 발음 교정도 해주시고 감정 표현하는 법도 배워서 유익했습니다. 인스타에 제가 부르고 싶었던 곡 올릴 수 있어서 너무 좋아요~!',
    '처음 시작할 때랑 지금 비교하면 정말 달라졌어요. 자신감도 생기고 노래하는게 이렇게 즐거운 줄 몰랐어요! 다음에도 또 다른 곡으로 구매하고 싶습니다. 가격대비 훌륭해요.'
  ];
  
  // 후기 날짜 배열
  const reviewDates = [
    '2025.10.15',
    '2025.10.08',
    '2025.09.28',
    '2025.09.20',
    '2025.09.15',
    '2025.08.30',
    '2025.08.22',
    '2025.08.15',
    '2025.07.28',
    '2025.07.20',
    '2025.07.12'
  ];
  
  // 수강생 이름 생성 (성 + **)
  const getStudentName = (index) => {
    return `${randomLastNames[index % randomLastNames.length]}**`;
  };

  // 수강생 이미지 배열 (vocal-07 제외)
  const studentImages = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12].map(
    num => `/vocal-program/vocal-${String(num).padStart(2, '0')}.webp`
  );
  
  // 오디오 파일 배열
  const audioFiles = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12].map(
    num => `/vocal-program/audio/vocal-${String(num).padStart(2, '0')}.mp3`
  );
  
  // Why 섹션 카드 데이터
  const whyCards = [
    {
      id: 1,
      title: '나혼자 연습하면서 답답하시나요?',
      description: '내 목소리, 제대로 들어본 적 있나요? 녹음실에서 들으면 충격받습니다.',
      video: '/vocal-program/video/video01.mp4?v=' + Date.now(),
      isVideo: true,
      points: [
        '프로 장비로 내 목소리를 객관적으로 모니터링',
        '숨소리, 발음, 호흡까지 세밀하게 체크',
        '혼자서는 절대 알 수 없는 나만의 음색 발견'
      ]
    },
    {
      id: 2,
      title: '왜 프로는 다를까요?',
      description: '프로와 아마추어의 차이? 자기 목소리를 제대로 아는 것입니다.',
      image: '/studio/studio05.webp',
      points: [
        '전문 엔지니어의 1:1 실시간 피드백',
        '디테일을 살리는 보컬 테크닉 습득',
        '귀가 열리면 스스로 교정하는 능력 생김'
      ]
    },
    {
      id: 3,
      title: '노래방 실력 = 진짜 실력?',
      description: '진짜 긴장감 속에서 불러봐야 실력이 보입니다. 그게 성장입니다.',
      image: '/studio/studio08.webp',
      points: [
        '실제 녹음 환경에서 경험하는 진짜 긴장감',
        '프레셔 속에서 발견하는 내 한계와 가능성',
        '이 경험이 당신을 프로처럼 만들어줍니다'
      ]
    }
  ];
  
  useEffect(() => {
    let timeoutId = null;
    
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        setShowFixedBar(window.scrollY > 600);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      alert('이름과 연락처는 필수 항목입니다.');
      return;
    }
    
    if (!formData.agreed) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    
    alert('신청이 완료되었습니다! 입금 확인 후 연락드리겠습니다.');
    console.log('Form submitted:', formData);
    
    // TODO: Firebase 저장 또는 이메일 발송
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 이미지 선택
  const selectImage = (index) => {
    setSelectedImageIndex(index);
  };
  
  // 이전 이미지
  const previousImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? studentImages.length - 1 : prev - 1
    );
  };
  
  // 다음 이미지
  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      (prev + 1) % studentImages.length
    );
  };
  
  // 터치 스와이프 기능
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  const minSwipeDistance = 50; // 최소 스와이프 거리
  
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      previousImage();
    }
  };
  
  // 음악 재생
  const playTrack = (index) => {
    if (currentTrack === index && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      setCurrentTrack(index);
      setCurrentTime(0);
      setIsPlaying(false);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error('재생 오류:', error);
              setIsPlaying(false);
            });
        }
      }, 50);
    }
  };
  
  // 재생/일시정지
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error('재생 오류:', error);
        });
    }
  };
  
  // 이전 곡
  const previousTrack = () => {
    if (currentTrack === null) return;
    const newIndex = currentTrack === 0 ? studentImages.length - 1 : currentTrack - 1;
    setCurrentTrack(newIndex);
    setCurrentTime(0);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error('재생 오류:', error);
          });
      }
    }, 50);
  };
  
  // 다음 곡
  const nextTrack = () => {
    if (currentTrack === null) return;
    const newIndex = (currentTrack + 1) % studentImages.length;
    setCurrentTrack(newIndex);
    setCurrentTime(0);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error('재생 오류:', error);
          });
      }
    }, 50);
  };
  
  // 시간 업데이트
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  // 메타데이터 로드
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  // 진행바 변경
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };
  
  // 시간 포맷
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Head>
        <title>Professional 보컬 트레이닝 | 셀프노트 스튜디오</title>
        <meta name="description" content="1:1 집중과정 · 소규모 정예 클래스 · 실전 녹음 경험을 통한 체계적 실력 성장 프로그램 · 2025년 수강생 모집" />
      </Head>

      <Navigation />

      <PageContainer>
        {/* Hero Section */}
        <HeroSection>
          <PeriodBadge>2025년 수강생 모집</PeriodBadge>
          <HeroTitle>
            Professional<br/>
            보컬 트레이닝
          </HeroTitle>
          <HeroSubtitle>1:1 집중과정 · 소규모 정예 클래스</HeroSubtitle>
          <HeroSubtitle>실전 녹음 경험을 통한 '노래 실력' 성장 프로그램</HeroSubtitle>
          <PriceTag>
            <span>일반가 300,000원</span>
            200,000원
          </PriceTag>
        </HeroSection>

        {/* Product Section */}
        <ProductSection>
          <InfoBox>
            {/* 배지 */}
            <BadgeRow>
              <Badge $color="#f8f9fa" $textColor="#495057" $borderColor="#dee2e6">수강생 모집</Badge>
              <Badge $color="#f8f9fa" $textColor="#495057" $borderColor="#dee2e6">정원 10명</Badge>
              <Badge $color="#f8f9fa" $textColor="#495057" $borderColor="#dee2e6">1:1 집중과정</Badge>
            </BadgeRow>

            {/* 별점 */}
            <RatingSection>
              <div className="stars">★★★★★</div>
              <span className="rating-number">5.0</span>
              <span className="divider">|</span>
              <span className="review-count">수강생 후기 12개</span>
            </RatingSection>

            {/* 프로그램명 */}
            <ProductTitle>
              프로페셔널 보컬 트레이닝
            </ProductTitle>

            {/* 소개 영상 */}
            <VideoContainer>
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              >
                <source src="/vocal-program/video/hom2.mp4" type="video/mp4" media="(min-width: 769px)" />
                <source src="/vocal-program/video/hom.mp4" type="video/mp4" media="(max-width: 768px)" />
                <source src="/vocal-program/video/hom2.mp4" type="video/mp4" />
                브라우저가 비디오를 지원하지 않습니다.
              </video>
            </VideoContainer>

            {/* 가격 섹션 */}
            <PriceSection>
              <DiscountInfo>
                <span className="discount-rate">얼리버드 33%</span>
                <span className="original-price">일반가 300,000원</span>
              </DiscountInfo>
              <FinalPrice>
                <span className="price">200,000</span>
                <span className="unit">원</span>
              </FinalPrice>
            </PriceSection>
          </InfoBox>

          <GalleryContainer>
            <GalleryTitle>수강생 후기</GalleryTitle>
            <GallerySubtitle>프로그램을 수료한 수강생들의 후기와 결과물입니다</GallerySubtitle>
            
            {/* 메인 큰 이미지 */}
            <MainImageContainer>
              <ImageWrapper
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <ImageNavButton 
                  $direction="prev" 
                  onClick={previousImage}
                  aria-label="이전 이미지"
                />
                
                <MainImage 
                  src={studentImages[selectedImageIndex]} 
                  alt={`수강생 결과물 ${imageNumbers[selectedImageIndex]}`}
                />
                
                <ImageNavButton 
                  $direction="next" 
                  onClick={nextImage}
                  aria-label="다음 이미지"
                />
              </ImageWrapper>
              
              {/* 이미지 인디케이터 */}
              <ImageIndicators>
                {studentImages.map((_, index) => (
                  <IndicatorDot
                    key={index}
                    $active={selectedImageIndex === index}
                    onClick={() => selectImage(index)}
                    aria-label={`${index + 1}번째 이미지로 이동`}
                  />
                ))}
              </ImageIndicators>
              
              {/* 수강생 후기 */}
              <ReviewCard>
                <ReviewHeader>
                  <AuthorName>{getStudentName(selectedImageIndex)}</AuthorName>
                  <ReviewDate>{reviewDates[selectedImageIndex]}</ReviewDate>
                </ReviewHeader>
                <SongName>{songTitles[selectedImageIndex]}</SongName>
                <ReviewText>
                  {studentReviews[selectedImageIndex]}
                </ReviewText>
              </ReviewCard>
            </MainImageContainer>

            {/* 썸네일 그리드 */}
            <ThumbnailGrid>
              {studentImages.map((image, index) => (
                <ThumbnailItem
                  key={index}
                  onClick={() => selectImage(index)}
                  $selected={selectedImageIndex === index}
                >
                  <img src={image} alt={`썸네일 ${index + 1}`} />
                </ThumbnailItem>
              ))}
            </ThumbnailGrid>
          </GalleryContainer>

          {/* 플레이리스트 섹션 */}
          <PlaylistSection>
            <PlaylistTitle>녹음 결과물 듣기</PlaylistTitle>
            <PlaylistSubtitle>재생 버튼을 클릭하면 바로 들을 수 있습니다</PlaylistSubtitle>
            
            <PlaylistContainer>
              {studentImages
                .slice(0, showAllTracks ? studentImages.length : 4)
                .map((image, index) => (
                  <PlaylistItem 
                    key={index}
                    $isPlaying={currentTrack === index && isPlaying}
                  >
                    <PlaylistItemTop onClick={() => playTrack(index)}>
                      <PlaylistNumber>
                        {currentTrack === index && isPlaying ? '♪' : String(index + 1).padStart(2, '0')}
                      </PlaylistNumber>
                      <PlaylistAlbumArt src={image} alt={`트랙 ${index + 1}`} />
                      <PlaylistInfo>
                        <PlaylistTrackTitle>
                          {getStudentName(index)}
                        </PlaylistTrackTitle>
                        <PlaylistArtist>{songTitles[index]}</PlaylistArtist>
                      </PlaylistInfo>
                      <PlaylistDuration>3:45</PlaylistDuration>
                      <PlayIcon $isPlaying={currentTrack === index && isPlaying}>
                        {currentTrack === index && isPlaying ? '⏸' : '▶'}
                      </PlayIcon>
                    </PlaylistItemTop>
                    
                    {/* 재생 중일 때 프로그레스바 표시 */}
                    {currentTrack === index && (
                      <InlineProgressBar 
                        $progress={(currentTime / duration) * 100 || 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (audioRef.current && duration) {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            const percentage = clickX / rect.width;
                            const newTime = duration * percentage;
                            audioRef.current.currentTime = newTime;
                            setCurrentTime(newTime);
                          }
                        }}
                      />
                    )}
                  </PlaylistItem>
                ))}
            </PlaylistContainer>
            
            {!showAllTracks && studentImages.length > 4 && (
              <ShowMoreButton onClick={() => setShowAllTracks(true)}>
                <span>더 보기 ({studentImages.length - 4}곡 더)</span>
                <span>▼</span>
              </ShowMoreButton>
            )}
            
            {showAllTracks && (
              <ShowMoreButton onClick={() => setShowAllTracks(false)}>
                <span>접기</span>
                <span>▲</span>
              </ShowMoreButton>
            )}
          </PlaylistSection>

          <InfoBox>
            {/* 스튜디오 정보 */}
            <StudioInfo>
              <div>
                <div className="studio-name">셀프노트 스튜디오</div>
                <div className="studio-followers">프로 음향 엔지니어 운영</div>
              </div>
              <FollowButton>문의하기</FollowButton>
            </StudioInfo>

            {/* Why 섹션 */}
            <WhySection>
              <WhyTitle>혼자 연습만 하고 계신가요?</WhyTitle>
              <WhySubtitle>실전 녹음 경험으로 진짜 실력을 키우세요</WhySubtitle>
              
              <WhyCardGrid>
                {whyCards.map((card) => (
                  <WhyCard key={card.id}>
                    {card.isVideo ? (
                      <video 
                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                      >
                        <source src={card.video} type="video/mp4" />
                      </video>
                    ) : (
                      <WhyCardImage src={card.image} alt={card.title} />
                    )}
                    <WhyCardContent>
                      <WhyCardTitle>{card.title}</WhyCardTitle>
                      <WhyCardText>{card.description}</WhyCardText>
                      <WhyCardDivider />
                      <WhyCardList>
                        {card.points.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </WhyCardList>
                    </WhyCardContent>
                  </WhyCard>
                ))}
              </WhyCardGrid>
            </WhySection>

            {/* 커리큘럼 */}
            <BenefitSection>
              <BenefitTitle>커리큘럼 구성</BenefitTitle>
              <BenefitList>
                <li>프로페셔널 녹음 세션 4회 (각 60분)</li>
                <li>1:1 맞춤 보컬 디렉팅</li>
                <li>녹음 후 피드백 제공</li>
                <li>완성 고음질 음원 제공</li>
                <li>기간 내 연습실(시간당) 무료 이용 가능</li>
              </BenefitList>
            </BenefitSection>

            <BenefitSection>
              <BenefitTitle>프로그램 특징</BenefitTitle>
              <BenefitList>
                <li>소규모 정예 클래스 (정원 최대 10명)</li>
                <li>1:1 집중 관리 시스템</li>
                <li>수료 후 후보정 선택시 30% 할인</li>
                <li>첫 수업전 100% 환불 보장</li>
              </BenefitList>
            </BenefitSection>

            <BenefitSection>
              <BenefitTitle>프로그램 이용 혜택</BenefitTitle>
              <BenefitList>
                <li>프로 수준의 내 음원 소장</li>
                <li>SNS 업로드용 콘텐츠 확보</li>
                <li>특별한 선물 제작 가능</li>
                <li>노래 실력 향상</li>
                <li>버킷리스트 달성</li>
              </BenefitList>
            </BenefitSection>

            {/* 수강 신청 버튼 */}
            <ApplyButton onClick={scrollToForm}>
              수강 신청하기
            </ApplyButton>
          </InfoBox>
        </ProductSection>

        {/* Tab Menu */}
        <TabContainer>
          <TabMenu>
            <TabButton 
              $active={activeTab === 'details'}
              onClick={() => setActiveTab('details')}
            >
              상세정보
            </TabButton>
            <TabButton 
              $active={activeTab === 'reviews'}
              onClick={() => setActiveTab('reviews')}
            >
              수강 후기
            </TabButton>
            <TabButton 
              $active={activeTab === 'apply'}
              onClick={() => setActiveTab('apply')}
            >
              신청 방법
            </TabButton>
            <TabButton 
              $active={activeTab === 'faq'}
              onClick={() => setActiveTab('faq')}
            >
              자주 묻는 질문
            </TabButton>
          </TabMenu>

          <TabContent>
            {activeTab === 'details' && (
              <DetailSection>
                <h3>추천 대상</h3>
                <PackageCard>
                  <ul>
                    <li>취미로 노래를 시작하고 싶으신 분</li>
                    <li>음치, 박치를 극복하고 싶으신 분</li>
                    <li>내 목소리로 음원을 만들고 싶으신 분</li>
                    <li>유튜브, SNS용 커버곡을 만들고 싶으신 분</li>
                    <li>저렴한 가격에 프로 녹음을 경험하고 싶으신 분</li>
                  </ul>
                </PackageCard>

                <h3>패키지 구성</h3>
                <PackageCard>
                  <h4>프로 녹음 3회 (회당 1시간)</h4>
                  <ul>
                    <li>최고급 장비로 녹음</li>
                    <li>실시간 피드백 제공</li>
                    <li>무제한 재녹음 가능</li>
                  </ul>
                </PackageCard>

                <PackageCard>
                  <h4>1:1 보컬 레슨 5회 (회당 50분)</h4>
                  <ul>
                    <li>호흡, 발성 기초부터</li>
                    <li>노래 스킬 집중 훈련</li>
                    <li>맞춤형 커리큘럼 제공</li>
                  </ul>
                </PackageCard>

                <PackageCard>
                  <h4>믹싱 & 마스터링 1회</h4>
                  <ul>
                    <li>전문 엔지니어 작업</li>
                    <li>음원 퀄리티 극대화</li>
                    <li>스트리밍 최적화</li>
                  </ul>
                </PackageCard>

                <h3>특별 혜택</h3>
                <PackageCard>
                  <ul>
                    <li>기간 내 무제한 연습실 사용</li>
                    <li>녹음 가이드북 제공</li>
                    <li>평생 무료 음원 보관</li>
                    <li>추가 녹음 시 50% 할인</li>
                  </ul>
                </PackageCard>
              </DetailSection>
            )}

            {activeTab === 'reviews' && (
              <DetailSection>
                <h3>수강생 후기</h3>
                <p style={{ textAlign: 'center', color: '#999', padding: '40px 0' }}>
                  곧 실제 후기로 업데이트 예정입니다!
                </p>
              </DetailSection>
            )}

            {activeTab === 'apply' && (
              <DetailSection>
                <h3>신청 절차</h3>
                <PackageCard>
                  <h4>1단계: 신청서 작성</h4>
                  <ul>
                    <li>아래 신청 폼을 작성해주세요</li>
                    <li>이름, 연락처, 희망 곡 등을 입력</li>
                  </ul>
                </PackageCard>

                <PackageCard>
                  <h4>2단계: 입금</h4>
                  <ul>
                    <li>계좌번호로 입금해주세요</li>
                    <li>입금자명을 정확히 기재</li>
                  </ul>
                </PackageCard>

                <PackageCard>
                  <h4>3단계: 일정 조율</h4>
                  <ul>
                    <li>입금 확인 후 24시간 내 연락</li>
                    <li>녹음 및 레슨 일정 협의</li>
                  </ul>
                </PackageCard>

                <PackageCard>
                  <h4>4단계: 시작!</h4>
                  <ul>
                    <li>약속된 날짜에 스튜디오 방문</li>
                    <li>즐거운 녹음 & 레슨 시작</li>
                  </ul>
                </PackageCard>
              </DetailSection>
            )}

            {activeTab === 'faq' && (
              <DetailSection>
                <h3>자주 묻는 질문</h3>
                <PackageCard>
                  <h4>Q. 노래를 전혀 못하는데 가능한가요?</h4>
                  <p>네! 초보자도 환영합니다. 기초부터 차근차근 알려드립니다.</p>
                </PackageCard>

                <PackageCard>
                  <h4>Q. 수업 일정은 어떻게 되나요?</h4>
                  <p>상담을 통해 개인 맞춤 일정으로 자유롭게 진행 가능합니다.</p>
                </PackageCard>

                <PackageCard>
                  <h4>Q. 환불이 가능한가요?</h4>
                  <p>첫 레슨 전까지는 전액 환불 가능합니다.</p>
                </PackageCard>

                <PackageCard>
                  <h4>Q. 추가 비용이 있나요?</h4>
                  <p>패키지 금액 외 추가 비용은 일절 없습니다.</p>
                </PackageCard>
              </DetailSection>
            )}
          </TabContent>
        </TabContainer>

        {/* Application Form */}
        <div id="application-form" style={{ padding: '60px 24px', background: '#f9fafb' }}>
          <FormSection>
            <FormTitle>수강 신청</FormTitle>
            
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label>
                  이름<span>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>
                  연락처<span>*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="010-1234-5678"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>이메일</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <label>희망 곡</label>
                <input
                  type="text"
                  name="song"
                  placeholder="녹음하고 싶은 곡이 있으신가요?"
                  value={formData.song}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <label>요청사항</label>
                <textarea
                  name="message"
                  placeholder="문의사항이나 요청사항을 자유롭게 작성해주세요"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <AccountInfo>
                <h4>입금 계좌 안내</h4>
                <p><strong>농협</strong> 123-4567-8901-23</p>
                <p><strong>예금주</strong> 셀프노트스튜디오</p>
                <p style={{ marginTop: '16px', fontSize: '0.9rem', color: '#666' }}>
                  ※ 입금자명을 신청하신 이름과 동일하게 해주세요
                </p>
              </AccountInfo>

              <CheckboxGroup>
                <input
                  type="checkbox"
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleInputChange}
                />
                <span>개인정보 수집 및 이용에 동의합니다 (필수)</span>
              </CheckboxGroup>

              <SubmitButton type="submit" disabled={!formData.agreed}>
                수강 신청하기
              </SubmitButton>
            </form>
          </FormSection>
        </div>

      </PageContainer>

      {/* 오디오 엘리먼트 */}
      {currentTrack !== null && (
        <audio
          ref={audioRef}
          src={audioFiles[currentTrack]}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          preload="auto"
        />
      )}

      {/* Fixed Bottom Bar */}
      <FixedBottomBar $visible={showFixedBar}>
        <FixedButton onClick={scrollToForm}>
          수강 신청
        </FixedButton>
      </FixedBottomBar>

      <Footer />
    </>
  );
}


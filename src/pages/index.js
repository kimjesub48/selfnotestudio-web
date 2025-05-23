import React from 'react';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import AudioComparison from '../components/AudioComparison';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import VideoPackages from '../components/VideoPackages';
import Reviews from '../components/Reviews';
import StudioInfo from '../components/StudioInfo';
import ReservationSection from '../components/ReservationSection';
import Footer from '../components/Footer';
import PriceSection from '../components/PriceSection';

export default function Home() {
  return (
    <>
      <SEOHead 
        title="셀프노트 스튜디오 - 전문 녹음실 | 1:1 디렉팅 | 음정보정 | 영상제작"
        description="셀프노트 스튜디오는 전문 엔지니어의 1:1 맞춤 디렉팅과 음정보정, 고품질 영상제작을 제공하는 녹음실입니다. 무제한 녹음으로 완벽한 음원을 만들어보세요."
        keywords="녹음실, 셀프노트, 음정보정, 디렉팅, 영상제작, 노래녹음, 음원제작, 보컬코칭, 믹싱, 마스터링"
        url="https://selfnote.co.kr"
      />
      <StructuredData />
      
      <main>
        <Hero />
        <Reviews />
        <WhyChooseUs />
        <AudioComparison />
        <VideoPackages />
        <StudioInfo />
        <PriceSection />
        <ReservationSection />
        <Footer />
      </main>
    </>
  );
} 
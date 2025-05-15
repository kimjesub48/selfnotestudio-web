import React from 'react';
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
    <main>
      <Hero />
      <WhyChooseUs />
      <AudioComparison />
      <VideoPackages />
      <StudioInfo />
      <Reviews />
      <PriceSection />
      <ReservationSection />
      <Footer />
    </main>
  );
} 
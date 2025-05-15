'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import AudioComparison from '../components/AudioComparison';
import '../styles/globals.css';

// 로딩 스켈레톤 컴포넌트
const SectionSkeleton = ({ height = 400 }) => (
  <div style={{ 
    width: '100%', 
    height: `${height}px`, 
    backgroundColor: '#13151C', 
    margin: '10px 0',
    borderRadius: '8px' 
  }} />
);

// 로딩 컴포넌트 - 스타일과 디자인 유지
const LoadingScreen = () => (
  <div style={{ 
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: '#13151C',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    opacity: 1,
    transition: 'opacity 0.3s ease-out'
  }}>
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ 
        fontFamily: 'JalnanGothic, sans-serif', 
        fontSize: '2rem',
        color: '#FFFFFF',
        marginBottom: '20px'
      }}>
        셀프노트 스튜디오
      </h1>
      <div style={{ 
        width: '50px',
        height: '50px',
        margin: '0 auto',
        border: '5px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '50%',
        borderTop: '5px solid #3491FF',
        animation: 'spin 1s linear infinite'
      }}></div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

export default function Home() {
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    // 더블 탭 줌 방지
    document.addEventListener('touchstart', function(event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    }, { passive: false });

    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);

    // 페이지 준비 상태 설정
    if (document.readyState === 'complete') {
      setPageReady(true);
    } else {
      window.addEventListener('load', () => setPageReady(true));
      
      // 백업 타이머 (2초 후에도 로드되지 않으면 강제로 준비 상태로 설정)
      const timer = setTimeout(() => setPageReady(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <main>
        <div className="content-container">
          <Hero />
          <WhyChooseUs />
          <AudioComparison />
        </div>
      </main>
    </>
  );
}

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// 클라이언트 컴포넌트를 동적으로 로드합니다
const AudioComparisonClient = dynamic(
  () => import('./04-Audio-Client'),
  { ssr: false }
);

export default function AudioComparison() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <AudioComparisonClient />
    </Suspense>
  );
} 
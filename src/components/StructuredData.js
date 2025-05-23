import Head from 'next/head';

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "셀프노트 스튜디오",
    "description": "전문 엔지니어의 1:1 맞춤 디렉팅과 음정보정, 고품질 영상제작을 제공하는 녹음실",
    "url": "https://selfnote.co.kr",
    "telephone": "+82-2-xxxx-xxxx",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "KR",
      "addressLocality": "서울",
      "addressRegion": "서울특별시"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "37.5665",
      "longitude": "126.9780"
    },
    "openingHours": "Mo-Su 09:00-22:00",
    "priceRange": "$$",
    "image": "https://selfnote.co.kr/images/studio-main.jpg",
    "sameAs": [
      "https://www.youtube.com/channel/UCxxxxxx",
      "https://www.instagram.com/selfnote_studio",
      "https://blog.naver.com/selfnote"
    ],
    "service": [
      {
        "@type": "Service",
        "name": "녹음 서비스",
        "description": "무제한 녹음으로 완벽한 음원 제작"
      },
      {
        "@type": "Service", 
        "name": "1:1 디렉팅",
        "description": "전문 엔지니어의 맞춤형 보컬 디렉팅"
      },
      {
        "@type": "Service",
        "name": "음정보정",
        "description": "전문적인 음정보정 및 믹싱 서비스"
      },
      {
        "@type": "Service",
        "name": "영상제작",
        "description": "고품질 뮤직비디오 및 프로모션 영상 제작"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2)
        }}
      />
    </Head>
  );
} 
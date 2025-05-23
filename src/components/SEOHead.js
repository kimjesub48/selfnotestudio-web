import Head from 'next/head';

export default function SEOHead({
  title = "셀프노트 녹음실 스튜디오",
  description = "전문 엔지니어의 1:1 맞춤 디렉팅과 음정보정, 고품질 영상제작을 제공하는 녹음실",
  keywords = "녹음실, 셀프노트, 음정보정, 디렉팅, 영상제작, 노래녹음, 음원제작",
  ogImage = "https://selfnote.co.kr/studio/studio02.webp",
  url = "https://selfnote.co.kr",
  type = "website"
}) {
  const fullTitle = title.includes('셀프노트') ? title : `${title} | 셀프노트 스튜디오`;
  // 카카오톡 공유용은 항상 "셀프노트 녹음실 스튜디오"만 표시
  const ogTitle = "셀프노트 녹음실 스튜디오";
  
  return (
    <Head>
      {/* 기본 메타 태그 */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      
      {/* Twitter Card */}
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* 캐노니컬 URL */}
      <link rel="canonical" href={url} />
    </Head>
  );
} 
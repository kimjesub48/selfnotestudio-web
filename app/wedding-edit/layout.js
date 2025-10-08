export const metadata = {
  title: "결혼식 음원 편집 서비스 | 셀프노트 스튜디오",
  description: "소중한 결혼식을 위한 완벽한 음원 편집 서비스. 입장곡, 축가, 행진곡 등 결혼식 음악을 전문적으로 편집해드립니다. 빠른 작업, 고품질 결과물 보장.",
  keywords: "결혼식 음원 편집, 입장곡 편집, 축가 편집, 행진곡 편집, 웨딩 음악, 결혼식 음악, 음원 제작, 셀프노트 스튜디오",
  openGraph: {
    title: "결혼식 음원 편집 서비스 | 셀프노트 스튜디오",
    description: "소중한 결혼식을 위한 완벽한 음원 편집 서비스. 입장곡, 축가, 행진곡 등 결혼식 음악을 전문적으로 편집해드립니다.",
    url: "https://selfnote.co.kr/wedding-edit",
    siteName: "셀프노트 스튜디오",
    images: [
      {
        url: "https://selfnote.co.kr/studio/studio02.webp",
        width: 1200,
        height: 630,
        alt: "결혼식 음원 편집 서비스",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "결혼식 음원 편집 서비스 | 셀프노트 스튜디오",
    description: "소중한 결혼식을 위한 완벽한 음원 편집 서비스. 입장곡, 축가, 행진곡 등 결혼식 음악을 전문적으로 편집해드립니다.",
    images: ["https://selfnote.co.kr/studio/studio02.webp"],
  },
  alternates: {
    canonical: "https://selfnote.co.kr/wedding-edit",
  },
};

export default function WeddingEditLayout({ children }) {
  return children;
} 
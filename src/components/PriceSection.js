import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  background: #f0f8ff;
  padding: 80px 0 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 900px) {
    padding: 40px 0 30px;
  }
`;

const Notice = styled.div`
  text-align: center;
  color: #222;
  font-size: 1.08rem;
  font-weight: 500;
`;

const SubNotice = styled.div`
  text-align: center;
  color: #888;
  font-size: 0.98rem;
`;

const CardRow = styled.div`
  display: flex;
  gap: 32px;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border: 1px solid #e0e0e0;
  width: 340px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 0 18px 0;
  @media (max-width: 900px) {
    width: 95%;
    min-width: 0;
  }
`;

const CardTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111;
  padding: 28px 0 12px 0;
  text-align: center;
  border-bottom: 2px solid #222;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  font-size: 1.05rem;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #e0e0e0;
`;

const Th = styled.th`
  text-align: left;
  color: #222;
  font-weight: 500;
  padding: 12px 0 12px 24px;
  width: 44%;
  font-size: 1.02rem;
`;

const Td = styled.td`
  text-align: right;
  color: #222;
  font-weight: 400;
  padding: 12px 24px 12px 0;
  font-size: 1.02rem;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin: 18px 24px 0 0;
`;

const OldPrice = styled.span`
  color: #bbb;
  text-decoration: line-through;
  font-size: 1.05rem;
`;

const Price = styled.span`
  color: #111;
  font-size: 1.35rem;
  font-weight: 700;
`;

const Discount = styled.span`
  color: #FF3B6A;
  font-size: 1.05rem;
  font-weight: 700;
  margin-left: 6px;
`;

const CardFooter = styled.div`
  margin: 18px 0 0 0;
  text-align: center;
  color: #666;
  font-size: 0.98rem;
  padding: 0 18px;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const ReserveButton = styled.a`
  display: block;
  margin: 22px auto 0 auto;
  background: #111;
  color: #fff;
  font-size: 1.08rem;
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 0;
  width: 80%;
  text-align: center;
  text-decoration: none;
  transition: background 0.15s;
  &:hover {
    background: #222;
  }
`;

export default function PriceSection() {
  return (
    <Section id="price-section">
      <Notice>녹음실 이용 가격은 서비스 종류에 따라 달라집니다.</Notice>
      
      <div style={{ height: '12px' }}></div>
      
      <SubNotice>* 부가세(vat) 별도 금액입니다.</SubNotice>
      
      <div style={{ height: '20px' }}></div>
      
      <CardRow>
        {/* 녹음실 대여 */}
        <Card>
          <CardTitle>녹음실 대여</CardTitle>
          <Table>
            <tbody>
              <Tr><Th>이용 시간</Th><Td>1시간</Td></Tr>
              <Tr><Th>엔지니어</Th><Td>포함</Td></Tr>
              <Tr><Th>장비</Th><Td>고급 마이크/음향</Td></Tr>
              <Tr><Th>인원</Th><Td>4인까지(초과 1인 5천원)</Td></Tr>
              <Tr><Th>추가 옵션</Th><Td>없음</Td></Tr>
            </tbody>
          </Table>
          <PriceRow>
            <OldPrice>60,000</OldPrice>
            <Price>50,000</Price>
            <Discount>↓16%</Discount>
          </PriceRow>
          <ReserveButton href="#reservation">예약하기</ReserveButton>
          <CardFooter>디렉팅 포함 무제한 곡 녹음 상품입니다.</CardFooter>
        </Card>
        
        {/* 음정보정 패키지 - 숨김 처리 */}
        
        {/* 영상 패키지 */}
        <Card>
          <CardTitle>영상 패키지</CardTitle>
          <Table>
            <tbody>
              <Tr><Th>녹음 시간</Th><Td>1시간</Td></Tr>
              <Tr><Th>엔지니어</Th><Td>포함</Td></Tr>
              <Tr><Th>영상 촬영</Th><Td>1각도 고화질</Td></Tr>
              <Tr><Th>색보정</Th><Td>포함</Td></Tr>
              <Tr><Th>촬영 횟수</Th><Td>2회</Td></Tr>
            </tbody>
          </Table>
          <PriceRow>
            <OldPrice>180,000</OldPrice>
            <Price>150,000</Price>
            <Discount>↓17%</Discount>
          </PriceRow>
          <ReserveButton href="#reservation">예약하기</ReserveButton>
          <CardFooter>
            <span>녹음과 동시에 4K 영상 촬영까지 가능한</span>
            <span>올인원 패키지입니다.</span>
          </CardFooter>
        </Card>
      </CardRow>
    </Section>
  );
} 
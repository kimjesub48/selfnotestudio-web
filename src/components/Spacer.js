import styled from 'styled-components';

const SpacerDiv = styled.div`
  display: block;
  height: ${props => {
    if (typeof props.height === 'object') {
      return props.$isMobile ? `${props.height.mobile}px` : `${props.height.pc}px`;
    }
    return typeof props.height === 'number' ? `${props.height}px` : props.height;
  }};
`;

export default function Spacer({ height = 40, isMobile }) {
  return <SpacerDiv height={height} $isMobile={isMobile} />;
} 

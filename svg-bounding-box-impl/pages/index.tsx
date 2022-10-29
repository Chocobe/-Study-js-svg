import SvgCore from "@/components/SvgCore/SvgCore";
import styled from "styled-components";

const HomeRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  text-align: end;
`

function Home() {
  return (
    <HomeRoot>
      <Title>😱 Svg 기반 BoundingBox 작업도구 구현 가능 검증</Title>

      <SvgCore />
    </HomeRoot>
  );
}

export default Home;
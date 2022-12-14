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
      <Title>π± Svg κΈ°λ° BoundingBox μμλκ΅¬ κ΅¬ν κ°λ₯ κ²μ¦</Title>

      <SvgCore />
    </HomeRoot>
  );
}

export default Home;
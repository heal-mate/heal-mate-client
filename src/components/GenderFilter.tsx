import { styled } from "styled-components";
import RadioButton from "./RadioButton";

export default function RadioInput() {
  return (
    <Container>
      <p>성별</p>
      <FlexDiv>
        <RadioButton text="남자" />
        <RadioButton text="여자" />
        <RadioButton text="상관없음" />
      </FlexDiv>
    </Container>
  );
}

const Container = styled.div`
  width: "100%";
  margin-bottom: 30px;
  & > p {
    font-size: 22px;
    margin-bottom: 10px;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

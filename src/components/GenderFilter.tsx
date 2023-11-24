import { styled } from "styled-components";
import { GenderType } from "@/components/MatchFilter.type";
import RadioButton from "@/components/RadioButton";

export type RadioInputProps = {
  handleChange: (genderType: GenderType) => void;
  genderType: GenderType;
};

export default function GenderFilter({
  handleChange,
  genderType,
}: RadioInputProps) {
  return (
    <StyledContainer>
      <StyledInfo>
        <p>성별</p>
        <div>
          {!genderType && "상관없음"}
          {genderType === "MALE" && "남자만"}
          {genderType === "FEMALE" && "여자만"}
        </div>
      </StyledInfo>
      <StyledSettings>
        <RadioButton
          text="남자"
          genderType="MALE"
          handleChange={handleChange}
        />
        <RadioButton
          text="여자"
          genderType="FEMALE"
          handleChange={handleChange}
        />
        <RadioButton
          text="상관없음"
          genderType={null}
          handleChange={handleChange}
        />
      </StyledSettings>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  height: 100px;
`;

const StyledInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 10px;

  & > p {
    font-size: 22px;
  }

  & > div {
    font-size: 15px;
    color: ${({ theme }) => theme.colors.point};
  }
`;

const StyledSettings = styled.div`
  display: flex;
  width: 100%;
`;

import { styled } from "styled-components";
import { GenderType } from "@/components/MatchFilter.type";

export type RadioButtonProps = {
  text: string;
  genderType: GenderType;
  defaultValue: GenderType;
  handleChange: (genderType: GenderType) => void;
};

export default function RadioButton({
  text,
  genderType,
  defaultValue,
  handleChange,
}: RadioButtonProps) {
  return (
    <StyledLabel htmlFor={text}>
      <input
        type="radio"
        id={text}
        name="gender"
        onChange={() => handleChange(genderType)}
        defaultChecked={defaultValue === genderType}
      />
      <p>{text}</p>
    </StyledLabel>
  );
}

const StyledLabel = styled.label`
  flex: 1;
  display: flex;
  align-items: center;
  margin-top: 0 !important;
  & > p {
    margin-left: 4px;
  }
`;

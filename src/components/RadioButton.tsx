import { styled } from "styled-components";
import { GenderType } from "@/components/MatchFilter.type";

export type RadioButtonProps = {
  text: string;
  genderType: GenderType;
  handleChange: (genderType: GenderType) => void;
};

export default function RadioButton({
  text,
  genderType,
  handleChange,
}: RadioButtonProps) {
  return (
    <StyledLabel htmlFor={text}>
      <StyledInput
        type="radio"
        id={text}
        name="gender"
        onChange={() => handleChange(genderType)}
        defaultChecked={!genderType ? true : false}
      />
      <p>{text}</p>
    </StyledLabel>
  );
}

const StyledLabel = styled.label`
  flex: 1;
  display: flex;
  align-items: center;

  & > p {
    margin-left: 4px;
  }
`;

const StyledInput = styled.input`
  /* position: relative;
  appearance: none;
  border: 2px solid black;
  border-radius: 10px;
  width: 20px;
  height: 20px;

  &:checked {
    border: 2px solid ${({ theme }) => theme.colors.point};
    background-color: ${({ theme }) => theme.colors.point};
  }
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: "";
    display: block;
    width: 15px;
    height: 15px;
    border: 2px solid black;
    border-radius: 10px;
    border: 2px solid white;
    background-color: ${({ theme }) => theme.colors.point};
  } */
`;

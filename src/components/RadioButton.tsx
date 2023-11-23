import { styled } from "styled-components";

export type RadioButtonProps = {
  text: string;
};

export default function RadioButton({ text }: RadioButtonProps) {
  return (
    <>
      <Label htmlFor={text}>
        <Input type="radio" id={text} name="gender" />
        <p>{text}</p>
      </Label>
    </>
  );
}

const Label = styled.label`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  appearance: none;
  border: 2px solid black;
  border-radius: 10px;
  width: 20px;
  height: 20px;

  &:checked {
    border: 2px solid #2851e8;
    background-color: #2851e8;
  }
`;

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import * as S from "./RangeInput.style";

const marks = {
  0: "0kg",
  25: "25kg",
  50: "50kg",
  75: "75kg",
  100: "100kg",
};

export type Rangeinput = {
  type: string;
  handleChange: (ranges: number | number[]) => void;
  min: number;
  max: number;
};

export default function Rangeinput({
  type,
  handleChange,
  min,
  max,
}: Rangeinput) {
  return (
    <>
      <S.StyleDiv>
        <S.FlexDiv>
          <p>{type}</p>
          <div>
            {min}~{max}kg
          </div>
        </S.FlexDiv>
        <Slider
          range
          marks={marks}
          step={5}
          dots={false}
          onChange={handleChange}
          value={[min, max]}
          defaultValue={[min, max]}
        />
      </S.StyleDiv>
    </>
  );
}

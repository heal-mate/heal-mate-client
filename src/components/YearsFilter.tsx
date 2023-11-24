import { styled } from "styled-components";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const careerMarks = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
};

function parseYears(year: number): string {
  let years = Math.floor(year);
  let months = ((year % 1) / 0.25) * 3;

  let duration = "";

  if (years > 0) {
    duration += years + (years === 1 ? "년 " : "년 ");
  }

  if (months > 0 || (years === 0 && months === 0)) {
    duration += months + "개월";
  }

  return duration.trim();
}

export type YearsFilterProps = {
  minYears: number;
  maxYears: number;
  handleChangeYears: (ranges: [number, number]) => void;
};

export default function YearsFilter({
  minYears,
  maxYears,
  handleChangeYears,
}: YearsFilterProps) {
  return (
    <StyledContainer>
      <StyledInfo>
        <p>경력</p>
        <div>
          {!minYears && !maxYears ? (
            "상관없음"
          ) : (
            <>
              {parseYears(minYears)}~{parseYears(maxYears)}
            </>
          )}
        </div>
      </StyledInfo>
      <StyledRange>
        <Slider
          range
          max={5}
          marks={careerMarks}
          step={0.25}
          dots={false}
          value={[minYears, maxYears]}
          defaultValue={[minYears, maxYears]}
          onChange={handleChangeYears as (range: number | number[]) => void}
        />
      </StyledRange>
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
    color: #2851e8;
  }
`;

const StyledRange = styled.div`
  .rc-slider-handle {
    width: 22px;
    height: 22px;
    margin-top: -4px;
    border: none;
    background-color: #faf9f6;
    opacity: 1;
    border: 2px solid #2851e8;
    box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.5);
  }

  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border-color: transparent;
    box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.5);
  }
  .rc-slider-handle:hover {
    border-color: transparent;
  }
  .rc-slider-handle:active {
    border-color: transparent;
    box-shadow: none;
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }

  .rc-slider-rail {
    position: absolute;
    width: 100%;
    height: 14px;
    background-color: #faf9f6;
    border-radius: 10px;
  }
  .rc-slider-track {
    height: 14px;
    background-color: #2851e8;
  }

  .rc-slider-step {
    height: 8px;
  }
  .rc-slider-mark {
    top: 30px;
  }

  // 마커 텍스트 스타일
  .rc-slider-mark-text {
    position: absolute;
    display: inline-block;
    color: #999;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
  }
  // dot 기본 스타일
  .rc-slider-dot {
    opacity: 0;
  }

  // 버튼 활성화 색상
  .rc-slider-dot-active {
    border-color: transparent;
  }
`;

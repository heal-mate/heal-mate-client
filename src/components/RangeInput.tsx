import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { styled } from "styled-components";
import { MarkObj } from "rc-slider/lib/Marks";

export type RangeinputProps = {
  type: string;
  marks: Record<string | number, React.ReactNode | MarkObj>;
  suffix: string;
  handleChange: (ranges: [number, number]) => void;
  min: number;
  max: number;
};

export default function Rangeinput({
  type,
  marks,
  suffix,
  handleChange,
  min,
  max,
}: RangeinputProps) {
  return (
    <StyledContainer>
      <StyledInfo>
        <p>{type}</p>
        <div>
          {min === 0 && max === 300 ? (
            "상관없음"
          ) : (
            <>
              {min}~{max}
              {suffix}
            </>
          )}
        </div>
      </StyledInfo>
      <StyledRange>
        <Slider
          range
          marks={marks}
          max={300}
          step={5}
          dots={false}
          onChange={handleChange as (ranges: number | number[]) => void}
          value={[min, max]}
          defaultValue={[0, 100]}
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
    color: ${({ theme }) => theme.colors.point};
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
    border: 2px solid ${({ theme }) => theme.colors.point};
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
    background-color: ${({ theme }) => theme.colors.point};
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

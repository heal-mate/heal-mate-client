import Slider from "rc-slider";
import { styled } from "styled-components";
import "rc-slider/assets/index.css";
import { ReactNode } from "react";
import { MarkObj } from "rc-slider/lib/Marks";
import { MAX_WEIGHT } from "@/config/constants";

type RangeinputProps = {
  conditionType: "RANGE" | "POINT";
  isEditable: boolean;
  title: string;
  name: string;
  suffix: string;
  step: number;
  max: number;
  marks: Record<string | number, ReactNode | MarkObj>;
  value: number | [number, number] | null;
  handleChange: (value: number | number[], target: string) => void;
};
export default function Rangeinput({
  conditionType,
  isEditable,
  title,
  name,
  suffix,
  step,
  max,
  marks,
  value,
  handleChange,
}: RangeinputProps) {
  return (
    <StyledRangeinputContainer>
      <StyledInfo>
        <p>{title}</p>
        <div>
          {/* 
          {typeof value === "number" ? (
            <div>{value}</div>
          ) : Array.isArray(value) && value.length === 2 ? (
            <div>
              {value[0]}
              {value[1]}
            </div>
          ) : null}
           */}
          {conditionType === "POINT" ? (
            <div>
              {value ?? "300이상"}
              {suffix}
            </div>
          ) : Array.isArray(value) ? (
            <div>
              {value[0]}~{value[1]}
              {suffix}
            </div>
          ) : (
            "상관없음"
          )}
        </div>
      </StyledInfo>
      <StyledRange>
        <Slider
          range={conditionType === "RANGE"}
          marks={marks}
          max={max}
          step={step}
          dots={false}
          defaultValue={value ?? [0, MAX_WEIGHT]}
          value={value ?? [0, MAX_WEIGHT]}
          onChange={(range) => {
            handleChange(range, name);
          }}
          disabled={!isEditable}
        />
      </StyledRange>
    </StyledRangeinputContainer>
  );
}
const StyledRangeinputContainer = styled.div`
  margin-bottom: 50px;
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
  .rc-slider-disabled {
    background-color: transparent;
  }

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

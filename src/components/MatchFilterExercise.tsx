import { css, styled } from "styled-components";
import { FaDumbbell } from "react-icons/fa";
import { CheckedExercise } from "@/components/MatchFilter.type";

export type MatchFilterExerciseProps = {
  isChecked: CheckedExercise | null;
  handleClick: (title: keyof CheckedExercise) => void;
};

export default function MatchFilterExercise({
  isChecked,
  handleClick,
}: MatchFilterExerciseProps) {
  return (
    <>
      {isChecked && (
        <StyledContainer>
          <StyledExerciseButton
            $isChecked={isChecked.benchPress}
            onClick={() => handleClick("benchPress")}
          >
            <StyledDumbbellIcon />
            '벤치프레스'
          </StyledExerciseButton>
          <StyledExerciseButton
            $isChecked={isChecked.deadLift}
            onClick={() => handleClick("deadLift")}
          >
            <StyledDumbbellIcon />
            데드리프트
          </StyledExerciseButton>
          <StyledExerciseButton
            $isChecked={isChecked.squat}
            onClick={() => handleClick("squat")}
          >
            <StyledDumbbellIcon />
            스쿼트
          </StyledExerciseButton>
        </StyledContainer>
      )}
    </>
  );
}

const StyledContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
`;

const StyledExerciseButton = styled.div<{ $isChecked: boolean }>`
  margin-bottom: 10px;
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  ${({ $isChecked }) => ($isChecked ? enableBox : disableBox)};
`;

const enableBox = css`
  /* color: ${({ theme }) => theme.colors.point}; */
  color: ${({ theme }) => theme.colors.point};
  background-color: #ffffff;
  border-bottom: 4px solid ${({ theme }) => theme.colors.point};
  box-shadow: 2px 10px 10px 0px rgba(0, 0, 0, 0.1);
`;
const disableBox = css`
  background-color: #faf9f6;
  color: #b5b4b3;
`;
const StyledDumbbellIcon = styled(FaDumbbell)`
  font-size: 20px;
`;

import { useState } from "react";
import { styled, css } from "styled-components";
import { FaDumbbell } from "react-icons/fa";
import Rangeinput from "./RangeInput";
import { Condition, locations } from "./MathFilter.type";
import RadioInput from "./RadioInput";

const excersiseType = [
  {
    id: 0,
    name: "벤치프레스",
    value: "benchPress",
    isChecked: true,
    min: 0,
    max: 15,
  },
  {
    id: 1,
    name: "스쿼트",
    value: "squat",
    isChecked: false,
    min: 0,
    max: 15,
  },
  {
    id: 2,
    name: "데드리프트",
    value: "deadLift",
    isChecked: false,
    min: 0,
    max: 15,
  },
  {
    id: 3,
    name: "추가1",
    isChecked: false,
    min: 0,
    max: 0,
  },
  {
    id: 4,
    name: "추가2",
    isChecked: false,
    min: 0,
    max: 0,
  },
];

const weightMarks = {
  0: "0kg",
  25: "25kg",
  50: "50kg",
  75: "75kg",
  100: "100kg",
};

const careerMarks = {
  0: "1",
  25: "2",
  50: "5",
  75: "8",
  100: "10",
};

type ExerciseType = {
  id: number;
  name: string;
  isChecked: boolean;
  min: number;
  max: number;
};

export default function MatchFilter() {
  // 렌더링할 타입에 배열.
  const [list, setList] = useState(excersiseType);

  const [showType, setShowType] = useState<ExerciseType | null>(
    excersiseType[0],
  );

  const [filters, setFilters] = useState<Condition<"RANGE">>({
    benchPress: null,
    deadLift: null,
    fitnessYears: null,
    squat: null,
    gender: null,
    location: null,
  });

  const handleChangeWeight = (ranges: [number, number], id: number) => {
    const [min, max] = ranges;

    const changedItem = {
      ...showType!,
      min,
      max,
    };

    const newList = list.map((e) => ({ ...e }));

    setShowType(changedItem);

    newList[id] = changedItem;

    setList(newList);
  };

  const handleChangeYears = (ranges: [number, number]) => {
    const newFilters = {
      ...filters,
      fitnessYears: ranges,
    };
    console.log(newFilters);
    setFilters(newFilters);
  };

  // 클릭한 요소의 isChecked 속성 토글 함수.
  const handleSelectType = (item: ExerciseType, index: number) => {
    // 새로운 list를 만든다.
    const newList = list.map((e) => ({ ...e }));
    // item의 isChecked가 false 일때 토글한다.그리고 show.
    if (!item.isChecked) {
      newList[index].isChecked = !newList[index].isChecked;
      // 클릭한 아이템을 보여준다.
      setShowType({ ...item, isChecked: !item.isChecked });
      setList(newList);
    } else if (showType !== item) {
      // 만약 show 와 아이템이 다르다면.. 오직 show만
      setShowType(item);
    } else {
      // 같다면 ..해당 아이템 토글하고 다른 체크된 아이템 show.
      newList[index].isChecked = !newList[index].isChecked;
      const findIndex = newList.findIndex((e) => e.isChecked);
      setShowType(findIndex === -1 ? null : newList[findIndex]);
      setList(newList);
    }
  };

  // 필터 적용하기
  return (
    <Container>
      <FilterTypes>
        {list &&
          list.map((item, index) => {
            return (
              <>
                <Box
                  key={index}
                  $isChecked={item.isChecked}
                  onClick={() => handleSelectType(item, index)}
                >
                  <DumbbellIcon />
                  {item.name}
                </Box>
              </>
            );
          })}
      </FilterTypes>
      <FilterRange>
        {showType && (
          <Rangeinput
            type={showType.name}
            marks={weightMarks}
            suffix="kg"
            handleChange={(e) => handleChangeWeight(e, showType.id)}
            min={showType.min}
            max={showType.max}
          />
        )}
        <Rangeinput
          type={"경력"}
          marks={careerMarks}
          suffix="년"
          handleChange={handleChangeYears}
          min={filters.fitnessYears ? filters.fitnessYears[0] : 0}
          max={filters.fitnessYears ? filters.fitnessYears[1] : 10}
        />
        <RadioInput />

        <Locations>
          <p>지역</p>
          <div>
            {locations.map((location) => (
              <Location>{location}</Location>
            ))}
          </div>
        </Locations>
      </FilterRange>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
`;

const FilterTypes = styled.div`
  display: flex;
  gap: 5px;
`;
const FilterRange = styled.div`
  padding: 12px;
`;

const enableBox = css`
  color: #2851e8;
  background-color: #ffffff;
  border-bottom: 4px solid #2851e8;
  box-shadow: 2px 10px 10px 0px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;
const disableBox = css`
  background-color: #faf9f6;
  color: #b5b4b3;
`;

const Box = styled.div<{ $isChecked: boolean }>`
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

const DumbbellIcon = styled(FaDumbbell)`
  font-size: 20px;
`;

const Locations = styled.div`
  & > p {
    font-size: 22px;
    margin-bottom: 10px;
  }

  & > div {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;
const Location = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
`;

import { useState } from "react";
import { styled } from "styled-components";
import * as S from "./MatchFilter.style";
import Rangeinput from "./RangeInput";
import { locations } from "./MathFilter.type";
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

  const handleChangeWeight = (ranges: number | number[], id: number) => {
    if (typeof ranges === "number" || !showType) return;
    const [min, max] = ranges;

    const changedItem = {
      ...showType,
      min,
      max,
    };

    const newList = list.map((e) => ({ ...e }));

    setShowType(changedItem);

    newList[id] = changedItem;

    setList(newList);
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

  return (
    <S.Container>
      <S.Header>
        <h2>filters</h2>
        <S.CloseButton />
        <button>APPLY</button>
      </S.Header>
      <S.FilterTypes>
        {list &&
          list.map((item, index) => {
            return (
              <>
                <S.Box
                  key={index}
                  isChecked={item.isChecked}
                  onClick={() => handleSelectType(item, index)}
                >
                  <S.DumbbellIcon />
                  {item.name}
                </S.Box>
              </>
            );
          })}
      </S.FilterTypes>

      <S.FilterRange>
        {showType && (
          <Rangeinput
            type={showType.name}
            handleChange={(e) => handleChangeWeight(e, showType.id)}
            min={showType.min}
            max={showType.max}
          />
        )}
      </S.FilterRange>
    </S.Container>
  );
}

const Fieldset = styled.fieldset`
  margin-bottom: 50px;
  & > p {
    font-size: 22px;
    margin-bottom: 10px;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  text-align: center;
  & > label {
    flex: 1;
  }
`;

const LocationBox = styled.div`
  padding: 10px;
  border: 1px solid black;
  border-radius: 4px;
`;

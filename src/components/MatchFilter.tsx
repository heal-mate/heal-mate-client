import { useState } from "react";
import { styled } from "styled-components";
import { MdClose } from "react-icons/md";
import {
  ExerciseType,
  FilterStatus,
  GenderType,
  Location,
} from "@/components/MatchFilter.type";
import MatchFilterExercise from "@/components/MatchFilterExercise";
import MatchFilterYears from "@/components/MatchFilterYears";
import MatchFilterGender from "@/components/MatchFilterGender";
import MatchFilterLocations from "@/components/MatchFilterLocations";

const excersiseList = [
  {
    id: 0,
    name: "벤치프레스",
    value: "benchPress",
    isChecked: true,
    min: 0,
    max: 100,
  },
  {
    id: 1,
    name: "스쿼트",
    value: "squat",
    isChecked: false,
    min: 0,
    max: 100,
  },
  {
    id: 2,
    name: "데드리프트",
    value: "deadLift",
    isChecked: false,
    min: 0,
    max: 100,
  },
];

export default function MatchFilter() {
  // 렌더링할 타입에 배열.
  const [exerciseList, setExerciseList] = useState(excersiseList);

  const [showType, setShowType] = useState<ExerciseType | null>(
    excersiseList[0],
  );

  const [filters, setFilters] = useState<FilterStatus>({
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

    const newExerciseList = exerciseList.map((e) => ({ ...e }));

    setShowType(changedItem);

    newExerciseList[id] = changedItem;

    setExerciseList(newExerciseList);

    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        [newExerciseList[id].value]: min === 0 && max === 300 ? null : ranges,
      };
    });
  };

  const handleChangeYears = (ranges: [number, number]) => {
    const [minYears, maxYears] = ranges;

    const newFilters = {
      ...filters,
      fitnessYears: minYears === 0 && maxYears === 5 ? null : ranges,
    };
    setFilters(newFilters);
  };

  // 클릭한 요소의 isChecked 속성 토글 함수.
  const handleSelectType = (item: ExerciseType, index: number) => {
    // 새로운 list를 만든다.
    const newExerciseList = exerciseList.map((e) => ({ ...e }));
    // item의 isChecked가 false 일때 토글한다.그리고 show.
    if (!item.isChecked) {
      newExerciseList[index].isChecked = !newExerciseList[index].isChecked;
      // 클릭한 아이템을 보여준다.
      setShowType({ ...item, isChecked: !item.isChecked });
      setExerciseList(newExerciseList);
      setFilters((prevFilters) => {
        const { value, min, max } = newExerciseList[index];
        return {
          ...prevFilters,
          [value]: [min, max],
        };
      });
    } else if (showType !== item) {
      // 만약 show 와 아이템이 다르다면.. 오직 show만
      setShowType(item);
    } else {
      // 같다면 ..해당 아이템 토글하고 다른 체크된 아이템 show.
      newExerciseList[index].isChecked = !newExerciseList[index].isChecked;
      const findIndex = newExerciseList.findIndex((e) => e.isChecked);
      setShowType(findIndex === -1 ? null : newExerciseList[findIndex]);
      setExerciseList(newExerciseList);
      setFilters((prevFilters) => {
        return {
          ...prevFilters,
          [newExerciseList[index].value]: null,
        };
      });
    }
  };

  const handleChangeGender = (genderType: GenderType) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      gender: genderType,
    }));
  };

  const handleSelectLocation = (locationName: Location) => {
    // TODO: setFilters 함수를 사용해 location에 인자로 받은 locationName을 배열에 넣어야한다.

    setFilters((prevFilters) => {
      // location 배열이 null이 아니라면 기존 배열을 사용, null이면 빈 배열로 시작
      const currentLocations = prevFilters.location || [];

      // locationName이 이미 존재하면 제거, 그렇지 않으면 추가
      const updatedLocations = currentLocations.includes(locationName)
        ? currentLocations.filter((location) => location !== locationName)
        : [...currentLocations, locationName];

      // location 배열의 길이가 3이상 이면 추가하지 않는다.
      if (updatedLocations.length > 3) {
        alert("지역은 3곳 이상 선택 할 수 없습니다.");
        return prevFilters;
      }

      return {
        ...prevFilters,
        location: updatedLocations.length > 0 ? updatedLocations : null,
      };
    });
  };

  // 뒤로 가기
  const onClose = () => {};

  // 필터 적용하기
  const onApply = () => {
    alert(`${JSON.stringify(filters)}`);
  };
  return (
    <StyledContainer>
      <StyledHeader>
        <h2>filters</h2>
        <StyledCloseButton onClick={onClose} />
        <button onClick={onApply}>APPLY</button>
      </StyledHeader>
      <MatchFilterExercise
        exerciseList={exerciseList}
        showType={showType}
        handleChangeWeight={handleChangeWeight}
        handleSelectType={handleSelectType}
      />
      <MatchFilterYears
        minYears={filters.fitnessYears !== null ? filters.fitnessYears[0] : 0}
        maxYears={filters.fitnessYears !== null ? filters.fitnessYears[1] : 5}
        handleChangeYears={handleChangeYears}
      />
      <MatchFilterGender
        handleChange={handleChangeGender}
        genderType={filters.gender}
      />
      <MatchFilterLocations
        handleSelectLocation={handleSelectLocation}
        locationList={filters.location}
      />
      <pre style={{ whiteSpace: "pre-wrap" }}>
        <code>{JSON.stringify(filters)}</code>
      </pre>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
`;

const StyledHeader = styled.div`
  margin-bottom: 10px;
  position: relative;

  & > h2 {
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    padding: 16px;
    font-size: 22px;
    font-weight: bold;
    color: #1f1f1f;
  }

  & > button {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 70px;
    font-size: 14px;
    font-weight: bold;
    padding: 10px;
    border: none;
    border-radius: 17px;
    outline: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

const StyledCloseButton = styled(MdClose)`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  border-radius: 100%;
  font-size: 32px;
  font-weight: bold;
  padding: 5px;
  cursor: pointer;
`;

import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { CheckedExercise, GenderType } from "@/components/MatchFilter.type";
import { LOCATION_TYPE } from "../config/constants";
import MatchFilterExercise from "@/components/MatchFilterExercise";
import MatchFilterYears from "@/components/MatchFilterYears";
import MatchFilterGender from "@/components/MatchFilterGender";
import MatchFilterLocations from "@/components/MatchFilterLocations";
import { MAX_WEIGHT, WEIGHT_MARKS } from "@/config/constants";
import { fetchGetUserMine } from "@/service/apis/user";
import { Condition } from "@/service/apis/user.type";
import Rangeinput from "./RangeInput";
import customAlert from "@/utils/alert";

function generatorTitle(
  title: keyof CheckedExercise,
): "벤치프레스" | "데드리프트" | "스쿼트" {
  switch (title) {
    case "benchPress":
      return "벤치프레스";
    case "deadLift":
      return "데드리프트";
    case "squat":
      return "스쿼트";
  }
}

function findSelectedExercise(
  conditionExpect: CheckedExercise | null,
): keyof CheckedExercise {
  if (!conditionExpect) {
    throw new Error("null is error");
  }
  return Object.keys(conditionExpect).find(
    (key) => conditionExpect[key as keyof CheckedExercise],
  ) as keyof CheckedExercise;
}

export type MatchFilterProps = {
  handleChangeFilters: (filters: Condition<"RANGE"> | null) => void;
};
export default function MatchFilter({ handleChangeFilters }: MatchFilterProps) {
  const [filter, setFilter] = useState<Condition<"RANGE"> | null>(null);
  const [isChecked, setIsChecked] = useState<CheckedExercise | null>(null);
  const [current, setCurrent] = useState<keyof CheckedExercise | null>(null);

  useEffect(() => {
    // API 에서 받아온 값으로 filter state에 set한다.
    const fetchData = async () => {
      const data = await fetchGetUserMine();
      const conditionExpect = data.conditionExpect;
      const selectedExercises = {
        benchPress: conditionExpect.benchPress ? true : false,
        deadLift: conditionExpect.deadLift ? true : false,
        squat: conditionExpect.squat ? true : false,
      };
      setFilter(conditionExpect);
      setIsChecked(selectedExercises);

      const trueKey = findSelectedExercise(selectedExercises);
      setCurrent(trueKey || null);
    };

    fetchData();
  }, []);

  useEffect(() => {
    handleChangeFilters(filter || null);
  }, [filter, handleChangeFilters]);

  const handleClick = (title: keyof CheckedExercise) => {
    setIsChecked((prev) => {
      const newChecked = { ...prev! };
      if (!prev![title]) {
        // isChecked가 false인 경우
        newChecked[title] = true;
        setCurrent(title);
      } else if (current !== title) {
        setCurrent(title);
      } else {
        newChecked[title] = false;
        const nextTrueKey = findSelectedExercise(newChecked);
        setCurrent(nextTrueKey || null);
        setFilter((prev) => ({ ...prev!, [title]: null }));
      }
      // isChecked가 true인 경우
      return newChecked;
    });
  };

  const handleChangeExercise = (value: number | number[], target: string) => {
    setFilter((prev) => {
      if (Array.isArray(value) && value.length === 2) {
        if (value[0] === 0 && value[1] === 300) {
          return { ...prev!, [target]: null };
        }
      }

      return {
        ...prev!,
        [target]: value,
      };
    });
  };

  const handleChangeYears = (ranges: [number, number]) => {
    if (typeof ranges === "number") return;
    const [minYears, maxYears] = ranges;

    setFilter((prev) => {
      const newFilter = {
        ...prev!,
        fitnessYears: minYears === 0 && maxYears === 5 ? null : ranges,
      };
      return newFilter;
    });
  };

  const handleChangeGender = (genderType: GenderType) => {
    setFilter((prevFilters) => ({
      ...prevFilters!,
      gender: genderType,
    }));
  };

  const handleSelectLocation = (locationName: LOCATION_TYPE) => {
    // TODO: setFilter 함수를 사용해 location에 인자로 받은 locationName을 배열에 넣어야한다.

    setFilter((prevFilters) => {
      // location 배열이 null이 아니라면 기존 배열을 사용, null이면 빈 배열로 시작
      const currentLocations = prevFilters!.location || [];

      // locationName이 이미 존재하면 제거, 그렇지 않으면 추가
      const updatedLocations = currentLocations.includes(locationName)
        ? currentLocations.filter((location) => location !== locationName)
        : [...currentLocations, locationName];

      // location 배열의 길이가 3이상 이면 추가하지 않는다.
      if (updatedLocations.length > 3) {
        customAlert("지역은 3곳 이상 선택 할 수 없습니다.", false, "info");
        return prevFilters;
      }

      return {
        ...prevFilters!,
        location: updatedLocations.length > 0 ? updatedLocations : null,
      };
    });
  };

  if (!filter) return <div>Loading...</div>;

  return (
    <StyledContainer>
      <MatchFilterExercise handleClick={handleClick} isChecked={isChecked} />
      {current && (
        <Rangeinput
          conditionType="RANGE"
          handleChange={handleChangeExercise}
          isEditable={true}
          marks={WEIGHT_MARKS}
          suffix="kg"
          step={5}
          name={current!}
          title={generatorTitle(current!)}
          max={MAX_WEIGHT}
          value={filter[current!] ?? null}
        />
      )}
      <MatchFilterYears
        handleChangeYears={handleChangeYears}
        fitnessYears={filter.fitnessYears}
      />
      <MatchFilterGender
        handleChange={handleChangeGender}
        genderType={filter.gender}
      />
      <MatchFilterLocations
        handleSelectLocation={handleSelectLocation}
        locationList={filter.location}
      />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
`;

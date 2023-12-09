import { LOCATION_TYPE } from "@/config/constants";

export type ExerciseType = {
  id: number;
  name: string;
  value: string;
  isChecked: boolean;
  min: number;
  max: number;
};

export type FilterStatus = {
  benchPress: [number, number] | null;
  squat: [number, number] | null;
  deadLift: [number, number] | null;
  fitnessYears: [number, number] | null;
  gender: "MALE" | "FEMALE" | null;
  location: LOCATION_TYPE[] | null;
};

export type GenderType = "MALE" | "FEMALE" | null;
export type CheckedExercise = {
  benchPress: boolean;
  squat: boolean;
  deadLift: boolean;
};

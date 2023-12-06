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
  location: Location[] | null;
};

export type GenderType = "MALE" | "FEMALE" | null;
export type CheckedExercise = {
  benchPress: boolean;
  squat: boolean;
  deadLift: boolean;
};

export const locations = [
  "잠실",
  "송파",
  "성수",
  "삼성",
  "청담",
  "역삼",
  "대치",
  "개포",
] as const;

export type Location = (typeof locations)[number];

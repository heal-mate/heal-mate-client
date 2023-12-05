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

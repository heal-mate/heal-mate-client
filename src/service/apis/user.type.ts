export type User = {
  _id: string;
  email: string;
  tel: string;
  nickName: string;
  profileImageSrc: string;
  introduction: string;
  condition: Condition<"POINT">;
  conditionExpect: Condition<"RANGE">;
  matchIds: Array<string>;
};

export type Condition<T = "POINT"> = {
  benchPress: T extends "RANGE" ? [number, number] | null : number;
  squat: T extends "RANGE" ? [number, number] | null : number;
  deadLift: T extends "RANGE" ? [number, number] | null : number;
  fitnessYears: T extends "RANGE" ? [number, number] | null : number;
  gender: T extends "RANGE" ? "MALE" | "FEMALE" | null : "MALE" | "FEMALE";
  location: T extends "RANGE" ? Location[] | null : Location;
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

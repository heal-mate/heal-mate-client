export type User = {
  id: string;
  email: string;
  tel: string;
  nickName: string;
  profileImageSrc: string;
  introduction: string;
  condition: Condition<"POINT">;
  conditionExpect: Condition<"RANGE">;
  matchIds: Array<Match>;
};

export type Match = {
  id: string;
  userReceivedId: string;
  userSentId: string;
  status: MatchStatus;
  userReceivedDeletedAt: Date;
  userSentDeletedAt: Date;
};

export type MatchStatus = "WAITING" | "REJECTED" | "ACCEPTED";

export type Condition<T = "POINT"> = {
  benchPress: T extends "RANGE" ? [number, number] | null : number;
  squat: T extends "RANGE" ? [number, number] | null : number;
  deadLift: T extends "RANGE" ? [number, number] | null : number;
  fitnessYears: T extends "RANGE" ? [number, number] | null : number;
  gender: T extends "RANGE" ? "MALE" | "FEMAIL" | null : "MALE" | "FEMAIL";
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

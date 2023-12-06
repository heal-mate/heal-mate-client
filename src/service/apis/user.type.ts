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
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
  "영등포구",
  "용산구",
  "은평구",
  "종로구",
  "중구",
  "중랑구",
] as const;

export type Location = (typeof locations)[number];

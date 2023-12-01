export const LOCATION = [
  "잠실",
  "송파",
  "성수",
  "삼성",
  "청담",
  "역삼",
  "대치",
  "개포",
] as const;

export const GENDER = ["MALE", "FEMALE"] as const;

export const matchStatusDict = {
  waiting: "WAITING",
  rejected: "REJECTED",
  accepted: "ACCEPTED",
} as const;

export const MATCH_STATUS = Object.values(matchStatusDict);

export type MatchStatus = (typeof MATCH_STATUS)[number];

export const EXERCISE_LIST = [
  {
    id: 0,
    name: "벤치프레스",
    value: "benchPress",
    isChecked: true,
    min: 0,
    max: 300,
  },
  {
    id: 1,
    name: "스쿼트",
    value: "squat",
    isChecked: false,
    min: 0,
    max: 300,
  },
  {
    id: 2,
    name: "데드리프트",
    value: "deadLift",
    isChecked: false,
    min: 0,
    max: 300,
  },
];

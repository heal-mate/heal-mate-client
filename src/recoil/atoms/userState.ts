import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "user",
  storage: localStorage,
  converter: JSON,
});

export const userState = atom({
  key: "user",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

import { selector } from "recoil";
import { userState } from "../atoms/userState";
import { User as UserType } from "@/service/apis/user.type";

export const userSelector = selector<UserType>({
  key: "user",
  get: ({ get }) => {
    const data = get(userState);
    const result = data.user;
    return result;
  },
});

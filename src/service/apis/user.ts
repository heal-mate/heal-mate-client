import axios from "axios";
import { User } from "./user.type";
import { FilterStatus, GenderType } from "@/components/MatchFilter.type";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/users`,
  withCredentials: true,
});
export const fetchGetUser = async ({ userId }: { userId: string }) => {
  const res = await instance.get<User>(`/detail/${userId}`);

  return res.data;
};

export const fetchGetUsersRecommend = async () => {
  const res = await instance.get<User[]>(`/recommend`);

  return res.data;
};

export const changeUserConditionExpect = async (
  conditionExpect: FilterStatus,
) => {
  return instance.patch("/conditionExpect", conditionExpect);
};

export const fetchGetUserMine = async () => {
  const res = await instance.get<User>(`/mine`);

  return res.data;
};

export const fetchUpdateMe = async (userDetail: User) => {
  const res = await instance.patch(`/mine`, userDetail);

  return res.data;
};

export const fetchGetAuthCode = async (email: string) => {
  await instance.post("/getAuthMail", { email });
};

export const fetchCheckAuthCode = async ({
  email,
  authCode,
}: {
  email: string;
  authCode: string;
}) => {
  await instance.post("/checkAuthMail", { data: { email, authCode } });
};

export const fetchRegisterUser = async (
  user: Pick<User, "nickName" | "email" | "tel"> & {
    gender: GenderType;
    password: string;
  },
) => {
  const res = await instance.post("/register", user);
  return res.data;
};

export const fetchLoginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await instance.post("/login", { data: { email, password } });
  return res.data;
};

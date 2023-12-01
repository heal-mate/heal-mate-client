import axios from "axios";
import { User } from "./user.type";
import { FilterStatus } from "@/components/MatchFilter.type";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/users`,
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

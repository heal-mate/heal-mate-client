import axios from "axios";
import { User } from "./user.type";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/users`,
});

export const fetchGetUser = async ({ userId }: { userId: string }) => {
  const res = await instance.get<User>(`/detail/${userId}`);

  return res.data;
};

export const fetchGetUserRecommend = async () => {
  const res = await instance.get<User[]>(`/recommend`);

  return res.data;
};

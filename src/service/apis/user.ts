import axios from "axios";
import { User } from "./user.type";
import { FilterStatus } from "@/components/MatchFilter.type";

axios.defaults.withCredentials = true;
const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/users`,
  withCredentials: true,
});

const userAPI = {
  async getUser({ userId }: { userId: string }) {
    const res = await instance.get<User>(`/detail/${userId}`);

    return res.data;
  },

  async getUsersRecommend() {
    const res = await instance.get<User[]>(`/recommend`);

    return res.data;
  },

  async changeUserConditionExpect(conditionExpect: FilterStatus) {
    return instance.patch("/conditionExpect", conditionExpect);
  },

  async getUserMine() {
    const res = await instance.get<User>(`/mine`);

    return res.data;
  },

  async updateMe(userDetail: User) {
    const res = await instance.patch(`/mine`, userDetail);

    return res.data;
  },

  async sendWebPushToken(token: string) {
    console.log("TOKEN");
    console.log(token);
    return axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/webpush-token`,
      {
        token,
      },
    );
  },
};

export default userAPI;

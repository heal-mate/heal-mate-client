import axios from "axios";
import { User } from "./user.type";
import { GenderType } from "@/config/constants";

axios.defaults.withCredentials = true;
const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/auth`,
  withCredentials: true,
});

const authAPI = {
  async sendAuthCodeMail(email: string) {
    return instance.post("/auth-mail", { email });
  },

  async checkAuthCode({
    email,
    authCode,
  }: {
    email: string;
    authCode: string;
  }) {
    return instance.post("/check-auth-mail", { data: { email, authCode } });
  },

  async registerUser(
    user: Pick<User, "nickName" | "email" | "tel"> & {
      gender: GenderType;
      password: string;
    },
  ) {
    const res = await instance.post("/register", user);
    return res.data;
  },

  async loginUser({ email, password }: { email: string; password: string }) {
    const res = await instance.post("/login", { data: { email, password } });
    return res.data;
  },

  async logoutUser() {
    return instance.get("/logout");
  },

  async withdrawUser() {
    return instance.patch("/withdraw");
  },

  async checkUserAuth() {
    return instance.get("/is-valid-user");
  },
};

export default authAPI;

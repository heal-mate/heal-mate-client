import axios from "axios";

export const sendToken = (token: string) => {
  console.log("TOKEN");
  console.log(token);
  axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/webpush`, { token });
};

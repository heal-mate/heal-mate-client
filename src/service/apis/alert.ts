import axios from "axios";
import { Alert } from "./alert.type";

axios.defaults.withCredentials = true;
const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/alerts`,
  withCredentials: true,
});

const alertAPI = {
  async getAlerts() {
    const res = await instance.get<Alert[]>("/");

    return res.data;
  },

  async readAlert({ alertId }: { alertId: string }) {
    return instance.patch(`/read/${alertId}`);
  },

  async removeAlert({ alertIds }: { alertIds: string[] }) {
    return instance.delete(`/remove`, { data: { alertIds } });
  },
};

export default alertAPI;

import axios from "axios";
import { Match } from "./match.type";

axios.defaults.withCredentials = true;
const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/matches`,
  withCredentials: true,
});

const matchAPI = {
  async getMatchesReceived() {
    const res = await instance.get<Match[]>(`/received`);

    return res.data;
  },

  async getMatchesSent() {
    const res = await instance.get<Match[]>(`/sent`);

    return res.data;
  },

  async requestMatch({ userId }: { userId: string }) {
    return instance.post(`/request`, { userId });
  },

  async cancelMatch({ matchId }: { matchId: string }) {
    return instance.delete(`/cancel/${matchId}`);
  },

  async acceptMatch({ matchId }: { matchId: string }) {
    return instance.patch(`/accept/${matchId}`);
  },

  async rejectMatch({ matchId }: { matchId: string }) {
    return instance.patch(`/reject/${matchId}`);
  },
};

export default matchAPI;

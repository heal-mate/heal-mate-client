import axios from "axios";
import { Match } from "./match.type";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/matches`,
});

export const fetchGetMatchesReceived = async () => {
  const res = await instance.get<Match[]>(`/received`);

  return res.data;
};

export const fetchGetMatchesSent = async () => {
  const res = await instance.get<Match[]>(`/sent`);

  return res.data;
};

export const fetchRequestMatch = async ({ userId }: { userId: string }) =>
  instance.post(`/request`, { userId });

export const fetchCancelMatch = async ({ matchId }: { matchId: string }) =>
  instance.delete(`/cancel/${matchId}`);

export const fetchAcceptMatch = async ({ matchId }: { matchId: string }) =>
  instance.patch(`/accept/${matchId}`);

export const fetchRejectMatch = async ({ matchId }: { matchId: string }) =>
  instance.patch(`/reject/${matchId}`);

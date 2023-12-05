import { MatchStatus } from "@/config/constants";

type userInfo = {
  _id: string;
  nickName: string;
};

export type Alert = {
  _id: string;
  matchId: string;
  status: MatchStatus;
  isRead: boolean;
  createdAt: Date;
  senderId: userInfo;
  receiverId: userInfo;
};

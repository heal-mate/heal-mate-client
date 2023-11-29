export type Match = {
  _id: string;
  receiverId: string;
  senderId: string;
  status: MatchStatus;
  receiverDeleteAt: Date | null;
  senderDeleteAt: Date | null;
  updatedAt: Date;
};

export const matchStatusDict = {
  waiting: "WAITING",
  rejected: "REJECTED",
  accepted: "ACCEPTED",
} as const;

export type MatchStatus =
  (typeof matchStatusDict)[keyof typeof matchStatusDict];

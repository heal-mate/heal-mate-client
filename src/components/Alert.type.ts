export type Alert = {
  id: string;
  type: AlertType;
  nickName: string; //상대방 닉네임
  status: AlertStatus;
  isRead: boolean;
  createdAt: Date;
  deletedAt: Date | null;
};

export type AlertStatus = "WAITING" | "REJECTED" | "ACCEPTED";

export type AlertType = "RECEIVED" | "SENT";

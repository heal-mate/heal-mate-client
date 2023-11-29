const locations = [
  "잠실",
  "송파",
  "성수",
  "삼성",
  "청담",
  "역삼",
  "대치",
  "개포",
] as const;

type LocationCode = (typeof locations)[number];

type Chat = {
  id: string;
  nickName: string;
  profileImageSrc: string;
  location: LocationCode[];
  lastMessage: string;
  notifications: number;
  createdAt: Date;
  deletedAt: Date | null;
};

// TODO: data fetch되면 삭제
export const CHAT_MOCK_DATA = {
  data: [
    {
      id: "1",
      nickName: "User1",
      profileImageSrc: "/mock/image/ronnie.png",
      location: ["송파", "잠실"],
      lastMessage:
        "저의 운동능력 향상을 위해 최고의 운동 파트너가 필요합니다. 도와주실 수 있으실까요?",
      notifications: 3,
      createdAt: new Date(),
      deletedAt: null,
    },
    {
      id: "2",
      nickName: "User1",
      profileImageSrc: "/mock/image/ronnie.png",
      location: ["송파", "잠실"],
      lastMessage:
        "저의 운동능력 향상을 위해 최고의 운동 파트너가 필요합니다. 도와주실 수 있으실까요?",
      notifications: 3,
      createdAt: new Date(),
      deletedAt: null,
    },
    {
      id: "3",
      nickName: "User1",
      profileImageSrc: "/mock/image/ronnie.png",
      location: ["송파", "잠실"],
      lastMessage:
        "저의 운동능력 향상을 위해 최고의 운동 파트너가 필요합니다. 도와주실 수 있으실까요?",
      notifications: 3,
      createdAt: new Date(),
      deletedAt: null,
    },
    {
      id: "4",
      nickName: "User1",
      profileImageSrc: "/mock/image/ronnie.png",
      location: ["송파", "잠실"],
      lastMessage:
        "저의 운동능력 향상을 위해 최고의 운동 파트너가 필요합니다. 도와주실 수 있으실까요?",
      notifications: 3,
      createdAt: new Date(),
      deletedAt: null,
    },
    {
      id: "5",
      nickName: "User1",
      profileImageSrc: "/mock/image/ronnie.png",
      location: ["송파", "잠실"],
      lastMessage:
        "저의 운동능력 향상을 위해 최고의 운동 파트너가 필요합니다. 도와주실 수 있으실까요?",
      notifications: 3,
      createdAt: new Date(),
      deletedAt: null,
    },
    {
      id: "6",
      nickName: "User1",
      profileImageSrc: "/mock/image/ronnie.png",
      location: ["송파", "잠실"],
      lastMessage:
        "저의 운동능력 향상을 위해 최고의 운동 파트너가 필요합니다. 도와주실 수 있으실까요?",
      notifications: 3,
      createdAt: new Date(),
      deletedAt: null,
    },
  ] as Chat[] | undefined,
  error: null as null | { message: string },
  isLoading: false,
  isError: false,
};

import { CardItemProps } from "../src/components/Card.type";

// TODO: data fetch되면 삭제
export const CARD_MOCK_DATA = {
  data: [
    {
      nickName: "User1",
      profileImageSrc: "/mock/image/ronnie.png",
      introduction: "강남사는 22살 남 헬린이입니당 뿌잉뿌잉",
      condition: {
        benchPress: 100,
        squat: 150,
        deadLift: 200,
        fitnessYears: 2,
        gender: "MALE",
        location: "잠실",
      },
    },
    {
      nickName: "User2",
      profileImageSrc: "/mock/image/carthe.png",
      introduction: "Hello, I'm User2",
      condition: {
        benchPress: 120,
        squat: 180,
        deadLift: 220,
        fitnessYears: 3,
        gender: "FEMALE",
        location: "송파",
      },
    },
  ] as CardItemProps[] | undefined,
  error: null as null | { message: string },
  isLoading: false,
  isError: false,
};

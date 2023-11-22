import { Fragment } from "react";
import Card from "./Card";
import { CardItemProps, CardType } from "./CardItem";

export default function CardContainer({ type }: { type: CardType }) {
  // TODO: 추천 or 카드 리스트 data fetch
  const { data: cards, isError, isLoading, error } = DUMMY;

  return (
    <>
      {isLoading ? (
        <p>loading...</p>
      ) : isError ? (
        <p>Error: {error!.message}</p>
      ) : (
        cards!.map((card, i) => (
          <Fragment key={"CardItem" + i}>
            <Card.Item {...card} type={type} />
          </Fragment>
        ))
      )}
    </>
  );
}

// TODO: data fetch되면 삭제
const DUMMY = {
  data: [
    {
      nickName: "User1",
      profileImageSrc: "/",
      introduction: "Hello, I'm User1",
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
      profileImageSrc: "/",
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

import { User } from "./Card.type";
import Card from "./Card";

export type CardType = "RECEIVED" | "SENT";

export type CardItemProps = Pick<
  User,
  "id" | "nickName" | "profileImageSrc" | "condition" | "introduction"
> & { type: CardType };

export default function CardItem(props: CardItemProps) {
  const { id, nickName, profileImageSrc, introduction, condition, type } =
    props;
  const { location, benchPress, squat, deadLift, gender, fitnessYears } =
    condition;

  return (
    <>
      <div>{nickName}</div>
      <div>{introduction}</div>
      <img src={profileImageSrc} />
      <div>{location}</div>
      <div>{gender}</div>
      <div>운동 경력: {fitnessYears}년</div>
      <div>
        <div>벤치프레스:{benchPress}</div>
        <div>스쿼트:{squat}</div>
        <div>데드리프트:{deadLift}</div>
      </div>
      <Card.Buttons id={id} type={type} />
    </>
  );
}

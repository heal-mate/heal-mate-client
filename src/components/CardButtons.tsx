import { useMatching } from "./Card.hooks";
import { CardType } from "./CardItem";

export default function CardButtons(props: { id: string; type: CardType }) {
  const { id, type } = props;
  const {
    matchStatus,
    isLoading,
    isError,
    error,
    requestMatch,
    cancelMatch,
    acceptMatch,
    rejectMatch,
  } = useMatching(id);

  return (
    <>
      {isLoading ? (
        "loading..."
      ) : isError ? (
        error!.message
      ) : matchStatus === null ? (
        <button onClick={() => requestMatch()}>요청하기</button>
      ) : matchStatus === "WAITING" && type === "SENT" ? (
        <>
          <button onClick={() => cancelMatch()}>취소</button>
          <button disabled>수락대기중</button>
        </>
      ) : matchStatus === "WAITING" && type === "RECEIVED" ? (
        <>
          <button onClick={() => acceptMatch()}>수락</button>
          <button onClick={() => rejectMatch()}>거절</button>
        </>
      ) : matchStatus === "REJECTED" ? (
        <div>거절된 요청</div>
      ) : matchStatus === "ACCEPTED" ? (
        <div>성사된 요청</div>
      ) : null}
    </>
  );
}

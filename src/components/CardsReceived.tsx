import Cards from "./Cards";
import { useMatchesReceived } from "./Cards.hooks";

export default function CardsReceived() {
  const { matchesReceived, acceptMatch, rejectMatch, ...rest } =
    useMatchesReceived();

  return (
    <>
      <Cards
        matchUserInfos={matchesReceived?.map((e) => ({
          ...e,
          buttons: [
            {
              text: "수락하기",
              theme: "outlined",
              onClickCallback: async () => acceptMatch(e.id),
            },
            {
              text: "거절하기",
              theme: "contained",
              onClickCallback: async () => rejectMatch(e.id),
            },
          ],
        }))}
        {...rest}
      />
    </>
  );
}

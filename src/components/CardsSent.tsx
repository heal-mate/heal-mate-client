import Cards from "./Cards";
import { useMatchesSent } from "./Cards.hooks";

export default function CardsSent() {
  const { matchesSent, cancelMatch, ...rest } = useMatchesSent();

  return (
    <>
      <Cards
        matchUserInfos={matchesSent?.map((e) => ({
          ...e,
          buttons: [
            {
              text: "취소하기",
              theme: "outlined",
              onClickCallback: async () => cancelMatch({ matchId: e.matchId }),
            },
            {
              text: "요청응답대기",
              theme: "contained",
              disabled: true,
              onClickCallback: () => {
                return null;
              },
            },
          ],
        }))}
        {...rest}
      />
    </>
  );
}

import { matchStatusDict } from "@/service/apis/match.type";
import Cards from "./Cards";
import { useMatchesSent } from "./Cards.hooks";

export default function CardsSent() {
  const { matchesSent, cancelMatch, ...rest } = useMatchesSent();

  return (
    <>
      <Cards
        matchUserInfos={matchesSent?.map((e) => ({
          ...e,
          buttons:
            e.status === matchStatusDict.waiting
              ? [
                  {
                    text: "취소하기",
                    theme: "outlined",
                    onClickCallback: async () =>
                      cancelMatch({ matchId: e.matchId }),
                  },
                  {
                    text: "요청응답대기",
                    theme: "contained",
                    disabled: true,
                    onClickCallback: () => {
                      return null;
                    },
                  },
                ]
              : e.status === matchStatusDict.accepted
                ? [
                    {
                      text: "성사된 요청",
                      theme: "contained",
                      disabled: true,
                      onClickCallback: () => null,
                    },
                  ]
                : e.status === matchStatusDict.rejected
                  ? [
                      {
                        text: "거절된 요청",
                        theme: "contained",
                        disabled: true,
                        onClickCallback: () => null,
                      },
                    ]
                  : [],
        }))}
        {...rest}
      />
    </>
  );
}

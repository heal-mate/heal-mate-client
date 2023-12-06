import { matchStatusDict } from "@/service/apis/match.type";
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
          buttons:
            e.status === matchStatusDict.waiting
              ? [
                  {
                    text: "수락하기",
                    theme: "outlined",
                    onClickCallback: async () => {
                      acceptMatch({ matchId: e.matchId });
                    },
                  },
                  {
                    text: "거절하기",
                    theme: "contained",
                    onClickCallback: async () => {
                      rejectMatch({ matchId: e.matchId });
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

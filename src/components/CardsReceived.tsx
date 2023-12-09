import { MatchStatus, matchStatusDict } from "@/service/apis/match.type";
import Cards from "./Cards";
import { useMatchesReceived } from "./Cards.hooks";
import toast from "react-hot-toast";

export default function CardsReceived({
  currentFilter,
}: {
  currentFilter: MatchStatus | null;
}) {
  const { matchesReceived, acceptMatch, rejectMatch, ...rest } =
    useMatchesReceived();

  return (
    <>
      <Cards
        matchUserInfos={matchesReceived
          ?.filter((card) => {
            if (currentFilter === null) return true;
            if (card.status === currentFilter) return true;
          })
          ?.map((e) => ({
            ...e,
            buttons:
              e.status === matchStatusDict.waiting
                ? [
                    {
                      text: "수락하기",
                      theme: "outlined",
                      onClickCallback: async () => {
                        return acceptMatch({ matchId: e.matchId });
                      },
                    },
                    {
                      text: "거절하기",
                      theme: "contained",
                      onClickCallback: async () => {
                        return rejectMatch({ matchId: e.matchId });
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
                      {
                        text: "연락하기",
                        theme: "contained",
                        disabled: true,
                        onClickCallback: async () => {
                          try {
                            await navigator.clipboard.writeText(e.kakaoID);
                            toast.success(
                              "상대방의 카카오톡 아이디가\n클립보드에 복사되었습니다.",
                            );
                          } catch (e) {
                            toast.error("복사에 실패하였습니다");
                          }
                        },
                      },
                    ]
                  : e.status === matchStatusDict.rejected
                    ? [
                        {
                          text: "거절된 요청",
                          theme: "contained",
                          disabled: true,
                          onClickCallback: async () => null,
                        },
                      ]
                    : [],
          }))}
        {...rest}
      />
    </>
  );
}

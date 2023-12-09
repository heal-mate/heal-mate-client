import { MatchStatus, matchStatusDict } from "@/service/apis/match.type";
import Cards from "./Cards";
import { useMatchesSent } from "./Cards.hooks";
import toast from "react-hot-toast";

export default function CardsSent({
  currentFilter,
}: {
  currentFilter: MatchStatus | null;
}) {
  const { matchesSent, cancelMatch, ...rest } = useMatchesSent();
  console.log(matchesSent);

  return (
    <>
      <Cards
        matchUserInfos={matchesSent
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
                      text: "취소하기",
                      theme: "outlined",
                      onClickCallback: async () => {
                        return cancelMatch({ matchId: e.matchId });
                      },
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
                      {
                        text: "연락하기",
                        theme: "contained",
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

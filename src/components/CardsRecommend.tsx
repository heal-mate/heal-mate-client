import { User } from "@/service/apis/match.type";
import Cards from "./Cards";
import { useMatchesRecommend } from "./Cards.hooks";

export default function CardsRecommend({
  conditionExpect,
}: {
  conditionExpect: User["conditionExpect"];
}) {
  const { matchesRecommend, requestMatch, ...rest } =
    useMatchesRecommend(conditionExpect);

  return (
    <>
      <Cards
        matchUserInfos={matchesRecommend?.map((e) => ({
          ...e,
          buttons: [
            {
              text: "요청하기",
              theme: "outlined",
              onClickCallback: async () => requestMatch(e.id),
            },
          ],
        }))}
        {...rest}
      />
    </>
  );
}

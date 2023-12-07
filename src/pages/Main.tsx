import CardsSent from "@/components/CardsSent";
import CardsRecommend from "@/components/CardsRecommend";
import { StyledCardsContainer } from "@/components/Cards.styles";
import FilterButtons from "@/components/FilterButtons";
import { useEffect, useState } from "react";
import { getFirebaseToken } from "@/service/store/firebase";
import userAPI from "@/service/apis/user";
import { MatchStatus } from "@/service/apis/match.type";

export default function Main() {
  const [currentFilter, setCurrentFilter] = useState<MatchStatus | null>(null);

  useEffect(() => {
    getFirebaseToken().then((e) => {
      return userAPI.sendWebPushToken(e);
    });
  }, []);

  const handleCheckeFilter = (filter: MatchStatus | null) => {
    setCurrentFilter(filter);
  };
  return (
    <>
      <FilterButtons type="main" handleCheckeFilter={handleCheckeFilter} />
      <StyledCardsContainer>
        {currentFilter === null && <CardsRecommend />}
        {currentFilter && <CardsSent currentFilter={currentFilter} />}
      </StyledCardsContainer>
    </>
  );
}

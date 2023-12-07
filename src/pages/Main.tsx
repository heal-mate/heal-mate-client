import CardsSent from "@/components/CardsSent";
import CardsRecommend from "@/components/CardsRecommend";
import { StyledCardsContainer } from "@/components/Cards.styles";
import FilterButtons from "@/components/FilterButtons";
import { useEffect, useState } from "react";
import { getFirebaseToken } from "@/service/store/firebase";
import { fetchSendWebPushToken } from "@/service/apis/user";

export default function Main() {
  const [matchStatus, setMatchStatus] = useState("DEFAULT");

  useEffect(() => {
    getFirebaseToken().then((e) => {
      return fetchSendWebPushToken(e);
    });
  }, []);

  const handleCheckeFilter = (filter: string) => {
    setMatchStatus(filter);
  };
  return (
    <>
      <FilterButtons type="main" handleCheckeFilter={handleCheckeFilter} />
      <StyledCardsContainer>
        {matchStatus === "DEFAULT" && <CardsRecommend />}
        {matchStatus !== "DEFAULT" && <CardsSent matchStatus={matchStatus} />}
      </StyledCardsContainer>
    </>
  );
}

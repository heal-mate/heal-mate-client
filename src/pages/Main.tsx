import CardsRecommend from "@/components/CardsRecommend";
import { StyledCardsContainer } from "@/components/Cards.styles";
import { useEffect } from "react";
import { getFirebaseToken } from "@/service/store/firebase";
import { fetchSendWebPushToken } from "@/service/apis/user";
import MatchFilterButton from "@/components/MatchFilterButton";

export default function Main() {
  useEffect(() => {
    getFirebaseToken().then((e) => {
      return fetchSendWebPushToken(e);
    });
  }, []);

  return (
    <>
      <StyledCardsContainer>
        <MatchFilterButton />
        <CardsRecommend />
      </StyledCardsContainer>
    </>
  );
}

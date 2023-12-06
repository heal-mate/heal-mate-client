import CardsSent from "@/components/CardsSent";
import CardsRecommend from "@/components/CardsRecommend";
import { StyledCardsContainer } from "@/components/Cards.styles";
import FilterButtons from "@/components/FilterButtons";
import { useEffect } from "react";
import { getFirebaseToken } from "@/service/store/firebase";
import { fetchSendWebPushToken } from "@/service/apis/user";

export default function Main() {
  useEffect(() => {
    getFirebaseToken().then((e) => {
      return fetchSendWebPushToken(e);
    });
  }, []);
  return (
    <>
      <FilterButtons type="main" />
      <StyledCardsContainer>
        <CardsRecommend />
        <CardsSent />
      </StyledCardsContainer>
    </>
  );
}

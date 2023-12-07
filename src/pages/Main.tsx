import CardsSent from "@/components/CardsSent";
import CardsRecommend from "@/components/CardsRecommend";
import { StyledCardsContainer } from "@/components/Cards.styles";
import FilterButtons from "@/components/FilterButtons";
import { useEffect } from "react";
import { getFirebaseToken } from "@/service/store/firebase";
import userAPI from "@/service/apis/user";

export default function Main() {
  useEffect(() => {
    getFirebaseToken().then((e) => {
      return userAPI.sendWebPushToken(e);
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

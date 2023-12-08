import CardsRecommend from "@/components/CardsRecommend";
import { StyledCardsContainer } from "@/components/Cards.styles";
import { useEffect } from "react";
import { getFirebaseToken } from "@/service/store/firebase";
import userAPI from "@/service/apis/user";
import MatchFilterButton from "@/components/MatchFilterButton";

export default function Main() {
  useEffect(() => {
    getFirebaseToken().then((e) => {
      return userAPI.sendWebPushToken(e);
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

import CardsSent from "@/components/CardsSent";
import { MOCK_LOGIN_USER } from "../../mock/UserData";
import CardsRecommend from "@/components/CardsRecommend";
import { StyledCardsContainer } from "@/components/Cards.styles";

export default function Main() {
  const { conditionExpect } = MOCK_LOGIN_USER;

  return (
    <>
      <StyledCardsContainer>
        <CardsRecommend conditionExpect={conditionExpect} />
        <CardsSent />
      </StyledCardsContainer>
    </>
  );
}

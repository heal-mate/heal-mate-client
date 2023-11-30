import CardsSent from "@/components/CardsSent";
import CardsRecommend from "@/components/CardsRecommend";
import { StyledCardsContainer } from "@/components/Cards.styles";
import FilterButtons from "@/components/FilterButtons";

export default function Main() {
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

import { StyledCardsContainer } from "@/components/Cards.styles";
import CardsReceived from "@/components/CardsReceived";
import FilterButtons from "@/components/FilterButtons";

export default function Received() {
  return (
    <>
      <FilterButtons type="received" />
      <StyledCardsContainer>
        <CardsReceived />
      </StyledCardsContainer>
    </>
  );
}

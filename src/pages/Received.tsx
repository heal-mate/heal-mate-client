import { StyledCardsContainer } from "@/components/Cards.styles";
import CardsReceived from "@/components/CardsReceived";
import FilterButtons from "@/components/FilterButtons";
import { MatchStatus } from "@/service/apis/match.type";
import { useState } from "react";

export default function Received() {
  const [currentFilter, setCurrentFilter] = useState<MatchStatus | null>(null);

  const handleCheckeFilter = (filter: MatchStatus | null) => {
    setCurrentFilter(filter);
  };
  return (
    <>
      <FilterButtons type="received" handleCheckeFilter={handleCheckeFilter} />
      <StyledCardsContainer>
        <CardsReceived currentFilter={currentFilter} />
      </StyledCardsContainer>
    </>
  );
}

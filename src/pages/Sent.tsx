import { StyledCardsContainer } from "@/components/Cards.styles";
import CardsSent from "@/components/CardsSent";
import FilterButtons from "@/components/FilterButtons";
import { MatchStatus } from "@/service/apis/match.type";
import { useState } from "react";

export default function Sent() {
  const [currentFilter, setCurrentFilter] = useState<MatchStatus | null>(null);

  const handleCheckeFilter = (filter: MatchStatus | null) => {
    setCurrentFilter(filter);
  };
  return (
    <>
      <FilterButtons type="sent" handleCheckeFilter={handleCheckeFilter} />
      <StyledCardsContainer>
        <CardsSent currentFilter={currentFilter} />
      </StyledCardsContainer>
    </>
  );
}

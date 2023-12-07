import { StyledCardsContainer } from "@/components/Cards.styles";
import CardsReceived from "@/components/CardsReceived";
import FilterButtons from "@/components/FilterButtons";
import { useState } from "react";

export default function Received() {
  const [matchStatus, setMatchStatus] = useState("DEFAULT");

  const handleCheckeFilter = (filter: string) => {
    setMatchStatus(filter);
  };
  return (
    <>
      <FilterButtons type="received" handleCheckeFilter={handleCheckeFilter} />
      <StyledCardsContainer>
        <CardsReceived matchStatus={matchStatus} />
      </StyledCardsContainer>
    </>
  );
}

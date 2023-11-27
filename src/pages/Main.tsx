import CardsSent from "@/components/CardsSent";
import { MOCK_LOGIN_USER } from "../../mock/UserData";
import CardsRecommend from "@/components/CardsRecommend";
import { StyledCardsContainer } from "@/components/Cards.styles";
import { StyledButtonBox, StyledButton } from "@/components/FilterButton.style";
import MatchFilterButton from "@/components/MatchFilterButton";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";
import { CiNoWaitingSign } from "react-icons/ci";
import { TbProgress } from "react-icons/tb";

export default function Main() {
  const { conditionExpect } = MOCK_LOGIN_USER;

  return (
    <>
      <StyledButtonBox>
        {/* 메이트 조건 설정 */}
        <MatchFilterButton />
        <StyledButton>
          <AiOutlineLoading3Quarters />
          요청대기
        </StyledButton>
        <StyledButton>
          <TbProgress />
          요청중
        </StyledButton>
        <StyledButton>
          <CiNoWaitingSign />
          요청거절
        </StyledButton>
        <StyledButton>
          <CiCircleCheck />
          매칭완료
        </StyledButton>
      </StyledButtonBox>
      <StyledCardsContainer>
        <CardsRecommend conditionExpect={conditionExpect} />
        <CardsSent />
      </StyledCardsContainer>
    </>
  );
}

import Card from "@/components/Card";
import { StyledButtonBox, StyledButton } from "@/components/FilterButton.style";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";
import { CiNoWaitingSign } from "react-icons/ci";

export default function Received() {
  return (
    <>
      <StyledButtonBox>
        <StyledButton>
          <AiOutlineLoading3Quarters />
          응답 대기중
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
      <Card type="RECEIVED" />
    </>
  );
}

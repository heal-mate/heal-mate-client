import Card from "@/components/Card";
import { StyledButtonBox, StyledButton } from "@/components/FilterButton.style";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";
import { CiNoWaitingSign } from "react-icons/ci";
import { TbProgress } from "react-icons/tb";

export default function Main() {
  return (
    <>
      <StyledButtonBox>
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
      <Card type="SENT" />
    </>
  );
}

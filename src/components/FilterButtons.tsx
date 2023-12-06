import MatchFilterButton from "@/components/MatchFilterButton";
import { StyledButtonBox, StyledButton } from "./FilterButtons.styles";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";
import { CiNoWaitingSign } from "react-icons/ci";
import { TbProgress } from "react-icons/tb";

const MAIN_FILTER = [
  {
    name: "요청대기",
    icon: <AiOutlineLoading3Quarters />,
  },
  {
    name: "요청중",
    icon: <TbProgress />,
  },
  {
    name: "요청거절",
    icon: <CiNoWaitingSign />,
  },
  {
    name: "매칭완료",
    icon: <CiCircleCheck />,
  },
];

const RECEIVED_FILTER = [
  {
    name: "응답 대기중",
    icon: <AiOutlineLoading3Quarters />,
  },
  {
    name: "요청거절",
    icon: <CiNoWaitingSign />,
  },
  {
    name: "매칭완료",
    icon: <CiCircleCheck />,
  },
];

export default function FilterButtons({ type }: { type: string }) {
  const filters = type === "main" ? MAIN_FILTER : RECEIVED_FILTER;
  return (
    <>
      <StyledButtonBox>
        {/* 메이트 조건 설정 */}
        {type === "main" && <MatchFilterButton />}

        {filters!.map((filter, index) => (
          <StyledButton key={"filter" + index}>
            {filter.icon}
            {filter.name}
          </StyledButton>
        ))}
      </StyledButtonBox>
    </>
  );
}

import { StyledButtonBox, StyledButton } from "./FilterButtons.styles";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";
import { CiNoWaitingSign } from "react-icons/ci";
import { TbProgress } from "react-icons/tb";
import { MatchStatus } from "@/service/apis/match.type";
import { matchStatusDict } from "@/config/constants";

const SENT_FILTER = [
  {
    name: "모두보기",
    value: null,
    icon: <TbProgress />,
  },
  {
    name: "요청중",
    value: matchStatusDict.waiting,
    icon: <TbProgress />,
  },
  {
    name: "요청거절",
    value: matchStatusDict.rejected,
    icon: <CiNoWaitingSign />,
  },
  {
    name: "매칭완료",
    value: matchStatusDict.accepted,
    icon: <CiCircleCheck />,
  },
];

const RECEIVED_FILTER = [
  {
    name: "모두보기",
    value: null,
    icon: <AiOutlineLoading3Quarters />,
  },
  {
    name: "응답 대기중",
    value: matchStatusDict.waiting,
    icon: <AiOutlineLoading3Quarters />,
  },
  {
    name: "요청거절",
    value: matchStatusDict.rejected,
    icon: <CiNoWaitingSign />,
  },
  {
    name: "매칭완료",
    value: matchStatusDict.accepted,
    icon: <CiCircleCheck />,
  },
];

export default function FilterButtons({
  type,
  handleCheckeFilter,
}: {
  type: string;
  handleCheckeFilter: (filter: MatchStatus | null) => void;
}) {
  const filters = type === "sent" ? SENT_FILTER : RECEIVED_FILTER;
  return (
    <>
      <StyledButtonBox>
        {filters!.map((filter, index) => (
          <StyledButton
            key={"filter" + index}
            onClick={() => handleCheckeFilter(filter.value)}
          >
            {filter.icon}
            {filter.name}
          </StyledButton>
        ))}
      </StyledButtonBox>
    </>
  );
}

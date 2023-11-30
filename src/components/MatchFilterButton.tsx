import { useState, useEffect } from "react";
import { styled, css } from "styled-components";
import { StyledButton } from "@/components/FilterButtons.styles";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import MatchFilter from "./MatchFilter";
import scrollBlock from "@/utils/scrollBlock";

export default function MatchFilterButton() {
  const [isShowFilter, setIsShowFilter] = useState<boolean>(false);

  const handleClick = () => {
    setIsShowFilter((prev) => !prev);
  };

  //alert창 띄었을 때 외부화면 스크롤 막기
  useEffect(() => {
    scrollBlock(isShowFilter);
  }, [isShowFilter]);

  return (
    <>
      <StyledButton onClick={handleClick}>
        <PiSlidersHorizontalLight />
        메이트찾기
      </StyledButton>
      <StyledMatchFilter $isShowFilter={isShowFilter}>
        <StyledMatchFilterHeader>
          <StyledMatchFilterInner>
            <div>
              <StyledIoIosArrowBack onClick={handleClick} />
              <StyledTitle>메이트 조건 설정</StyledTitle>
            </div>
            <span>완료</span>
          </StyledMatchFilterInner>
        </StyledMatchFilterHeader>
        <MatchFilter />
      </StyledMatchFilter>
    </>
  );
}

const StyledMatchFilter = styled.div<{ $isShowFilter: boolean }>`
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100%;
  z-index: 888;
  background-color: #fff;
  transition: right 0.2s ease-in-out;
  overflow-y: auto;
  ${(props) =>
    props.$isShowFilter &&
    css`
      transition: right 0.2s ease-in-out;
      right: 0;
    `}
`;

const StyledMatchFilterHeader = styled.div`
  border-bottom: 0.0625rem solid #f2f2f2;
  width: 100%;
  height: ${({ theme }) => theme.size.headerHeight}px;
  background-color: #fff;
  position: sticky;
  z-index: 1000;
  top: 0;
  left: 0;
`;

const StyledMatchFilterInner = styled.div`
  width: 85%;
  height: 100%;
  margin: 0 auto;
  padding: 0.75rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: ${({ theme }) => `${theme.size.maxWidth}px`};
    svg {
      cursor: pointer;
      transform: translate(-4px, 1px);
    }
  }
  span {
    cursor: pointer;
    font-size: 0.875rem;
    color: #323232;
  }
`;

const StyledTitle = styled.h2`
  font-weight: bold;
  color: #323232;
  cursor: default;
`;

const StyledIoIosArrowBack = styled(IoIosArrowBack)`
  font-size: 20px;
`;

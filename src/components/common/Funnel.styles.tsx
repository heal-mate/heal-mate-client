import { SlArrowLeft } from "react-icons/sl";
import styled from "styled-components";

export const FunnelStyle = {
  Container: styled.div`
    font-size: 1.125rem;
    // Container의 첫번째 자식 컴포넌트는 fixed된 StageHeader임
    // 두번째 자식 컴포넌트에 fixed된 StageHeader의 높이만큼 margin-top을 부여
    & > *:nth-child(2) {
      margin-top: ${({ theme }) => theme.size.headerHeight}px;
    }
  `,

  StageHeaderWrapper: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    border-bottom: 0.0625rem solid #f2f2f2;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: ${({ theme }) => theme.size.headerHeight}px;
  `,
  StageHeader: styled.div`
    width: 100%;
    max-width: ${({ theme }) => theme.size.maxWidth}px;
  `,

  ArrowBackIcon: styled(SlArrowLeft)`
    font-size: 1rem;
    margin: 0px 1rem;
    cursor: pointer;
  `,
};

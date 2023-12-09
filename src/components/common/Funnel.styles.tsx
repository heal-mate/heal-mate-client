import { SlArrowLeft } from "react-icons/sl";
import styled from "styled-components";

export const FunnelStyle = {
  Container: styled.div`
    font-size: 1.125rem;
    & > *:nth-child(2) {
      margin-top: ${({ theme }) => theme.size.headerHeight}px;
    }
  `,
  StageHeader: styled.div`
    border-bottom: 0.0625rem solid #f2f2f2;
    width: 100%;
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    height: ${({ theme }) => theme.size.headerHeight}px;
  `,

  ArrowBackIcon: styled(SlArrowLeft)`
    font-size: 1rem;
    margin: 0px 1rem;
    cursor: pointer;
  `,
};

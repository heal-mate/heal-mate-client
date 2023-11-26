import { styled } from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <Header />
      <StyledMain>
        <Outlet />
      </StyledMain>
      <Navbar />
    </>
  );
}

const StyledMain = styled.main`
  width: 100%;
  max-width: ${({ theme }) => `${theme.size.maxWidth}px`};
  margin: 3.5rem auto 65px;
`;

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
  width: 85%;
  max-width: 768px;
  margin-top: 3.5rem;
  margin-bottom: 65px;
  margin-left: auto;
  margin-right: auto;
`;

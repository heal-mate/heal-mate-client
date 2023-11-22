import { styled } from "styled-components";
import { GoBell } from "react-icons/go";

export default function Header() {
  return (
    <>
      <StyledHeader>
        <StyledLogo>
          <a href="/">Heath Friends</a>
        </StyledLogo>
        <StyledAlert>
          <GoBell size="20" />
        </StyledAlert>
      </StyledHeader>
    </>
  );
}

const StyledHeader = styled.header`
  /* border-bottom: 0.0625rem solid ${({ theme }) => theme.colors.point}; */
  border-bottom: 0.0625rem solid #f2f2f2;
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 3.5rem;
  padding: 0.75rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  background-color: #fff;
`;

const StyledLogo = styled.h1`
  width: 100%;
  max-width: 33.33333%;
  height: 1.625rem;
  display: flex;
  align-items: center;
  a {
    text-decoration: none;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.point};
    text-shadow: 0.6px 0.6px 0.6px gray;
  }
`;

const StyledAlert = styled.section`
  position: relative;
  cursor: pointer;
  &:after {
    display: block;
    content: "";
    position: absolute;
    top: -2px;
    right: -2px;
    width: 0.375rem;
    height: 0.375rem;
    border-radius: 50%;
    background-color: #ff3131;
  }
`;

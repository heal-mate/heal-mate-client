import { styled } from "styled-components";
import { GoBell } from "react-icons/go";
import logo from "../../assets/images/logo.png";

export default function Header() {
  return (
    <>
      <StyledHeader>
        <StyledInner>
          <StyledLogo>
            <a href="/">
              <img src={logo} alt="logo" />
            </a>
          </StyledLogo>
          <StyledAlert>
            <GoBell size="24" />
          </StyledAlert>
        </StyledInner>
      </StyledHeader>
    </>
  );
}

const StyledHeader = styled.header`
  border-bottom: 0.0625rem solid #f2f2f2;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 3.5rem;
  background-color: #fff;
`;
const StyledInner = styled.div`
  width: 85%;
  height: 100%;
  margin: 0 auto;
  padding: 0.75rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${({ theme }) => theme.size.maxWidth};
`;

const StyledLogo = styled.h1`
  width: 100%;
  max-width: 33.33333%;
  height: 100%;
  display: flex;
  align-items: center;
  a {
    text-decoration: none;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.point};
    font-size: 18px;
    display: inline-block;
    width: 100%;
    height: 100%;
    img {
      height: 100%;
      object-fit: contain;
    }
  }
`;

const StyledAlert = styled.section`
  position: relative;
  cursor: pointer;
  height: 1.625rem;
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

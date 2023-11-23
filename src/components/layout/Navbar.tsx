import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { GoHome } from "react-icons/go";
import { LuUser } from "react-icons/lu";
import { path } from "../../App";
import { MdMailOutline } from "react-icons/md";

export default function Navbar() {
  return (
    <StyledNav>
      <ul>
        <StyledList>
          <NavLink to={path.root}>
            <GoHome size="24" />
            <span>홈</span>
          </NavLink>
        </StyledList>
        <StyledList>
          <NavLink to={path.tab1}>
            <MdMailOutline size="24" />
            <span>받은 요청</span>
          </NavLink>
        </StyledList>
        <StyledList>
          <NavLink to={path.tab2}>
            <LuUser size="24" />
            <span>마이페이지</span>
          </NavLink>
        </StyledList>
      </ul>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  border-top: 0.0625rem solid #f2f2f2;
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 65px;
  left: 0;
  bottom: 0;
  padding: 0.75rem 0;
  background-color: #fff;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.2);
  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 85%;
    max-width: ${({ theme }) => theme.size.maxWidth};
    margin: auto;
  }
`;

const StyledList = styled.li`
  width: 20%;
  a {
    text-decoration: none;
    color: #00000096;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    span {
      color: gray;
    }
    &.active {
      color: ${({ theme }) => theme.colors.point};
      transition: color 0.3s ease-in-out;
      span {
        transition: color 0.3s ease-in-out;
        color: ${({ theme }) => theme.colors.point};
      }
    }
  }
`;

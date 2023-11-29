import { styled, css } from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { path } from "@/App";
import { GoBell } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import logo from "../../assets/images/logo.png";
import { ALERT_MOCK_DATA } from "../../../mock/AlertMockData";
import { Alert } from "../Alert.type";
import scrollBlock from "@/utils/scrollBlock";

export default function Header() {
  const { data: alerts } = ALERT_MOCK_DATA;
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);

  const handleClick = () => {
    setIsShowAlert((prev) => !prev);
  };

  //alert창 띄었을 때 외부화면 스크롤 막기
  useEffect(() => {
    scrollBlock(isShowAlert);
  }, [isShowAlert]);

  return (
    <>
      <StyledHeader>
        <StyledInner>
          <StyledLogo>
            <a href="/">
              <img src={logo} alt="logo" />
            </a>
          </StyledLogo>
          <StyledBell onClick={handleClick} $isOn={alerts?.length === 0}>
            <GoBell size="24" />
          </StyledBell>
        </StyledInner>
      </StyledHeader>
      {/* Alert Component */}
      <AlertBox isShowAlert={isShowAlert} handleClick={handleClick} />
    </>
  );
}

function AlertBox(props: { isShowAlert: boolean; handleClick: () => void }) {
  // TODO: 알람 메시지 리스트 data fetch
  const { data: alerts, isError, isLoading, error } = ALERT_MOCK_DATA;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const alertRef = useRef<HTMLUListElement>(null);
  const { isShowAlert, handleClick } = props;

  //alert items 삭제모드 전환
  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  //alert창 띄울 때 scroll 맨 위로 이동시키기
  useEffect(() => {
    if (isShowAlert && alertRef?.current?.scrollTop) {
      alertRef.current.scrollTop = 0;
    }
  }, [isShowAlert]);

  return (
    <StyledAlert $isShowAlert={isShowAlert}>
      <StyledAlertHeader>
        <StyledAlertInner>
          <div>
            <IoIosArrowBack size="20" onClick={handleClick} />
            <StyledTitle>알림</StyledTitle>
          </div>
          <span onClick={handleEdit}>{isEdit ? "완료" : "편집"}</span>
        </StyledAlertInner>
      </StyledAlertHeader>
      <ul ref={alertRef}>
        {isLoading ? (
          <p>loading...</p>
        ) : isError ? (
          <p>Error: {error!.message}</p>
        ) : (
          alerts!.map((alert) => (
            <AlertItem
              key={alert.id}
              {...alert}
              isEdit={isEdit}
              handleClick={handleClick}
            />
          ))
        )}
      </ul>
    </StyledAlert>
  );
}

function AlertItem(
  props: Alert & { isEdit: boolean; handleClick: () => void },
) {
  const navigate = useNavigate();
  const { type, nickName, status, isRead, isEdit, handleClick } = props;

  //메시지 클릭시 화면 전환
  const handleMessageClick = () => {
    if (isEdit) return;
    handleClick(); //알람 모달 화면 사라지게 하기
    navigate(type === "SENT" ? path.root : path.tab1);
  };

  return (
    <StyledList $isRead={isRead}>
      <section onClick={handleMessageClick}>
        <div className="noti-header">
          <b>알림</b>
          {isEdit && <IoClose size="20" color="#737373" />}
        </div>
        <div>
          {type === "SENT" && status === "REJECTED" && (
            <h4>{nickName}님이 요청을 거절하였습니다.</h4>
          )}
          {type === "SENT" && status === "ACCEPTED" && (
            <h4>{nickName}님이 요청을 수락하였습니다.</h4>
          )}
          {type === "RECEIVED" && status === "WAITING" && (
            <h4>{nickName}님이 메이트 요청을 보냈습니다.</h4>
          )}
        </div>
        {/* createdAt 활용 */}
        <span>31분 전</span>
      </section>
    </StyledList>
  );
}

const StyledHeader = styled.header`
  border-bottom: 0.0625rem solid #f2f2f2;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: ${({ theme }) => theme.size.headerHeight}px;
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
  max-width: ${({ theme }) => `${theme.size.maxWidth}px`};
  svg {
    cursor: pointer;
  }
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

const StyledBell = styled.section<{ $isOn: boolean }>`
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
    ${(props) =>
      props.$isOn &&
      css`
        display: none;
      `}
  }
`;

const StyledAlert = styled.div<{ $isShowAlert: boolean }>`
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: #fff;
  transition: right 0.2s ease-in-out;
  ul {
    width: 100%;
    height: calc(100% - 3.5rem);
    max-width: ${({ theme }) => `${theme.size.maxWidth}px`};
    margin: 0 auto;
    overflow-y: auto;
  }
  ${(props) =>
    props.$isShowAlert &&
    css`
      transition: right 0.2s ease-in-out;
      right: 0;
    `}
`;

const StyledAlertHeader = styled.div`
  border-bottom: 0.0625rem solid #f2f2f2;
  width: 100%;
  height: ${({ theme }) => theme.size.headerHeight}px;
  background-color: #fff;
  position: sticky;
  top: 0;
  left: 0;
`;

const StyledAlertInner = styled.div`
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

const StyledList = styled.li<{ $isRead: boolean }>`
  background-color: #fff;
  padding: 1rem 0;
  border-bottom: 0.0625rem solid #f2f2f2;
  cursor: pointer;
  position: relative;
  width: 85%;
  margin: 0 auto;
  &:hover {
    svg {
      fill: ${({ theme }) => theme.colors.point};
    }
  }
  &:last-child {
    border-bottom: 0;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
    h4 {
      font-weight: bold;
      color: #323232;
    }
    &.noti-header {
      margin-bottom: 0.6rem;
      b {
        display: inline-block;
        background-color: #eafaf9;
        color: ${({ theme }) => theme.colors.point};
        width: 2rem;
        height: 1.375rem;
        font-size: 0.625rem;
        line-height: 1.375rem;
        border-radius: 11px;
        text-align: center;
        font-weight: bold;
      }
    }

    ${(props) =>
      props.$isRead &&
      css`
        h4 {
          color: gray;
        }
        &.noti-header {
          b {
            background-color: #f1f1f1;
            color: gray;
          }
        }
      `}
  }
  span {
    color: #737373;
    font-size: 0.65rem;
  }
`;

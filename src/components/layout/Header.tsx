import { styled, css, keyframes } from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { path } from "@/App";
import { GoBell } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import logo from "../../assets/images/logo.png";
import { Alert } from "@/service/apis/alert.type";
import scrollBlock from "@/utils/scrollBlock";
import { useGetAlertsAll } from "../Alert.hooks";
import { AxiosResponse } from "axios";

const user = {
  profileImageSrc:
    "http://res.cloudinary.com/djq2j6rkq/image/upload/v1701864855/qp6bcep6guvesmf2ywhg.jpg",
};

export default function Header() {
  const { alertsList } = useGetAlertsAll();
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  // 프로필 클릭 토글
  const [menuToggle, setMenuToggle] = useState(true);

  const handleClick = () => {
    setIsShowAlert((prev) => !prev);
  };

  // 아직 안읽은 알람이 있는지 확인
  const hasUnreadAlerts = alertsList?.filter((alert) => alert.isRead === false)
    .length as number;

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
          <StyledIcons>
            <StyledBell
              onClick={handleClick}
              $isOn={hasUnreadAlerts > 0 ? true : false}
            >
              <StyledGoBell />
            </StyledBell>
            {user && (
              <StyledProfile onClick={() => setMenuToggle((prev) => !prev)}>
                <img src={user.profileImageSrc} alt="프로필 이미지" />
              </StyledProfile>
            )}
            {menuToggle && (
              <StyledMenuList>
                <div className="menu">로그아웃</div>
                <div className="menu warning">회원탈퇴</div>
              </StyledMenuList>
            )}
          </StyledIcons>
        </StyledInner>
      </StyledHeader>
      {/* Alert Component */}
      <AlertBox isShowAlert={isShowAlert} handleClick={handleClick} />
    </>
  );
}

function AlertBox(props: { isShowAlert: boolean; handleClick: () => void }) {
  // TODO: 알람 메시지 리스트 data fetch
  const { alertsList: data, readAlert, removeAlert } = useGetAlertsAll();
  const [alertsList, setAlertsList] = useState<Alert[]>();
  const removedAlertsIds = useRef<string[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const alertRef = useRef<HTMLUListElement>(null);
  const { isShowAlert, handleClick } = props;

  //alert창 띄울 때 scroll 맨 위로 이동시키기
  useEffect(() => {
    if (isShowAlert && alertRef?.current?.scrollTop) {
      alertRef.current.scrollTop = 0;
    }
  }, [isShowAlert]);

  // 알람 리스트 초기 세팅
  useEffect(() => {
    setAlertsList(data);
  }, [data]);

  // alert items 삭제하기
  const handleRemove = (alertId: string) => {
    setAlertsList((list) => list?.filter((item) => item._id !== alertId));
    removedAlertsIds.current.push(alertId);
  };

  //알람 편집모드 시작
  const handleEdit = () => {
    if (alertsList?.length === 0) return; //편집할 알람이 없으면 편집모드작동X

    setIsEdit(true);
  };

  //편집된 알람 실제 삭제
  const fetchRemove = async () => {
    await removeAlert({ alertIds: removedAlertsIds.current });
    setIsEdit(false);
  };

  return (
    <StyledAlert $isShowAlert={isShowAlert}>
      <StyledAlertHeader>
        <StyledAlertInner>
          <div>
            <StyledIoIosArrowBack onClick={handleClick} />
            <StyledTitle>알림</StyledTitle>
          </div>
          {isEdit && <span onClick={fetchRemove}>완료</span>}
          {!isEdit && <span onClick={handleEdit}>편집</span>}
        </StyledAlertInner>
      </StyledAlertHeader>
      {alertsList?.length === 0 && "받은 알림이 없습니다."}
      <ul ref={alertRef}>
        {alertsList?.map((alert) => (
          <AlertItem
            key={alert._id}
            {...alert}
            isEdit={isEdit}
            handleClick={handleClick}
            handleRemove={() => handleRemove(alert._id)}
            readAlert={async () => await readAlert({ alertId: alert._id })}
          />
        ))}
      </ul>
    </StyledAlert>
  );
}

function AlertItem(
  props: Alert & {
    isEdit: boolean;
    handleClick: () => void;
    handleRemove: () => void;
    readAlert: () => Promise<AxiosResponse<void>>;
  },
) {
  const navigate = useNavigate();
  const {
    senderId,
    receiverId,
    status,
    createdAt,
    isRead,
    isEdit,
    handleClick,
    handleRemove,
    readAlert,
  } = props;

  const [userId, setUserId] = useState();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const loginUserId = JSON.parse(user).id;
      setUserId(loginUserId);
    }
  }, []);

  //알람 클릭시 화면 전환
  const handleMessageClick = () => {
    if (isEdit) return;

    readAlert(); //알람 읽기
    handleClick(); //알람 모달 화면 사라지게 하기
    navigate(userId === senderId._id ? path.root : path.tab1);
  };

  return (
    <StyledList $isRead={isRead}>
      <section onClick={handleMessageClick}>
        <div className="noti-header">
          <b>알림</b>
          {isEdit && <StyledIoClose onClick={handleRemove} />}
        </div>
        <div>
          {userId === senderId._id && status === "REJECTED" && (
            <h4>{receiverId.nickName}님이 요청을 거절하였습니다.</h4>
          )}
          {userId === senderId._id && status === "ACCEPTED" && (
            <h4>{receiverId.nickName}님이 요청을 수락하였습니다.</h4>
          )}
          {userId === receiverId._id && status === "WAITING" && (
            <h4>{senderId.nickName}님이 메이트 요청을 보냈습니다.</h4>
          )}
        </div>
        <span>
          {new Intl.DateTimeFormat("ko-Kr", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "narrow",
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(createdAt))}
        </span>
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
const StyledIcons = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;
const StyledBell = styled.div<{ $isOn: boolean }>`
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
    display: none;

    ${(props) =>
      props.$isOn &&
      css`
        display: block;
      `}
  }
`;

const StyledProfile = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid black;
  border-radius: 50%;
  margin-left: 10px;
  overflow: hidden;
  cursor: pointer;
  & > img {
    width: inherit;
    height: inherit;
    object-fit: contain;
  }
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const StyledMenuList = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  color: #232323;
  border-radius: 4px;
  top: 43px;
  right: -30px;
  z-index: 30;
  box-shadow: 2px 10px 10px 0px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.25s ease-out forwards;
  opacity: 0;

  & > .menu {
    padding: 6px 16px;
  }
  & > .menu:hover {
    background-color: #f6f6f6;
    cursor: pointer;
  }
  & > .menu.warning {
    color: red;
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

const StyledGoBell = styled(GoBell)`
  font-size: 24px;
`;

const StyledIoIosArrowBack = styled(IoIosArrowBack)`
  font-size: 20px;
`;

const StyledIoClose = styled(IoClose)`
  font-size: 20px;
  color: #737373;
`;

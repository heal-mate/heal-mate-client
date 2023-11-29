import { styled } from "styled-components";
import { CHAT_MOCK_DATA } from "dev@/ChatMockData";

export default function ChatList() {
  const {
    data: chats,

    isError,
    isLoading,
    error,
  } = CHAT_MOCK_DATA;
  return (
    <StyledChatBox>
      {isLoading ? (
        <p>loading...</p>
      ) : isError ? (
        <p>Error : {error!.message}</p>
      ) : (
        chats!.map((chat) => (
          <StyledChatItem key={chat.id}>
            <img src={chat.profileImageSrc} alt="profileImg" />
            <div>
              <div>
                <strong>{chat.nickName}</strong>
                <span>{chat.location}</span>
                <span>·</span>
                <span>31분 전</span>
              </div>
              <p>{chat.lastMessage}</p>
            </div>
            {chat.notifications > 0 && (
              <StyledChatAlert>{chat.notifications}</StyledChatAlert>
            )}
          </StyledChatItem>
        ))
      )}
    </StyledChatBox>
  );
}

const StyledChatBox = styled.div`
  background-color: #f2f2f2;
  padding: 8px;
  width: 100%;
`;

const StyledChatItem = styled.div`
  background-color: #ffffff;
  position: relative;
  padding: 16px;
  margin: 8px 0;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.875rem;
  img {
    display: inline-block;
    width: 14%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 50%;
  }
  > div {
    width: calc(100% - 14%);
    > div {
      display: flex;
      align-items: center;
      margin-bottom: 7px;
      strong {
        font-size: 15px;
        font-weight: bolder;
        letter-spacing: -1.5px;
        margin-right: 5px;
      }
      span {
        font-size: 11px;
        color: gray;
        margin-right: 4px;
        letter-spacing: -1.5px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    p {
      font-size: 14px;
      font-weight: bold;
      color: #575757;
      letter-spacing: -0.8px;
      width: 94%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

const StyledChatAlert = styled.span`
  position: absolute;
  cursor: pointer;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  color: #fff;
  font-size: 13px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

import { Fragment } from "react";
import { useMatching } from "./Card.hooks";
import { CardItemProps, CardType } from "./Card.type";
import { CARD_MOCK_DATA } from "../../mock/CardMockData";
import styled, { css } from "styled-components";

export default function Card({ type }: { type: CardType }) {
  // TODO: 추천 or 카드 리스트 data fetch
  const { data: cards, isError, isLoading, error } = CARD_MOCK_DATA;

  return (
    <StyledContainer>
      {isLoading ? (
        <p>loading...</p>
      ) : isError ? (
        <p>Error: {error!.message}</p>
      ) : (
        cards!.map((card, i) => (
          <Fragment key={"CardItem" + i}>
            <CardItem {...card} type={type} />
          </Fragment>
        ))
      )}
    </StyledContainer>
  );
}

function CardItem(props: CardItemProps) {
  const { id, nickName, profileImageSrc, introduction, condition, type } =
    props;
  const { location, benchPress, squat, deadLift, gender, fitnessYears } =
    condition;

  return (
    <StyledCardItemContainer>
      <div>{nickName}</div>
      <h3>{introduction}</h3>
      <StyledImage src={profileImageSrc}>
        <img src={profileImageSrc} />
      </StyledImage>
      <StyledTagContainer>
        <StyledTag>L {location}</StyledTag>
        <StyledTag>G {gender === "MALE" ? "남" : "여"}</StyledTag>
        <StyledTag>Y {fitnessYears}년</StyledTag>
        <StyledTag>B {benchPress}</StyledTag>
        <StyledTag>S {squat}</StyledTag>
        <StyledTag>D {deadLift}</StyledTag>
      </StyledTagContainer>
      <CardButtons id={id} type={type} />
    </StyledCardItemContainer>
  );
}

function CardButtons(props: { id: string; type: CardType }) {
  const { id, type } = props;
  const {
    matchStatus,
    isLoading,
    isError,
    error,
    requestMatch,
    cancelMatch,
    acceptMatch,
    rejectMatch,
  } = useMatching(id);

  return (
    <StyledHorizenContainer>
      {isLoading ? (
        "loading..."
      ) : isError ? (
        error!.message
      ) : matchStatus === null ? (
        <StyledButton $variant="contained" onClick={() => requestMatch()}>
          요청하기
        </StyledButton>
      ) : matchStatus === "WAITING" && type === "SENT" ? (
        <>
          <StyledButton $variant="outlined" onClick={() => cancelMatch()}>
            취소
          </StyledButton>
          <StyledButton $variant="contained" disabled>
            수락대기중
          </StyledButton>
        </>
      ) : matchStatus === "WAITING" && type === "RECEIVED" ? (
        <>
          <StyledButton $variant="outlined" onClick={() => acceptMatch()}>
            수락
          </StyledButton>
          <StyledButton $variant="contained" onClick={() => rejectMatch()}>
            거절
          </StyledButton>
        </>
      ) : matchStatus === "REJECTED" ? (
        <StyledButton $variant="contained" disabled>
          거절된 요청
        </StyledButton>
      ) : matchStatus === "ACCEPTED" ? (
        <StyledButton $variant="contained" disabled>
          성사된 요청
        </StyledButton>
      ) : null}
    </StyledHorizenContainer>
  );
}

const StyledContainer = styled.section`
  background-color: #f2f2f2;
  padding: 8px;
  color: #2b2b2b;
`;

const StyledCardItemContainer = styled.div`
  background-color: #ffffff;
  padding: 16px;
  margin: 8px 0;
  border-radius: 3px;
  & h3 {
    font-size: 1.4rem;
    font-weight: bold;
    padding: 0.875rem 0;
  }
`;

const StyledImage = styled.div<{ src: string }>`
  width: 100%;
  height: 12rem;
  object-fit: contain;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url(${({ src }) => src});
    background-size: cover;
    background-position: center;
    filter: blur(10px);
    scale: calc(1.04);
  }

  & > img {
    width: 100%;
    margin: 0 auto;
    height: inherit;
    object-fit: contain;
    position: relative;
  }
`;

const StyledTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem 0;
`;

const StyledTag = styled.p`
  padding: 0.125rem 0.5rem;
  border-radius: 1rem;
  border: 1px solid #121212;
`;

const StyledButton = styled.button<{ $variant: "outlined" | "contained" }>`
  ${(props) =>
    props.$variant === "outlined"
      ? css`
          background-color: #ffffff;
          border: 1px solid #2b2b2b;
        `
      : css`
          background-color: #2b2b2b;
          color: #ffffff;
        `}

  border-radius: 3px;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  padding: 8px;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const StyledHorizenContainer = styled.div`
  display: flex;
  gap: 8px;
`;

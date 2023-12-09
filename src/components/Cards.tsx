import { Fragment, useState } from "react";
import styled, { css } from "styled-components";
import { User } from "@/service/apis/user.type";
import { StyledCardsContainer } from "./Cards.styles";

type ButtonProps = {
  text: string;
  theme: ButtonTheme;
  disabled?: true;
  onClickCallback: () => Promise<unknown> | null;
};

type MatchUserInfoProps = Pick<
  User,
  "nickName" | "profileImageSrc" | "condition" | "introduction" | "kakaoID"
> & { buttons: ButtonProps[] };

export type CardProps = {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  matchUserInfos: MatchUserInfoProps[] | undefined;
};

export default function Cards(props: CardProps) {
  const { matchUserInfos, isLoading, isError, error } = props;

  return (
    <>
      {isLoading ? (
        <p>loading...</p>
      ) : isError ? (
        <p>Error: {error!.message}</p>
      ) : matchUserInfos?.length ? (
        matchUserInfos!.map((matchUserInfo, i) => (
          <Fragment key={"CardItem" + i}>
            <CardItem {...matchUserInfo} />
          </Fragment>
        ))
      ) : (
        <StyledCardsContainer>메시지가 없습니다...</StyledCardsContainer>
      )}
    </>
  );
}

export function CardItem(props: MatchUserInfoProps) {
  const { nickName, profileImageSrc, introduction, condition, buttons } = props;
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
      <CardButtons buttons={buttons} />
    </StyledCardItemContainer>
  );
}

type ButtonTheme = "outlined" | "contained" | "kakao";

function CardButtons({ buttons }: { buttons: ButtonProps[] }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (callback: ButtonProps["onClickCallback"]) => {
    setIsLoading(true);
    await callback();
    setIsLoading(false);
  };

  return (
    <StyledHorizenContainer>
      {buttons.map(({ text, theme, disabled, onClickCallback }, i) => (
        <Fragment key={"CardButton" + i}>
          {isLoading ? (
            <StyledButton $variant={theme} disabled>
              loading...
            </StyledButton>
          ) : (
            <>
              <StyledButton
                $variant={theme}
                onClick={() => handleClick(onClickCallback)}
                disabled={disabled}
              >
                {text}
              </StyledButton>
            </>
          )}
        </Fragment>
      ))}
    </StyledHorizenContainer>
  );
}

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

const StyledButton = styled.button<{ $variant: ButtonTheme }>`
  ${({ $variant }) => {
    switch ($variant) {
      case "outlined":
        return css`
          background-color: #ffffff;
          border: 1px solid #2b2b2b;
        `;
      case "contained":
        return css`
          background-color: #2b2b2b;
          color: #ffffff;
        `;
      default:
        return "";
    }
  }}

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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RadioButton from "@/components/RadioButton";
import { GenderType } from "@/components/MatchFilter.type";

type UserInfoType = {
  nickname: string;
  email: string;
  gender: GenderType;
};

export default function UserInfoSetup() {
  const [userInfos, setUserInfors] = useState<UserInfoType>({
    nickname: "",
    email: "",
    gender: null,
  });
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/");
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfors((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeGender = (genderType: GenderType) => {
    setUserInfors((prevuserInfos) => ({
      ...prevuserInfos,
      gender: genderType,
    }));
  };

  const { nickname, email } = userInfos;
  return (
    <StyledContainer>
      <SectionsWrapper>
        <StyledSection>
          <p>닉네임 설정</p>
          <input
            type="text"
            name="nickname"
            value={nickname}
            onChange={handleChangeInput}
            required
          />
          {errorMessage && <div>{errorMessage}</div>}
        </StyledSection>

        <StyledSection>
          <p>이메일 설정</p>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
          {errorMessage && <div>{errorMessage}</div>}
        </StyledSection>

        <StyledSection>
          <p>성별 설정</p>
          <StyledButtonGroup>
            <RadioButton
              text="남자"
              genderType="MALE"
              handleChange={handleChangeGender}
            />
            <RadioButton
              text="여자"
              genderType="FEMALE"
              handleChange={handleChangeGender}
            />
          </StyledButtonGroup>
        </StyledSection>
        <button onClick={handleSubmit}>설정 저장</button>
      </SectionsWrapper>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 40px;
`;

const SectionsWrapper = styled.div`
  width: 100%;
  max-width: 430px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px 40px;

  & > button {
    background-color: ${({ theme }) => theme.colors.point};
    color: white;
    padding: 20px 40px;
    border-radius: 50px;
    font-size: 13px;
    font-weight: 400;
    border: none;
    outline: none;
    cursor: pointer;

    &:hover {
      background-color: #26403f;
    }

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
`;

const StyledSection = styled.div`
  margin-bottom: 20px;
  & > p {
    font-size: 22px;
    margin-bottom: 10px;
  }

  & > input {
    width: 100%;
    padding: 20px 40px;
    border-radius: 50px;
    font-size: 13px;
    font-weight: 400;
    border: 1px solid ${({ theme }) => theme.colors.point};
    outline: none;
  }
`;

const StyledButtonGroup = styled.div`
  display: flex;
`;

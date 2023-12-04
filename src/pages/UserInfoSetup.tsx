import { useEffect, useState } from "react";
import styled from "styled-components";
import RadioButton from "@/components/RadioButton";
import { GenderType } from "@/components/MatchFilter.type";
import { fetchRegisterUser } from "@/service/apis/user";
import { useNavigate } from "react-router-dom";

type UserInfoType = {
  nickName: string;
  email: string;
  gender: GenderType;
  tel: string;
  password: string;
};

export default function UserInfoSetup() {
  const [userInfos, setUserInfors] = useState<UserInfoType>({
    nickName: "",
    email: "",
    gender: null,
    tel: "",
    password: "",
  });

  //TODO : setErrorMessage 임시로 삭제함
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();

  // 필수값 체크
  const inputValueCheck = () => {
    const items = Object.entries(userInfos).filter((item) => item[1] === "");
    return items.length !== 0 ? true : false;
  };

  const handleSubmit = () => {
    const msg = inputValueCheck();
    if (msg) return alert("필수 입력 사항을 모두 입력해주세요.");

    fetchRegisterUser(userInfos)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res));
        alert("회원가입 되었습니다. 로그인 해주세요.");
        navigate("/login");
      })
      .catch((err) => setErrorMessage(err.response.data));
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

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const email = JSON.parse(user).email;
      setUserInfors((prev) => ({ ...prev, email }));
    }
  }, []);

  const { nickName, email, tel, password } = userInfos;

  return (
    <StyledContainer>
      <SectionsWrapper>
        <StyledSection>
          <p>이메일</p>
          <input type="text" name="email" value={email} disabled />
        </StyledSection>
        <StyledSection>
          <p>*비밀번호 설정</p>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
            required
          />
        </StyledSection>
        <StyledSection>
          <p>*닉네임 설정</p>
          <input
            type="text"
            name="nickName"
            value={nickName}
            onChange={handleChangeInput}
            required
          />
        </StyledSection>

        <StyledSection>
          <p>*전화번호 설정</p>
          <input
            type="text"
            name="tel"
            value={tel}
            onChange={handleChangeInput}
          />
        </StyledSection>

        <StyledSection>
          <p>*성별 설정</p>
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
        {/* <button onClick={handleSubmit}>설정 저장</button> */}
        <button onClick={handleSubmit}>회원가입</button>
        {errorMessage && <StyledErrorSpan>{errorMessage}</StyledErrorSpan>}
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
    font-size: 16px;
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

const StyledErrorSpan = styled.span`
  color: red;
  font-size: 12px;
  text-align: center;
  font-weight: bold;
`;

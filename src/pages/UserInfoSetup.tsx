import { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import RadioButton from "@/components/RadioButton";
import { useNavigate, useLocation } from "react-router-dom";
import { GenderType, LOCATION_TYPE, LOCATIONS } from "@/config/constants";
import authAPI from "@/service/apis/auth";
import { FormStyle } from "@/components/common/Form.styles";
import { FunnelStyle } from "@/components/common/Funnel.styles";
import toast from "react-hot-toast";
import { path } from "@/App";
import passwordValidate from "@/utils/passwordValidate";

type UserInfoType = {
  nickName: string;
  email: string;
  gender: GenderType;
  tel: string;
  password: string;
  kakaoID: string;
  location: LOCATION_TYPE;
};

export default function UserInfoSetup() {
  const [userInfos, setUserInfors] = useState<UserInfoType>({
    nickName: "",
    email: "",
    gender: "MALE",
    tel: "",
    password: "",
    kakaoID: "",
    location: LOCATIONS[0],
  });

  const [passwordConfirm, setPasswordConfirm] = useState("");

  //TODO : setErrorMessage 임시로 삭제함
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();

  // 필수값 체크
  const inputValueCheck = () => {
    const items = Object.entries(userInfos).filter((item) => item[1] === "");
    return items.length !== 0 ? true : false;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const msg = inputValueCheck();
    if (msg) return toast.error("필수 입력 사항을 모두 입력해주세요.");
    if (userInfos.password !== passwordConfirm)
      return toast.error("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    const passwordCheckResult = passwordValidate(userInfos.password);
    if (!passwordCheckResult)
      return toast.error(
        "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.",
      );
    authAPI
      .registerUser(userInfos)
      .then(() => {
        toast.success("회원가입에 성공했습니다.\n로그인 화면으로 이동합니다.");
        navigate(path.login);
      })
      .catch((err) => setErrorMessage(err.response.data?.error));
  };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
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
    if (state) {
      const email = state;
      setUserInfors((prev) => ({ ...prev, email }));
    }
  }, [state]);

  const { nickName, email, tel, password, location, kakaoID } = userInfos;

  return (
    <StyledContainer>
      <SectionsWrapper>
        <FunnelStyle.Container>
          <FunnelStyle.StageHeaderWrapper>
            <FunnelStyle.StageHeader>
              <FunnelStyle.ArrowBackIcon onClick={() => navigate(-1)} />
              회원가입
            </FunnelStyle.StageHeader>
          </FunnelStyle.StageHeaderWrapper>
          <FormStyle.Form onSubmit={handleSubmit}>
            <FormStyle.Label htmlFor="email">이메일</FormStyle.Label>
            <FormStyle.Input type="text" name="email" value={email} disabled />
            <FormStyle.Label htmlFor="password">비밀번호</FormStyle.Label>
            <FormStyle.Input
              type="password"
              name="password"
              value={password}
              onChange={handleChangeInput}
              placeholder="영문, 숫자, 특수문자를 포함한 8자 이상"
              required
            />

            <FormStyle.Label htmlFor="passwordConfirm">
              비밀번호 확인
            </FormStyle.Label>
            <FormStyle.Input
              type="password"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="비밀번호 확인"
              required
            />
            <FormStyle.Label htmlFor="nickName">닉네임</FormStyle.Label>
            <FormStyle.Input
              type="text"
              name="nickName"
              value={nickName}
              onChange={handleChangeInput}
              placeholder="헬스프랜즈"
              required
            />
            <FormStyle.Label htmlFor="kakaoID">카카오 아이디</FormStyle.Label>
            <FormStyle.Input
              type="text"
              name="kakaoID"
              value={kakaoID}
              onChange={handleChangeInput}
              placeholder="healthfriends9594"
              required
            />
            <FormStyle.Label htmlFor="tel">전화번호</FormStyle.Label>
            <FormStyle.Input
              type="text"
              name="tel"
              value={tel}
              onChange={handleChangeInput}
              placeholder="01012341234"
            />

            <FormStyle.Label>성별</FormStyle.Label>
            <StyledButtonGroup>
              <RadioButton
                text="남자"
                genderType="MALE"
                defaultValue={userInfos.gender}
                handleChange={handleChangeGender}
              />
              <RadioButton
                text="여자"
                genderType="FEMALE"
                defaultValue={userInfos.gender}
                handleChange={handleChangeGender}
              />
            </StyledButtonGroup>

            <FormStyle.Label>거주 지역</FormStyle.Label>
            <FormStyle.Select
              id="select"
              name="location"
              value={location}
              onChange={handleChangeInput}
            >
              {LOCATIONS.map((place) => (
                <option key={place} value={place}>
                  {place}
                </option>
              ))}
            </FormStyle.Select>

            {errorMessage && <StyledErrorSpan>{errorMessage}</StyledErrorSpan>}

            <FormStyle.Button type="submit" $buttonTheme="contain">
              회원가입
            </FormStyle.Button>
          </FormStyle.Form>
        </FunnelStyle.Container>
      </SectionsWrapper>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const SectionsWrapper = styled.div`
  width: 100%;
  max-width: 430px;
  display: flex;
  flex-direction: column;
`;

const StyledButtonGroup = styled.div`
  display: flex;
`;

const StyledErrorSpan = styled.span`
  margin-top: 1rem;
  color: red;
  font-size: 1rem;
  text-align: center;
`;

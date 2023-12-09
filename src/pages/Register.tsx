import { useRef, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import authAPI from "@/service/apis/auth";
import { FormStyle } from "@/components/common/Form.styles";
import toast from "react-hot-toast";
import { FunnelStyle } from "@/components/common/Funnel.styles";

export default function Register() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const authCodeRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");

  const nextStep = () => {
    navigate("/setup", { state: emailRef.current!.value });
  };

  const handleClickAuth = () => {
    if (emailRef.current) {
      authAPI
        .sendAuthCodeMail(emailRef.current.value)
        .then(() =>
          toast.success("이메일이 발송되었습니다.\n5분안에 인증해주세요."),
        )
        .catch((err) => setError(err.response.data?.error));
    }
  };

  const handleCheckAuth = () => {
    if (authCodeRef.current && emailRef.current) {
      authAPI
        .checkAuthCode({
          email: emailRef.current.value,
          authCode: authCodeRef.current.value,
        })
        .then(() => {
          toast.success("인증되었습니다.");
          nextStep();
        })
        .catch((err) => setError(err.response.data?.error));
    }
  };

  return (
    <FunnelStyle.Container>
      <FunnelStyle.StageHeader>
        <FunnelStyle.ArrowBackIcon onClick={() => navigate(-1)} />
        회원가입
      </FunnelStyle.StageHeader>
      <StyledContainer>
        <FormStyle.Form onSubmit={(e) => e.preventDefault()}>
          <FormStyle.Label htmlFor="email">본인 인증(이메일)</FormStyle.Label>
          <FormStyle.Input
            type="text"
            id="email"
            placeholder="이메일 주소를 입력해주세요"
            ref={emailRef}
          />
          <FormStyle.Button onClick={handleClickAuth} $buttonTheme="contain">
            인증메일 전송하기
          </FormStyle.Button>
          <FormStyle.Label htmlFor="authCode">인증 문자 입력</FormStyle.Label>
          <FormStyle.Input
            type="text"
            id="authCode"
            placeholder="인증문자를 입력해주세요"
            ref={authCodeRef}
          />
          <FormStyle.Button onClick={handleCheckAuth} $buttonTheme="contain">
            인증하기
          </FormStyle.Button>

          <StyledErrorSpan>{error}</StyledErrorSpan>
        </FormStyle.Form>
      </StyledContainer>
    </FunnelStyle.Container>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - ${({ theme }) => theme.size.headerHeight}px);
  /* padding: 2rem 0.25rem; */
  & > img {
    margin: 0 auto;
    width: 150px;
    margin-bottom: 20px;
  }
`;

const StyledErrorSpan = styled.span`
  color: red;
  font-size: 12px;
  text-align: center;
  font-weight: bold;
`;

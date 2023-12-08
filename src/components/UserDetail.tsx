import { styled } from "styled-components";
import { MdArrowBack } from "react-icons/md";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  FITNESS_YEARS_MARKS,
  LOCATIONS,
  MAX_FITNESS_YEARS,
  MAX_WEIGHT,
  WEIGHT_MARKS,
} from "@/config/constants";
import { MarkObj } from "rc-slider/lib/Marks";
import userAPI from "@/service/apis/user";
import { Location, User } from "@/service/apis/user.type";
import { uploadImage } from "@/service/apis/uploadImage";
import { useSetRecoilState } from "recoil";
import { LoadingSpinnerAtom } from "@/recoils/loadingSpinnerAtom";
import authAPI from "@/service/apis/auth";
import { path } from "@/App";
import { useNavigate } from "react-router-dom";

export default function UserDetail() {
  const setLoadingSpinner = useSetRecoilState(LoadingSpinnerAtom);
  const [user, setUser] = useState<User | null>(null);
  const initialUser = useRef<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const profileImgRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    userAPI
      .getUserMine()
      .then((userData) => {
        setUser(userData);
        initialUser.current = userData;
      })
      .catch(console.error);
  }, []);

  const handleClickImage = () => {
    profileImgRef.current?.click();
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const fileInput = e.target.files[0];
    const url = URL.createObjectURL(fileInput);
    setUser((prevState) => {
      return {
        ...prevState!,
        profileImageSrc: url,
      };
    });
  };

  const handleChangeRange = (value: number | number[], target: string) => {
    setUser((prevState) => {
      if (!prevState) return null;

      return {
        ...prevState,
        condition: {
          ...prevState.condition,
          [target]: value,
        },
      };
    });
  };

  const handleChangeIntroduction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      if (!prevState) return null;

      return {
        ...prevState,
        condition: {
          ...prevState.condition,
        },
        introduction: e.target.value,
      };
    });
  };

  const handleChangeLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser((prevState) => {
      if (!prevState) return null;

      return {
        ...prevState,
        condition: {
          ...prevState.condition,
          location: e.target.value as Location,
        },
      };
    });
  };

  const onSaveUser = async () => {
    setLoadingSpinner(true);
    if (!user || !initialUser.current) return;
    // user 상태와 initialUser 상태 비교.
    const isChanged =
      JSON.stringify(user) !== JSON.stringify(initialUser.current);
    if (!isChanged) {
      setLoadingSpinner(false);
      return;
    } // 변경사항이 없으면 함수 종료
    let imgUrl = user.profileImageSrc;
    // 이미지 url이 변경되었을 때만 업로드 API를 요청한다.
    if (user.profileImageSrc !== initialUser.current.profileImageSrc) {
      const res = await fetch(user.profileImageSrc);
      const blob = await res.blob();
      imgUrl = await uploadImage(blob);
    }
    await userAPI.updateMe({
      ...user,
      profileImageSrc: imgUrl,
    });
    setLoadingSpinner(false);
  };

  const handleToggleEditMode = () => {
    setEditMode((editMode) => !editMode);
  };

  const handleSave = async () => {
    await onSaveUser();
    handleToggleEditMode();
  };
  const handleEdit = () => {
    handleToggleEditMode();
  };

  const handleLogout = async () => {
    await authAPI.logoutUser();
    navigate(path.login);
  };

  const handleWithdraw = async () => {
    await authAPI.withdrawUser();
    navigate(path.login);
  };

  if (!user) return <div>loading</div>;

  const { nickName, introduction, profileImageSrc, condition } = user;
  const { benchPress, deadLift, fitnessYears, location, squat } = condition;

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledArrowBackIcon
          onClick={() => {
            navigate(-1);
          }}
        />
        <h2>마이페이지</h2>
        {editMode ? (
          <button onClick={handleSave}>저장</button>
        ) : (
          <button onClick={handleEdit}>수정</button>
        )}
      </StyledHeader>
      <StyledProfile>
        <StyledImage>
          <img src={profileImageSrc ?? ""} alt="" onClick={handleClickImage} />
          {editMode && (
            <StyledFileInput>
              <input
                ref={profileImgRef}
                type="file"
                onChange={handleChangeImage}
                title="test"
              />
            </StyledFileInput>
          )}
        </StyledImage>
        <h3>{nickName}</h3>
        {editMode ? (
          <input
            type="text"
            value={introduction}
            onChange={(e) => handleChangeIntroduction(e)}
          />
        ) : (
          <p>{introduction}</p>
        )}
      </StyledProfile>

      <Rangeinput
        isEditable={editMode}
        title="벤치프레스"
        name="benchPress"
        suffix="kg"
        step={5}
        max={MAX_WEIGHT}
        marks={WEIGHT_MARKS}
        value={benchPress ?? MAX_WEIGHT}
        handleChange={handleChangeRange}
      />
      <Rangeinput
        isEditable={editMode}
        title="데드리프트"
        name="deadLift"
        suffix="kg"
        step={5}
        max={MAX_WEIGHT}
        marks={WEIGHT_MARKS}
        value={deadLift ?? MAX_WEIGHT}
        handleChange={handleChangeRange}
      />
      <Rangeinput
        isEditable={editMode}
        title="스쿼트"
        name="squat"
        suffix="kg"
        step={5}
        max={MAX_WEIGHT}
        marks={WEIGHT_MARKS}
        value={squat ?? MAX_WEIGHT}
        handleChange={handleChangeRange}
      />
      <Rangeinput
        isEditable={editMode}
        title="경력"
        name="fitnessYears"
        suffix="년"
        step={1}
        max={MAX_FITNESS_YEARS}
        marks={FITNESS_YEARS_MARKS}
        value={fitnessYears ?? MAX_FITNESS_YEARS}
        handleChange={handleChangeRange}
      />
      <StyledLocationsDiv>
        <p>지역</p>

        {editMode ? (
          <select onChange={handleChangeLocation} defaultValue={location}>
            {LOCATIONS.map((location, index) => (
              <option key={"location" + index} value={location}>
                {location}
              </option>
            ))}
          </select>
        ) : (
          <div>{location}</div>
        )}
      </StyledLocationsDiv>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={handleWithdraw}>회원탈퇴</button>
    </StyledContainer>
  );
}

type RangeinputProps = {
  isEditable: boolean;
  title: string;
  name: string;
  suffix: string;
  step: number;
  max: number;
  marks: Record<string | number, ReactNode | MarkObj>;
  value: number;
  handleChange: (value: number | number[], target: string) => void;
};

function Rangeinput({
  isEditable,
  title,
  name,
  suffix,
  step,
  max,
  marks,
  value,
  handleChange,
}: RangeinputProps) {
  return (
    <StyledRangeinputContainer>
      <StyledInfo>
        <p>{title}</p>
        <div>
          {value === max ? (
            "상관없음"
          ) : (
            <>
              {value}
              {suffix}
            </>
          )}
        </div>
      </StyledInfo>
      <StyledRange>
        <Slider
          marks={marks}
          max={max}
          step={step}
          dots={false}
          defaultValue={value}
          value={value}
          onChange={(range) => {
            handleChange(range, name);
          }}
          disabled={!isEditable}
        />
      </StyledRange>
    </StyledRangeinputContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px;
`;

const StyledHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > h2 {
    flex: 1;
    text-align: center;
    width: 100%;
    padding: 16px;
    font-size: 22px;
    font-weight: bold;
    color: #1f1f1f;
  }

  & > button {
    position: absolute;
    right: 0;
    font-size: 14px;
    font-weight: bold;
    padding: 10px;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

const StyledArrowBackIcon = styled(MdArrowBack)`
  position: absolute;
  left: 0;
  font-size: 32px;
  font-weight: bold;
  padding: 5px;
  cursor: pointer;
`;
const StyledProfile = styled.div`
  text-align: center;

  & > h3 {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  & > p {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  & > input {
    width: 100%;
    text-align: center;
    border: none;
    border-bottom: 1px solid #333;
    margin-bottom: 20px;
  }
`;

const StyledFileInput = styled.div`
  color: black;
`;

const StyledImage = styled.div`
  margin: 0 auto;
  margin-bottom: 8px;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  position: relative;
  overflow: hidden;

  & > img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
`;

const StyledLocationsDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 10px;

  & > p {
    font-size: 22px;
  }

  & > div {
    font-size: 15px;
    color: ${({ theme }) => theme.colors.point};
  }
`;

const StyledRangeinputContainer = styled.div`
  margin-bottom: 50px;
`;

const StyledInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 10px;

  & > p {
    font-size: 22px;
  }

  & > div {
    font-size: 15px;
    color: ${({ theme }) => theme.colors.point};
  }
`;

const StyledRange = styled.div`
  .rc-slider-disabled {
    background-color: transparent;
  }

  .rc-slider-handle {
    width: 22px;
    height: 22px;
    margin-top: -4px;
    border: none;
    background-color: #faf9f6;
    opacity: 1;
    border: 2px solid ${({ theme }) => theme.colors.point};
    box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.5);
  }

  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border-color: transparent;
    box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.5);
  }
  .rc-slider-handle:hover {
    border-color: transparent;
  }
  .rc-slider-handle:active {
    border-color: transparent;
    box-shadow: none;
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }

  .rc-slider-rail {
    position: absolute;
    width: 100%;
    height: 14px;
    background-color: #faf9f6;
    border-radius: 10px;
  }
  .rc-slider-track {
    height: 14px;
    background-color: ${({ theme }) => theme.colors.point};
  }

  .rc-slider-step {
    height: 8px;
  }
  .rc-slider-mark {
    top: 30px;
  }

  // 마커 텍스트 스타일
  .rc-slider-mark-text {
    position: absolute;
    display: inline-block;
    color: #999;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
  }
  // dot 기본 스타일
  .rc-slider-dot {
    opacity: 0;
  }

  // 버튼 활성화 색상
  .rc-slider-dot-active {
    border-color: transparent;
  }
`;

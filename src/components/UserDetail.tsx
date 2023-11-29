import { styled } from "styled-components";
import { MdArrowBack } from "react-icons/md";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export type UserType = {
  nickName: string | null;
  introduction: string | null;
  profileImageSrc: string | null;
  benchPress: number | null;
  squat: number | null;
  deadLift: number | null;
  fitnessYears: number | null;
  gender: string | null;
  location: string | null;
};

export type UserDetailProps = {
  user: UserType;
  type?: "Normal" | "Edit";
};
export default function UserDetail() {
  const [user, setUser] = useState<UserType>({
    nickName: null,
    introduction: null,
    profileImageSrc: null,
    benchPress: null,
    squat: null,
    deadLift: null,
    fitnessYears: null,
    gender: null,
    location: null,
  });

  const [editMode, setEditMode] = useState(false);

  const {
    nickName,
    introduction,
    profileImageSrc,
    benchPress,
    deadLift,
    squat,
    fitnessYears,
    location,
  } = user;

  useEffect(() => {
    axios("../../mock/user.json")
      .then((res) => setUser(res.data.user))
      .catch(console.error);
  }, []);

  const handleChangeRange = (ranges: number | number[], target: string) => {
    setUser((prevState) => {
      return {
        ...prevState,
        [target]: ranges,
      };
    });
  };

  const handleChangeIntroduction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return {
        ...prevState,
        introduction: e.target.value,
      };
    });
  };

  const handleChangeLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser((prevState) => {
      return {
        ...prevState,
        location: e.target.value,
      };
    });
  };

  const onSaveUser = () => {
    // TODO: 수정한 내용을 업데이트 API에 요청
    console.log(user);
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    handleToggleEditMode();
    onSaveUser();
  };
  const handleEdit = () => {
    handleToggleEditMode();
  };

  if (!user) return <div>loading</div>;

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledArrowBackIcon />
        <h2>마이페이지</h2>
        {editMode ? (
          <button onClick={handleSave}>저장</button>
        ) : (
          <button onClick={handleEdit}>수정</button>
        )}
      </StyledHeader>
      <StyledProfile>
        <StyledImage>
          <img src={profileImageSrc ?? ""} alt="" />
        </StyledImage>
        <h3>{nickName}</h3>
        {editMode ? (
          <input
            type="text"
            value={introduction!}
            onChange={(e) => handleChangeIntroduction(e)}
          />
        ) : (
          <p>{introduction}</p>
        )}
      </StyledProfile>
      <Rangeinput
        type={editMode}
        title="벤치프레스"
        name="benchPress"
        value={benchPress ?? 300}
        handleChange={handleChangeRange}
      />
      <Rangeinput
        type={editMode}
        title="데드리프트"
        name="deadLift"
        value={deadLift ?? 300}
        handleChange={handleChangeRange}
      />
      <Rangeinput
        type={editMode}
        title="스쿼트"
        name="squat"
        value={squat ?? 300}
        handleChange={handleChangeRange}
      />
      <Rangeinput
        type={editMode}
        title="경력"
        name="fitnessYears"
        value={fitnessYears ?? 5}
        handleChange={handleChangeRange}
      />
      <StyledLocationsDiv>
        <p>지역</p>

        {editMode ? (
          <select onChange={handleChangeLocation}>
            <option value="잠실">잠실</option>
            <option value="송파">송파</option>
            <option value="성수">성수</option>
            <option value="삼성">삼성</option>
            <option value="청담">청담</option>
            <option value="역삼">역삼</option>
            <option value="대치">대치</option>
            <option value="개포">개포</option>
          </select>
        ) : (
          <div>{location}</div>
        )}
      </StyledLocationsDiv>
    </StyledContainer>
  );
}

type RangeinputProps = {
  type: boolean;
  title: string;
  name: string;
  value: number;
  handleChange: (value: number | number[], target: string) => void;
};

const weightMarks = {
  0: "0kg",
  50: "50kg",
  100: "100kg",
  150: "150kg",
  200: "200kg",
  250: "250kg",
  300: "300kg이상",
};

const careerMarks = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5years 이상",
};

const MAX_WEIGHT = 300;
const MAX_FITNESS_YEARS = 5;

function Rangeinput({
  type,
  title,
  name,
  value,
  handleChange,
}: RangeinputProps) {
  const i = title === "경력";

  return (
    <StyledRangeinputContainer>
      <StyledInfo>
        <p>{title}</p>
        <div>
          {value === 300 ? (
            "상관없음"
          ) : (
            <>
              {value}
              {i ? "년" : "kg"}
              {}
            </>
          )}
        </div>
      </StyledInfo>
      <StyledRange>
        <Slider
          marks={i ? careerMarks : weightMarks}
          max={i ? MAX_FITNESS_YEARS : MAX_WEIGHT}
          step={i ? 1 : 5}
          dots={false}
          defaultValue={value}
          value={value}
          onChange={(value) => handleChange(value, name)}
          disabled={!type}
        />
      </StyledRange>
    </StyledRangeinputContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
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

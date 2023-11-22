import { css, styled } from "styled-components";
import { MdClose } from "react-icons/md";
import { FaDumbbell } from "react-icons/fa";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
`;

export const Header = styled.div`
  margin-bottom: 10px;
  position: relative;

  & > h2 {
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    padding: 16px;
    font-size: 22px;
    font-weight: bold;
    color: #1f1f1f;
    box-sizing: border-box;
  }

  & button {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 70px;
    font-size: 14px;
    font-weight: bold;
    padding: 10px;
    border: none;
    border-radius: 17px;
    outline: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

export const CloseButton = styled(MdClose)`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  border-radius: 100%;
  font-size: 22px;
  font-weight: bold;
  padding: 5px;
  cursor: pointer;
`;

export const FilterTypes = styled.div`
  display: flex;
  gap: 5px;
`;
export const FilterRange = styled.div`
  padding: 12px;
`;

const enableBox = css`
  color: #2851e8;
  background-color: #ffffff;
  border-bottom: 4px solid #2851e8;
  box-shadow: 2px 10px 10px 0px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;
const disableBox = css`
  background-color: #faf9f6;
  color: #b5b4b3;
`;

export const Box = styled.div<{ isChecked?: boolean }>`
  margin-bottom: 10px;
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  ${({ isChecked }) => (isChecked ? enableBox : disableBox)};
`;

export const DumbbellIcon = styled(FaDumbbell)`
  font-size: 20px;
`;

import styled from "styled-components";

export const StyledButtonContainer = styled.article`
  position: sticky;
  top: 55px;
  z-index: 20;
  width: 100%;
  background-color: white;
  border-bottom: 0.0625rem solid #f2f2f2;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export const StyledButtonBox = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: ${({ theme }) => theme.size.maxWidth}px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 8px;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const StyledButton = styled.button`
  appearance: none;
  background-color: #fafbfc;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow:
    rgba(27, 31, 35, 0.04) 0 1px 0,
    rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292e;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  font-weight: 500;
  list-style: none;
  padding: 3px 8px;
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;

  &:hover {
    background-color: #f3f4f6;
    text-decoration: none;
    transition-duration: 0.1s;
  }

  &:active {
    background-color: #edeff2;
    box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
    transition: none 0s;
  }

  &:focus {
    outline: 1px transparent;
  }

  &:before {
    display: none;
  }

  &:-webkit-details-marker {
    display: none;
  }
`;

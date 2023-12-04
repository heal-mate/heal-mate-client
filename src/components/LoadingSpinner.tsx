import { theme } from "@/styles/theme";
import SyncLoader from "react-spinners/SyncLoader";
import { styled } from "styled-components";

export default function LoadingSpinner() {
  return (
    <StyledBackGround>
      <SyncLoader color={theme.colors.point} speedMultiplier={1} />
    </StyledBackGround>
  );
}

const StyledBackGround = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #d3d3d38f;
  z-index: 9999;
`;

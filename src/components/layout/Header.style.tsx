import { styled } from "styled-components";

export const Container = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.point};
  width: 100%;
  height: 3.5rem;
  position: fixed;
  z-index: 999;
  padding: 0.75rem 1.25rem;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

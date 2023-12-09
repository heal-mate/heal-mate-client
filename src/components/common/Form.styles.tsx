import styled, { css } from "styled-components";

export const FormStyle = {
  Form: styled.form`
    font-size: 1rem;
    width: 100%;
    max-width: 430px;
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem;
  `,

  Label: styled.label`
    margin-top: 1rem;
    padding: 0.5rem 0.125rem;
    &:first-child {
      margin-top: 0;
    }
  `,

  Input: styled.input`
    padding: 1rem;
    border-radius: 3px;
    border: 1px solid ${({ theme }) => theme.colors.gray600};
    outline: none;
    &:disabled {
      color: ${({ theme }) => theme.colors.gray600};
      background-color: ${({ theme }) => theme.colors.gray200};
    }
  `,

  Button: styled.button<{ $buttonTheme: "contain" | "outline" | "point" }>`
    padding: 1rem;
    border-radius: 3px;
    cursor: pointer;
    margin-top: 1rem;
    ${({ $buttonTheme }) =>
      $buttonTheme === "outline"
        ? css`
            background-color: white;
            color: ${({ theme }) => theme.colors.black};
            border: 1px solid ${({ theme }) => theme.colors.black};
          `
        : $buttonTheme === "point"
          ? css`
              background-color: ${({ theme }) => theme.colors.point};
              color: white;

              border: none;
            `
          : css`
              background-color: ${({ theme }) => theme.colors.black};
              color: white;

              border: none;
            `}
  `,

  Select: styled.select`
    padding: 1rem;
    border-radius: 3px;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
    background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 50%;
  `,
};

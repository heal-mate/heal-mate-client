import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  *{box-sizing:border-box;}
  a{
    text-decoration: none;
    color: #000;
  }
  .alert-icon {
    margin: 2.5em auto 0.6em;
  }
`;

export default GlobalStyle;

import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import NotoSansKRRegular from "@/assets/fonts/NotoSansKR-Regular.ttf";

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'NotoSansKR';
    src: url(${NotoSansKRRegular}) format('truetype');
  }
  *{
    box-sizing:border-box;
    
  }

  body {
    font-family: NotoSansKR, Arial, Helvetica, sans-serif;
  }
  
  a{
    text-decoration: none;
    color: #000;
  }
  .alert-icon {
    margin: 2.5em auto 0.6em;
  }
  .alert-popup {
    max-width: 22em;
  }
`;

export default GlobalStyle;

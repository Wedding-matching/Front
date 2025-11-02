import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
    background: linear-gradient( #EFF6FF, #ffffffff, #FAF5FF);
    color: #333;
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
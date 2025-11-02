import Router from "./router/router";
import GlobalStyle from "./styles/GlobalStyle.js"; //.js
import Header from "./components/Layout/Header.jsx";
import Footer from "./components/Layout/Footer.jsx";
import styled from "styled-components";

function App() {
  return (
    <AppWrap>
      <GlobalStyle />
      <Header />
      <MainWrap>
        <Router />
      </MainWrap>
      <Footer />
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; {/*화면 전체 높이*/}
`;

const MainWrap = styled.div`
  flex: 1; {/*헤더와 푸터를 제외한 나머지 공간 차지*/}
  overflow-y: auto; {/*내용이 넘칠 경우 스크롤 생성*/}
`;
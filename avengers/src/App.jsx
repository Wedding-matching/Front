import Router from "./router/Router";
import GlobalStyle from "./styles/GlobalStyle"; //.js
import Header from "./components/Header";

function App() {
  return (
    <div id="root">
      <GlobalStyle />
      <Header />
      <Router />
    </div>
  );
}

export default App;x
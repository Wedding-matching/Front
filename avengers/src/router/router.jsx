import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import BubbleChart from "../components/Chart/BubbleChart";
import RoundChart from "../components/Chart/RoundChart";
// import SearchModal from "../pages/SearchModal";

function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )

}

export default Router;
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

        {/*테스트용*/}
        {/* <Route path="/searchmodal" element={<SearchModal/>}/> */}
        <Route path="/roundchart" element={<RoundChart />}/>
        <Route path="/bubble" element={<BubbleChart />} />

      </Routes>
    </BrowserRouter>
  )

}

export default Router;
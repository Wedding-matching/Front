import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
// import SearchModal from "../pages/SearchModal";

function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/searchmodal" element={<SearchModal/>}/> */}
      </Routes>
    </BrowserRouter>
  )

}

export default Router;
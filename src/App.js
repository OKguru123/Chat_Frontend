import React from "react";
import Home from "./pages/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequestApprovel from "./pages/request-approvel";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/approve-request" element={<RequestApprovel />} />
        </Routes>
      </Router>

      {/* <Home /> */}
    </>
  );
};

export default App;

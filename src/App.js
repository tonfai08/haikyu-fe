import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Admin from "./pages/Admin";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { generateToken } from "./utils/helper/token";

function App() {
  useEffect(() => {
    const setTokenIfNotPresent = () => {
      if (!localStorage.getItem("token")) {
        const token = generateToken();
        localStorage.setItem("token", token);
      }
    };

    setTokenIfNotPresent();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/hq-krtsk-khn/admin/" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages and components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;

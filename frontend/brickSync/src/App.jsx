import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Setup from "./pages/Setup/Setup";
import SetupPopup from "./components/SetupPopup/SetupPopup";
import JoinPopup from "./components/JoinPopup/JoinPopup";

const App = () => {
  const [showSetup, setShowSetup] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  return (
    <div className="app">
      {showSetup ? <SetupPopup /> : <></>}
      {showJoin ? <JoinPopup /> : <></>}
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/setup"
            element={
              <Setup setShowSetup={setShowSetup} setShowJoin={setShowJoin} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

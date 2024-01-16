import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./dashboard/pages/DashboardPage";
import SignupPage from "./signup/pages/SignupPage";
import LoginPage from "./login/pages/LoginPage";
import { isUserLoggedIn } from "./shared/utils/AuthService";

function App() {
  return (
    <div>
      <Routes>
      <Route
          path="/"
          element={isUserLoggedIn() ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!isUserLoggedIn() ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;

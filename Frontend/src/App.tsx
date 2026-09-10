import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import { useSelector } from "react-redux";
import type { RootState } from "./Redux/Store";

interface Props {

}

const App: React.FC<Props> = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  console.log(isLoggedIn);
  return (
    <div className="bg-black">

      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<Navigate to="/auth" replace />} />
          </>
        )}
        



      </Routes>


    </div>
  );
};

export default App;
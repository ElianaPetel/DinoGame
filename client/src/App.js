import "./App.css";
import React, { useState } from "react";
import Homepage from "./components/Homepage/Homepage";
import MyNavbar from "./components/Navbar/Navbar";
import VerifyUser from "./components/utils/VerifyUser";
import AboutPage from "./components/AboutPage/AboutPage";
import LoginSignupPage from "./components/LoginSignupPage/LoginSignupPage";
import HighscoresPage from "./components/HighScoresPage/HighscoresPage";
import UserProfile from "./components/UserProfile/UserProfile";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./components/Contexts/UserContext";
import { useSelector } from "react-redux";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import PageNotFound from "./components/PageNotFound";

function App() {
  const [userCredentials, setUserCredentials] = useState(null);
  const isLoadingScreen = useSelector((state) => state.engine.loadingScreen);
  const [isSelect, setIsSelect] = useState({ state: false, img: null });
  const [error, setError] = useState();
  const [datesResults, setDatesResults] = useState([]);
  const [pointsResults, setPointsResults] = useState([]);
  const [isNewHigh, setIsNewHigh] = useState(false);
  return (
    <div className="App">
      <UserContextProvider
        value={{
          userCredentials,
          setUserCredentials,
          isSelect,
          setIsSelect,
          error,
          setError,
          datesResults,
          setDatesResults,
          pointsResults,
          setPointsResults,
          isNewHigh,
          setIsNewHigh,
        }}
      >
        <BrowserRouter>
          <MyNavbar />
          {isLoadingScreen && <LoadingPage />}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/highscores" element={<HighscoresPage />} />
            {localStorage.getItem("token") && (
              <Route path="/profile" element={<UserProfile />} />
            )}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login-signup" element={<LoginSignupPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <VerifyUser redirect={false} />
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;

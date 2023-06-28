import { useContext, useEffect, useState } from "react";
import { UserContext } from "./Contexts/UserContext";
import { setLoadingScreen } from "../redux/engineSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setMainCharacterUrl,
  setMainCharacterUrlStatic,
} from "../redux/mainCharacterSlice";
import { useNavigate } from "react-router";

export default function useUserHooks() {
  const { isSelect } = useContext(UserContext);
  const navigate = useNavigate();
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
  const dispatch = useDispatch();
  const {
    userCredentials,
    setUserCredentials,
    datesResults,
    setDatesResults,
    pointsResults,
    setPointsResults,
    setIsNewHigh,
  } = useContext(UserContext);
  const [preDatesResults, setPreDatesResults] = useState([]);
  const [prePointsResults, setPrePointsResults] = useState([]);
  const totalScore = useSelector((state) => state.engine.score);

  function handleVerifyUser() {
    const raw = "";
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("https://dino-trex-game.glitch.me/users/verify", requestOptions)
      .then((response) => response.text())
      //.then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  async function updateProfile(newProfile) {
    myHeaders.append("Content-Type", "application/json");
    try {
      const response = await fetch("https://dino-trex-game.glitch.me/users/profile", {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(newProfile),
      });
      const updatedProfile = await response.json();
      if (!updatedProfile.error) {
        fetchUserData();
        return true;
      } else {
        return updatedProfile.error[0];
      }
    } catch (err) {
      return err;
    }
  }

  function fetchUserData() {
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch("https://dino-trex-game.glitch.me/users/profile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUserCredentials(result);
      })
      .catch((error) => console.log("error", error));
  }
  async function handleUploads(image) {
    const formdata = new FormData();
    formdata.append("file", image);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://dino-trex-game.glitch.me/users/upload",
        requestOptions
      );
      const uploadedPic = await response.json();
      if (!uploadedPic.error) {
        fetchUserData();
        return true;
      } else {
        if (uploadedPic.message) {
          return uploadedPic.message[0];
        } else return uploadedPic.error[0];
      }
    } catch (err) {
      return err;
    }
  }

  async function handleChooseChar() {
    dispatch(setMainCharacterUrl(isSelect.img.src));
    dispatch(setMainCharacterUrlStatic(isSelect.img.staticSrc));

    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      character: {
        staticSrc: isSelect.img.staticSrc,
        src: isSelect.img.src,
      },
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://dino-trex-game.glitch.me/users/update-character",
        requestOptions
      );
      const updatedChar = await response.json();
      if (!updatedChar.error) {
        fetchUserData();
        return true;
      } else {
        return updatedChar.error[0];
      }
    } catch (err) {
      return err;
    }
  }

  function handlePostScores(score) {
    if (score !== 0) {
      //console.log("from the UserHook component", { score });
      dispatch(setLoadingScreen(true));
      myHeaders.append("Content-Type", "application/json");

      fetch("https://dino-trex-game.glitch.me/users/result", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ score: score + 1 }),
      })
        .then((response) => response.text())
        .then((result) => {
          fetchUserData();
        })
        .catch((error) => console.log("error", error));

      dispatch(setLoadingScreen(false));
    }
  }

  async function handleSignup(userInput) {
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    };
    try {
      const response = await fetch(
        "https://dino-trex-game.glitch.me/users/register",
        settings
      );
      const signUp = await response.json();
      if (!signUp.error) {
        fetchUserData();
        const logInRes = await loginSubmit(userInput);
        return true;
      } else {
        return signUp.error;
      }
    } catch (err) {
      return err;
    }
  }

  async function loginSubmit(userInput) {
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    };
    try {
      const response = await fetch(
        "https://dino-trex-game.glitch.me/users/login",
        settings
      );
      const login = await response.json();
      if (!login.error) {
        const token = login.token;
        const user = login.user;
        localStorage.setItem("token", token);
        setUserCredentials(user);
        navigate("/");
        fetchUserData();
        return true;
      } else {
        return login.error;
      }
    } catch (err) {
      return err;
    }
  }

  async function fetchHighScores() {
    const settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "https://dino-trex-game.glitch.me/users/top-results-global",
        settings
      );
      const results = await response.json();
      if (!results.error) {
        return { status: true, message: results };
      } else {
        return results.error;
      }
    } catch (err) {
      return err;
    }
  }

  function findResults() {
    if (userCredentials && userCredentials.results) {
      userCredentials.results.map((result) => {
        if (result !== undefined) {
          preDatesResults.push(result.date);
          preDatesResults.forEach((c) => {
            if (!datesResults.includes(c)) {
              datesResults.push(c);
            }
            setDatesResults(datesResults);
          });
          prePointsResults.push(result.score);
          prePointsResults.forEach((c) => {
            if (!pointsResults.includes(c)) {
              pointsResults.push(c);
            }
            setPointsResults(pointsResults);
            const res = Math.max(...pointsResults);
            if (res < totalScore) {
              setIsNewHigh(true);
            }
          });
        }
      });
    }
  }

  return {
    updateProfile,
    fetchUserData,
    handleUploads,
    handleChooseChar,
    handlePostScores,
    loginSubmit,
    handleSignup,
    fetchHighScores,
    findResults,
  };
}

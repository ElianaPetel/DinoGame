import "./MainCharacter.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useCallback, useMemo } from "react";
import jumpAudio from "../../media/audio/jump.mp3";
import backgroundMusic from "../../media/audio/run_audio.mp3";
import character6 from "../../media/img/gif/character6.gif";
import character5 from "../../media/img/gif/mainCharacter5.gif";
import character8 from "../../media/img/gif/character8.gif";

import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import {
  mainCharacterJumping,
  mainCharacterHeight,
  mainCharacterLeft,
  mainCharacterTop,
  mainCharacterWidth,
  mainCharacterBottom,
} from "../../redux/mainCharacterSlice";
import { setReady, setDie, setScore } from "../../redux/engineSlice";

import dieAudio from "../../media/audio/GameOver.mp3";
import useUserHooks from "../UserHooks";
const MainCharacter = () => {
  const { userCredentials, setUserCredentials } = useContext(UserContext);
  const mainCharacterRef = useRef();
  const dispatch = useDispatch();
  const mainCharacterSrcStatic = useSelector(
    (state) => state.mainCharacter.staticSrc
  );
  const mainCharacterSrc = useSelector((state) => state.mainCharacter.src);
  const loadingScreen = useSelector((state) => state.engine.loadingScreen);
  const die = useSelector((state) => state.engine.die);
  const isPlay = useSelector((state) => state.engine.play);
  const isPlayMusic = useSelector((state) => state.engine.isPlayMusic);
  const score = useSelector((state) => state.engine.score);

  const mainCharacter_jump = useSelector(
    (state) => state.mainCharacter.jumping
  );
  const mainCharacter_height = useSelector(
    (state) => state.mainCharacter.height
  );
  const mainCharacter_left = useSelector((state) => state.mainCharacter.left);
  const mainCharacter_top = useSelector((state) => state.mainCharacter.top);
  const mainCharacter_width = useSelector((state) => state.mainCharacter.width);

  const obs1_height = useSelector((state) => state.obstacle.obs1Height);
  const obs1_left = useSelector((state) => state.obstacle.obs1Left);
  const obs1_top = useSelector((state) => state.obstacle.obs1Top);
  const obs1_width = useSelector((state) => state.obstacle.obs1Width);

  const obs2_height = useSelector((state) => state.obstacle.obs2Height);
  const obs2_left = useSelector((state) => state.obstacle.obs2Left);
  const obs2_top = useSelector((state) => state.obstacle.obs2Top);
  const obs2_width = useSelector((state) => state.obstacle.obs2Width);

  const { fetchUserData, handlePostScores, findResults } = useUserHooks();

  const jump = useMemo(() => {
    return new Audio(jumpAudio);
  }, []);

  const mainCharacterDie = useMemo(() => {
    return new Audio(dieAudio);
  }, []);

  const bgMusic = useMemo(() => {
    return new Audio(backgroundMusic);
  }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleKey = useCallback(
    (e) => {
      if (e.code === "Enter" && !isPlay && !die) {
        dispatch(setReady(true));
      }
      if (
        mainCharacter_jump === false &&
        e.code === "Space" &&
        isPlay &&
        !die
      ) {
        if (isPlayMusic) {
          jump.play();
        }
        dispatch(mainCharacterJumping(true));

        setTimeout(() => {
          dispatch(mainCharacterJumping(false));
          jump.pause();
          jump.currentTime = 0;
        }, 400);
      }
    },
    [mainCharacter_jump, jump, dispatch, isPlay, die, loadingScreen]
  );

  useEffect(() => {
    if (
      mainCharacter_left < obs1_left &&
      mainCharacter_left + mainCharacter_width > obs1_left &&
      mainCharacter_top + mainCharacter_height > obs1_top
    ) {
      handlePostScores(score);
      dispatch(setDie(true));
      findResults();
      isPlayMusic && mainCharacterDie.play();
      dispatch(setReady(false));
      dispatch(setScore(0));
    }
    if (
      mainCharacter_left < obs2_left &&
      mainCharacter_left + mainCharacter_width > obs2_left &&
      mainCharacter_top + mainCharacter_height > obs2_top
    ) {
      handlePostScores(score);
      dispatch(setDie(true));
      findResults();
      isPlayMusic && mainCharacterDie.play();
      dispatch(setReady(false));
      dispatch(setScore(0));
    }
  }, [
    mainCharacter_left,
    obs1_left,
    obs1_width,
    mainCharacter_width,
    mainCharacter_top,
    obs1_top,
    obs1_height,
    mainCharacter_height,
    dispatch,
    mainCharacterDie,
    obs2_left,
    obs2_width,
    obs2_top,
    obs2_height,
  ]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    dispatch(
      mainCharacterHeight(
        mainCharacterRef.current.getBoundingClientRect().height
      )
    );
    dispatch(
      mainCharacterLeft(mainCharacterRef.current.getBoundingClientRect().left)
    );
    dispatch(
      mainCharacterTop(mainCharacterRef.current.getBoundingClientRect().top)
    );
    dispatch(
      mainCharacterWidth(mainCharacterRef.current.getBoundingClientRect().width)
    );
    dispatch(
      mainCharacterBottom(
        mainCharacterRef.current.getBoundingClientRect().bottom
      )
    );

    if (isPlay) {
      if (isPlayMusic) {
        bgMusic.play();
      }
    } else {
      /*       dispatch(setScore(0));
       */ bgMusic.pause();
      bgMusic.currentTime = 0;
    }
  }, [handleKey, dispatch, bgMusic, isPlay]);

  useEffect(() => {
    if (!isPlayMusic) {
      bgMusic.pause();
      mainCharacterDie.pause();
      jump.pause();
      bgMusic.currentTime = 0;
      mainCharacterDie.currentTime = 0;
      jump.currentTime = 0;
    }
  }, [isPlayMusic]);
  console.log(userCredentials);
  return (
    <div className="mainCharacter-container">
      {!die && (
        <img
          src={
            isPlay
              ? userCredentials?.character?.src
                ? userCredentials.character.src
                : mainCharacterSrc
              : userCredentials?.character?.staticSrc
              ? userCredentials.character.staticSrc
              : mainCharacterSrcStatic
          }
          alt=""
          className={
            userCredentials?.character?.src
              ? userCredentials.character.src == character5
                ? `mainCharacter smaller ${mainCharacter_jump && "jump"}`
                : userCredentials.character.src == character6
                ? `mainCharacter bigger ${mainCharacter_jump && "jump"}`
                : userCredentials.character.src == character8
                ? `mainCharacter bigger ${mainCharacter_jump && "jump"}`
                : `mainCharacter ${mainCharacter_jump && "jump"}`
              : `mainCharacter smaller ${mainCharacter_jump && "jump"}`
          }
          ref={mainCharacterRef}
        />
      )}
      {die && (
        <img
          src={MainCharacter}
          alt=""
          className={`mainCharacter ${die ? "die" : ""}`}
          ref={mainCharacterRef}
        />
      )}
    </div>
  );
};
export default MainCharacter;

import { useDispatch, useSelector } from "react-redux";
import "./GameControls.css";
import { setDie } from "../../redux/engineSlice";
import { useContext, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";

export default function GameOverCard() {
  const dispatch = useDispatch();
  const totalScore = useSelector((state) => state.engine.score);
  const { isNewHigh, setIsNewHigh } = useContext(UserContext);

  return (
    <>
      <div className="gameOverCard">
        <h2>GAME OVER!</h2>
        <p className="main-heading">
          {isNewHigh ? "New highscore!" : "YOUR SCORE:"}
        </p>
        <p className="your-score">{totalScore}</p>
        <button
          type="button"
          onClick={() => {
            dispatch(setDie(false));
            setIsNewHigh(false);
          }}
          className="play-button"
        >
          PLAY AGAIN
        </button>
      </div>
    </>
  );
}

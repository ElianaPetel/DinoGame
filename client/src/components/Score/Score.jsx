import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScore } from "../../redux/engineSlice";
import "./Score.css";

const Score = () => {
  const score = useSelector((state) => state.engine.score);
  const play = useSelector((state) => state.engine.play);
  const die = useSelector((state) => state.engine.die);
  const dispatch = useDispatch();

  useEffect(() => {
    if (play && !die) {
      setTimeout(() => {
        dispatch(setScore(score + 1));
      }, 100);
    }
  }, [dispatch, play, score, die]);
//console.log('from the score component', {score})
  return (
    <div className="score-container">
      {play && <p className="score">Score: {score}</p>}
    </div>
  );
};
export default Score;

import "./GameControls.css";
import { useSelector, useDispatch } from "react-redux";
import { setReady, setScore } from "../../redux/engineSlice";
import Message from "../Message/Message";
import GameOverCard from "./GameOverCard";
const GameControls = () => {
  const isPlay = useSelector((state) => state.engine.play);

  const isDie = useSelector((state) => state.engine.die);
  const dispatch = useDispatch();
  const isLoadingScreen = useSelector((state) => state.engine.loadingScreen);

  const handleStart = () => {
    if (!isPlay && !isDie) {
      dispatch(setScore(0))
      dispatch(setReady(true));
    }
  };
  return (
    <>
      {!isPlay && <Message />}

      {!isPlay && !isDie && (
        <button className="control-start-button" onClick={handleStart}>
          START
        </button>
      )}
      {isDie && !isPlay && !isLoadingScreen && <GameOverCard />}
    </>
  );
};
export default GameControls;

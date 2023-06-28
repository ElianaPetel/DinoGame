import Title from "./Title/Title";
import Score from "./Score/Score";
import { useDispatch, useSelector } from "react-redux";
import soundOn from "../media/img/soundOnImg.png";
import soundOff from "../media/img/mute.png";
import { setIsPlayMusic } from "../redux/engineSlice";

export default function ConstElements() {
  const isPlayMusic = useSelector((state) => state.engine.isPlayMusic);
  const dispatch = useDispatch();

  function handleClickSound() {
    if (isPlayMusic) {
      dispatch(setIsPlayMusic(false));
    } else {
      dispatch(setIsPlayMusic(true));
    }
  }
  return (
    <>
      <img
        src={isPlayMusic ? soundOn : soundOff}
        style={{
          position: "absolute",
          width: "40px",
          height: "40px",
          right: "2%",
          bottom: "8%",
          // backgroundColor: "white",
          borderRadius: "30px",
          padding: "5px",
          border: "3px solid black",
          zIndex: "100"
        }}
        onClick={handleClickSound}
      ></img>
      <Title />
      <Score />
    </>
  );
}

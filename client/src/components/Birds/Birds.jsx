import "./Birds.css";
import { useSelector } from "react-redux";

const Birds = () => {
  const isPlay = useSelector((state) => state.engine.play);

  return (
    <div className="birds-container">
        <div className={isPlay ? "birds birds-animate" : "birds"}></div>
    </div>
  )
}
export default Birds;
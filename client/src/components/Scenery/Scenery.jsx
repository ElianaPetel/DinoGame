import { useSelector } from "react-redux";
import "./Scenery.css";

const Scenery = () => {
  const isPlay = useSelector((state) => state.engine.play);

  return <div className={isPlay ? "scenery scenery-animate" : "scenery"} />;
};
export default Scenery;
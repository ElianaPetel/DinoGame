import "./Message.css";
import { useSelector } from "react-redux";

export default function PressAnyKey() {
  const isDie = useSelector((state) => state.engine.die);

  return (
    <div className={isDie ? "press-container isBlurred" : "press-container"}>
      <p className="press-title">ENTER KEY - START GAME</p>
      <p className="press-subtitle">SPACE KEY - JUMP!</p>
    </div>
  );
}

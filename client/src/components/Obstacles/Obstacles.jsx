import "./Obstacles.css";
import obstacle1 from "../../media/img/gif/dinosObstacle.gif";
import { useRef, useEffect } from "react";
import obstacle3 from "../../media/img/gif/Obstacle4.gif";

import { useDispatch, useSelector } from "react-redux";
import {
  obstacle1Height,
  obstacle1Left,
  obstacle1Top,
  obstacle1Width,
  obstacle2Height,
  obstacle2Left,
  obstacle2Top,
  obstacle2Width,
  obstacle1Bottom,
} from "../../redux/obstacleSlice";
import { setSpeed } from "../../redux/engineSlice";
/* import obstacle3 from "../../media/img/gif/obstacle3.gif";
 */ import { useLocation } from "react-router-dom";

const Obstacles = () => {
  const dispatch = useDispatch();
  const isPlay = useSelector((state) => state.engine.play);
  const speed = useSelector((state) => state.engine.speed);
  const obstacle1Ref = useRef();
  const obstacle2Ref = useRef();
  const location = useLocation();

  useEffect(() => {
    if (isPlay && location.pathname == "/") {
      setInterval(() => {
        dispatch(
          obstacle1Height(
            obstacle1Ref.current
              ? obstacle1Ref.current.getBoundingClientRect().height
              : obstacle2Width(0)
          )
        );
        dispatch(
          obstacle1Left(
            obstacle1Ref.current
              ? obstacle1Ref.current.getBoundingClientRect().left
              : obstacle2Width(0)
          )
        );
        dispatch(
          obstacle1Top(
            obstacle1Ref.current
              ? obstacle1Ref.current.getBoundingClientRect().top
              : obstacle2Width(0)
          )
        );
        dispatch(
          obstacle1Width(
            obstacle1Ref.current
              ? obstacle1Ref.current.getBoundingClientRect().width
              : obstacle2Width(0)
          )
        );
        dispatch(
          obstacle1Bottom(
            obstacle1Ref.current
              ? obstacle1Ref.current.getBoundingClientRect().bottom
              : obstacle2Width(0)
          )
        );

        dispatch(
          obstacle2Ref.current
            ? obstacle2Height(
                obstacle2Ref.current.getBoundingClientRect().height
              )
            : obstacle2Width(0)
        );
        dispatch(
          obstacle2Ref.current
            ? obstacle2Left(obstacle2Ref.current.getBoundingClientRect().left)
            : obstacle2Width(0)
        );
        dispatch(
          obstacle2Ref.current
            ? obstacle2Top(obstacle2Ref.current.getBoundingClientRect().top)
            : obstacle2Width(0)
        );
        dispatch(
          obstacle2Ref.current
            ? obstacle2Width(obstacle2Ref.current.getBoundingClientRect().width)
            : obstacle2Width(0)
        );
      }, 100);
    }
  }, [isPlay, dispatch]);

  useEffect(() => {
    if (speed >= 0) {
      setTimeout(() => {
        dispatch(setSpeed(0.0001));
      }, 1000);
    }
  }, [speed, dispatch]);

  return (
    <div className="obstacles-container">
      <img
        src={obstacle1}
        className={isPlay ? "obstacle1 obstacle1-move" : "obstacle1"}
        style={
          isPlay
            ? { animationDuration: `${4 - speed}s` }
            : { animationDuration: `3s` }
        }
        ref={obstacle1Ref}
      />
      <img
        src={obstacle3}
        className={isPlay ? "obstacle2 obstacle2-move" : "obstacle2"}
        style={
          isPlay
            ? { animationDuration: `${7 - speed}s` }
            : { animationDuration: `6s` }
        }
        ref={obstacle2Ref}
      />
    </div>
  );
};
export default Obstacles;

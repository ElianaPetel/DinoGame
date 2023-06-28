import React from "react";
import "./homepage.css";
import Birds from "../Birds/Birds";
import Obstacles from "../Obstacles/Obstacles";
import Scenery from "../Scenery/Scenery";
import MainCharacter from "../MainCharacter/MainCharacter";
import ConstElements from "../ConstElements";
import GameControls from "../GameControls/GameControls";
import { useSelector } from "react-redux";

function Homepage() {
  const isDie = useSelector((state) => state.engine.die);

  return (
    <div className="game-wrapper">
        <ConstElements />
      <div className={isDie ? "game-container blurredBg" : "game-container"}>
        <Scenery />
        <MainCharacter />
        <Birds />
        <Obstacles />
      </div>
      <GameControls />
    </div>
  );
}

export default Homepage;

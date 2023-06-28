import React from "react";
import "./aboutPage.css";
import nadavImage from "./nadav.jpeg";
import elianaImage from "./eliana.png";
import mikeImage from "./mike.jpg";
import dino7 from "../../media/img/gif/character7.gif";
import dino8 from "../../media/img/gif/character8.gif";
import dino9 from "../../media/img/gif/character9.gif";
import dino10 from "../../media/img/gif/character10.gif";
import dino5 from "../../media/img/gif/mainCharacter5.gif";

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About Our App</h1>
      <div className="founders-section">
        <div className="founder-card">
          <div className="founder-image">
            <img src={nadavImage} alt="Nadav" className="nadav" />
          </div>
          <div className="founder-details">
            <h2>Nadav</h2>
            <p>Frontend</p>
          </div>
        </div>
        <div className="founder-card">
          <div className="founder-image">
            <img src={elianaImage} alt="Eliana" className="eliana" />
          </div>
          <div className="founder-details">
            <h2>Eliana</h2>
            <p>Game Dev and Integration</p>
          </div>
        </div>
        <div className="founder-card">
          <div className="founder-image">
            <img src={mikeImage} alt="Mike" className="mike" />
          </div>
          <div className="founder-details">
            <h2>Mike</h2>
            <p>Backend</p>
          </div>
        </div>
      </div>
      <div className="about-text">
        <p>
          Nadav, Eliana, and Mike are the founders of the app. They were the
          masterminds behind the famous Google Dinosaur Game, which has become a
          beloved pastime for millions of people around the world.
        </p>
        <p>
          Nadav is a frontend developer with a passion for creating intuitive
          and user-friendly interfaces. Eliana specializes in game development
          and integration, bringing the game to life with her expertise. Mike is
          the backend wizard who ensures that everything runs smoothly behind
          the scenes.
        </p>
        <p>
          Together, they combined their skills and creativity to develop this
          wonderful app and provide an amazing experience for users. Thanks to
          their dedication and hard work this amazing app is now a reality.
        </p>
      </div>
      <div className="running-dino">
        <img className="dino7" src={dino7} alt="" />
        <img className="dino8" src={dino8} alt="" />
        <img className="dino9" src={dino9} alt="" />
        <img className="dino10" src={dino10} alt="" />
        <img className="dino5" src={dino5} alt="" />
      </div>
    </div>
  );
};

export default AboutPage;

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import dinoMain from "../media/img/gif/mainCharacter.webp";
import { useContext } from "react";
import { UserContext } from "./Contexts/UserContext";

export default function PageNotFound() {
  const navigate = useNavigate();
  const { userCredentials } = useContext(UserContext);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5%",
        color: "white",
      }}
    >
      <img src={userCredentials ? userCredentials.character : dinoMain}></img>
      <h3 style={{ marginTop: "5%" }}>He is lost... go back to the game:</h3>
      <Button
        style={{
          backgroundColor: "#46b908",
          border: "none",
          padding: "1%",
          fontSize: "1.2rem",
          margin: "5%",
        }}
        onClick={() => navigate("/")}
      >
        To the game
      </Button>
    </div>
  );
}

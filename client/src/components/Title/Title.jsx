import { useContext } from "react";
import "./Title.css";
import { UserContext } from "../Contexts/UserContext";
const Title = () => {
  const { userCredentials } = useContext(UserContext);
  return (
    <>
      <h1 className="title">DINO GAME</h1>;
    </>
  );
};
export default Title;

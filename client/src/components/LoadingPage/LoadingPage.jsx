import "./loadingPage.css";
import dinoSpinner from "../../media/img/gif/loadingDino.webp";
export default function LoadingPage() {
  return (
    <div className="spinnerPage">
      <img className="dinoSpinner" src={dinoSpinner}></img>
      <h1 className="loading">Loading...</h1>
    </div>
  );
}

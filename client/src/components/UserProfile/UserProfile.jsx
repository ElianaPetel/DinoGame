import { useContext, useEffect, useState } from "react";
import "./UserProfile.css";
import userIconeBeforeUpload from "../../media/img/profile.jpg";
import editIcone from "../../media/img/edit.png";
import { useSelector } from "react-redux";
import CharactersModal from "../CharactersModal/CharactersModal";
import PerformanceChart from "./PerformanceChart";
import { UserContext } from "../Contexts/UserContext";
import trophy from "../../media/img/match-game-trophy.png";
import UpdateUserProfile from "./UpdateUserProfile";
import { Button } from "react-bootstrap";
import useUserHooks from "../UserHooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserProfile() {
  const [charactersModalShow, setCharactersModalShow] = useState(false);
  const { userCredentials, pointsResults, datesResults } =
    useContext(UserContext);

  const [isShowModalUpdateProfile, setIsShowModalUpdateProfile] =
    useState(false);

  const handleClose = () => setIsShowModalUpdateProfile(false);
  const handleShow = () => setIsShowModalUpdateProfile(true);
  const { fetchUserData, handleUploads, findResults } = useUserHooks();

  const showErrorToast = (error) => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showSuccessToast = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const mainCharacterSrcStatic = useSelector(
    (state) => state.mainCharacter.staticSrc
  );
  async function handleUploadPic(e) {
    const response = await handleUploads(e.target.files[0]);
    if (response === true) {
      showSuccessToast("Your profile picture was successfully updated!");
    } else {
      showErrorToast(response);
    }
  }

  useEffect(() => {
    fetchUserData();
    findResults();
  }, []);

  useEffect(() => {
    findResults();
  }, [userCredentials]);

  function handleEditProfile() {
    handleShow();
  }

  function handleEditCharacter() {
    setCharactersModalShow(true);
  }
  return (
    <div className="mainUserProfile">
      <div className="containerUserProfile">
        <div className="topDivs">
          <div className=" topleftSubdiv">
            <label htmlFor="photo-upload" className="custom-file-upload fas">
              <div className="img-wrap img-upload">
                <img
                  className="photo-upload"
                  src={
                    userCredentials?.avatar
                      ? `http://localhost:4000/images/${userCredentials.avatar}`
                      : userIconeBeforeUpload
                  }
                />
              </div>
              <input
                id="photo-upload"
                type="file"
                onChange={(e) => {
                  handleUploadPic(e);
                }}
              />
            </label>{" "}
            <div className="userInfo">
              <h3>Welcome,</h3>
              <h4>
                {userCredentials?.nickname
                  ? userCredentials.nickname
                  : ["user"]}
              </h4>
              <div>{userCredentials?.email ? userCredentials.email : null}</div>

              <img
                className="editIcone"
                src={editIcone}
                onClick={handleEditProfile}
              ></img>
            </div>
          </div>{" "}
          <div className="topRightSubDivs ">
            <div className="editCharacterContainer">
              <div style={{ padding: "3%" }}>Your current character:</div>
              <img
                className="characterImg-upload"
                onClick={handleEditCharacter}
                src={
                  userCredentials?.character.staticSrc
                    ? userCredentials.character.staticSrc
                    : mainCharacterSrcStatic
                }
              />
              <Button
                className="buttonEditCharacter"
                onClick={handleEditCharacter}
              >
                <img src={editIcone} className="EditIconeCharacter"></img>Edit
                character
              </Button>
            </div>
            <div className="scoresContainer">
              <div>Top score</div>
              <img src={trophy} className="trophyTopScore"></img>
              <h3>
                {Array.isArray(pointsResults) && pointsResults.length !== 0
                  ? Math.max(...pointsResults)
                  : "no score yet"}
              </h3>
            </div>
          </div>
        </div>

        <div className="bottomDiv">
          <h4>Performance Graph over the last 10 games</h4>
          <PerformanceChart
            datesResults={datesResults}
            pointsResults={pointsResults}
          />
        </div>
      </div>
      <CharactersModal
        show={charactersModalShow}
        onHide={() => setCharactersModalShow(false)}
        showErrorToast={showErrorToast}
        showSuccessToast={showSuccessToast}
      />
      <UpdateUserProfile
        show={isShowModalUpdateProfile}
        handleClose={handleClose}
        showErrorToast={showErrorToast}
        showSuccessToast={showSuccessToast}
      />
      <ToastContainer />
    </div>
  );
}

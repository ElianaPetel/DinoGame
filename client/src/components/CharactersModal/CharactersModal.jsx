import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import "./CharactersModal.css";
import { useContext, useState } from "react";
import character5Static from "../../media/img/character5StandStill.jpg";
import character5 from "../../media/img/gif/mainCharacter5.gif";
import { UserContext } from "../Contexts/UserContext";
import useUserHooks from "../UserHooks";

export default function CharactersModal(props) {
  const { isSelect, setIsSelect } = useContext(UserContext);

  const charactersArray = useSelector(
    (state) => state.mainCharacter.charactersArray
  );
  const { handleChooseChar } = useUserHooks();

  async function handleEditChar() {
    const response = await handleChooseChar();
    console.log({ response });
    if (response === true) {
      props.showSuccessToast("Your character was successfully updated!");
    } else {
      props.showErrorToast(response);
    }
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Choose any of these characters...
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="bodyContainer">
          {charactersArray.map((character) => (
            <div
              className="charactersImg-wrap charactersImg-upload"
              onClick={() => setIsSelect({ state: true, img: character })}
            >
              <img
                className="charctersImg"
                src={
                  character.src == character5
                    ? character5Static
                    : character.staticSrc
                }
              ></img>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {isSelect.state && <Button onClick={handleEditChar}>Select</Button>}{" "}
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../Contexts/UserContext";
import useUserHooks from "../UserHooks";

function UpdateUserProfile({
  show,
  handleClose,
  showErrorToast,
  showSuccessToast,
}) {
  const { userCredentials } = useContext(UserContext);
  const [newProfile, setNewProfile] = useState({ ...userCredentials });
  const { updateProfile } = useUserHooks();
  const [isChangePassword, setIsChangePassword] = useState(false);
  async function handleUpdateProfile() {
    const response = await updateProfile(newProfile);
    console.log({ response });
    if (response === true) {
      showSuccessToast("Your profile was successfully updated!");
    } else {
      showErrorToast(response);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setNewProfile({ ...newProfile, nickname: e.target.value })
                }
                placeholder={
                  userCredentials?.nickname
                    ? userCredentials.nickname
                    : "username"
                }
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) =>
                  setNewProfile({ ...newProfile, email: e.target.value })
                }
                placeholder={
                  userCredentials?.email
                    ? userCredentials.email
                    : "name@example.com"
                }
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Current password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) =>
                  setNewProfile({ ...newProfile, oldPassword: e.target.value })
                }
                placeholder={
                  userCredentials?.password
                    ? userCredentials.password
                    : "enter current password"
                }
                autoFocus
              />
            </Form.Group>
            {!isChangePassword && (
              <i
                style={{
                  textDecoration: "underline",
                  color: "gray",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
                onClick={() => setIsChangePassword(true)}
              >
                Change password
              </i>
            )}
            {isChangePassword && (
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>New password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) =>
                    setNewProfile({
                      ...newProfile,
                      newPassword: e.target.value,
                    })
                  }
                  placeholder="enter new password"
                  autoFocus
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              setIsChangePassword(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            disabled={newProfile.password !== newProfile.confirmPassword}
            onClick={handleUpdateProfile}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateUserProfile;

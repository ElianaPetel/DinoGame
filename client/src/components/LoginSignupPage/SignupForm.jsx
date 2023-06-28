import React, { useState, useContext } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Alert, Button } from "react-bootstrap";
import useUserHooks from "../UserHooks";

function SignupForm({ setIsSignup, showSuccessToast, showErrorToast }) {
  const { fetchUserData, handleSignup, error, setError } = useUserHooks();
  const initialState = {
    nickname: "",
    email: "",
    password: "",
  };

  const [userInput, setUserInput] = useState(initialState);
  function handleOnChange(e, key) {
    setUserInput((pre) => {
      return {
        ...pre,
        [key]: e.target.value,
      };
    });
  }

  async function handleRegistration() {
    const signUp = await handleSignup(userInput);
    if (signUp === true) {
      showSuccessToast("Thank you for signing up!");
    } else {
      showErrorToast(signUp[0]);
    }
  }

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="my-5 mx-auto"
            style={{
              borderRadius: "1rem",
              maxWidth: "410px",
              color: "#FFBD59",
            }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase text-black">Sign Up</h2>
              <p className="text-black-50 mb-5">Please enter your details</p>

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-black"
                label="Nickname 3 characters max"
                type="text"
                size="lg"
                maxLength={3}
                value={userInput.nickname}
                onChange={(e) => handleOnChange(e, "nickname")}
              />

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-black"
                label="Email address"
                type="email"
                size="lg"
                value={userInput.email}
                onChange={(e) => handleOnChange(e, "email")}
              />

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-black"
                label="Password"
                type="password"
                size="lg"
                value={userInput.password}
                onChange={(e) => handleOnChange(e, "password")}
              />
              <Button
                className="login-btn mx-2 px-4"
                variant="light"
                size="lg"
                style={{ border: "none", fontWeight: "400" }}
                onClick={() => handleRegistration()}
              >
                Sign Up
              </Button>

              <div>
                <p className="text-black-50 mb-0">
                  Already have an account?{" "}
                  <a
                    className="text-black-50 fw-bold"
                    onClick={() => setIsSignup(false)}
                  >
                    Login
                  </a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default SignupForm;

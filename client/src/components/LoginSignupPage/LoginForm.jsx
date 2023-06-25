import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import useUserHooks from "../UserHooks";
import { useNavigate } from "react-router";

function LoginForm({ setIsSignup, showSuccessToast, showErrorToast }) {
  const initialState = { email: "", password: "" };
  const [userInput, setUserInput] = useState(initialState);
  const { loginSubmit } = useUserHooks();
  const navigate = useNavigate();
  function handleOnChange(e, key) {
    setUserInput((pre) => {
      return {
        ...pre,
        [key]: e.target.value,
      };
    });
  }

  async function handleLogIn(userInput) {
    const login = await loginSubmit(userInput);
    console.log(login);
    if (login === true) {
      showSuccessToast("You successfully logged in!");
      navigate('/')
    } else {
      if (login == "User does not exist") {
        showErrorToast("Please enter a valid email address.");
      } else showErrorToast(login);
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
              maxWidth: "400px",
              color: "#FFBD59",
            }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase text-black">Login</h2>
              <p className="text-black-50 mb-5">
                Please enter your email and password
              </p>

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
                id="formControlLg"
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
                onClick={() => handleLogIn(userInput)}
              >
                Login
              </Button>

              <div>
                <p className="text-black-50 mb-0">
                  Don't have an account?{" "}
                  <a
                    className="text-black-50 fw-bold"
                    onClick={() => setIsSignup(true)}
                  >
                    Sign Up
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

export default LoginForm;

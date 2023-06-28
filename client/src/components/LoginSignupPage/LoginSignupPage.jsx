import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginSignupPage() {
  const [isSignup, setIsSignup] = useState(false);

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
  return (
    <>
      {isSignup ? (
        <SignupForm
          setIsSignup={setIsSignup}
          showErrorToast={showErrorToast}
          showSuccessToast={showSuccessToast}
        />
      ) : (
        <LoginForm
          setIsSignup={setIsSignup}
          showErrorToast={showErrorToast}
          showSuccessToast={showSuccessToast}
        />
      )}{" "}
      <ToastContainer />
    </>
  );
}

export default LoginSignupPage;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";

function VerifyUser({ redirect }) {
  const { userCredentials, setUserCredentials } = React.useContext(UserContext);
  const navigate = useNavigate();

  const verifyUser = (redirectPath) => {
    /* const handleNotVerified = () => {
      setUserCredentials(null);
      if (redirect === false) {
        return;
      }
      console.log(`Redirecting to ${redirectPath}`);
      navigate(redirectPath);
    };

    if (localStorage.getItem("token")) {
      axios
        .get(
          `http://localhost:4000/users/verify/${localStorage.getItem("token")}`
        )
        .then((res) => {
          console.log(res.data);
          setUserCredentials(res.data);
        })
        .catch((err) => {
          console.log(err.message);
          handleNotVerified();
        });
    } else if (!localStorage.getItem("token")) {
      console.log("No token found");
      handleNotVerified();
    } */
  };

  useEffect(() => {
    verifyUser("/login-signup");
  }, []);

  return <></>;
}

export default VerifyUser;

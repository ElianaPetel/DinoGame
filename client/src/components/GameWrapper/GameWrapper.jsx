import React, { useEffect } from "react";
import Homepage from "../Homepage/Homepage";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import useUserHooks from "../UserHooks";

function GameWrapper() {
  const { fetchUserData } = useUserHooks();
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div>
      <Provider store={store}>
        <Homepage />
      </Provider>{" "}
    </div>
  );
}

export default GameWrapper;

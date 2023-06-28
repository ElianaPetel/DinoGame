import { configureStore } from "@reduxjs/toolkit";
import mainCharacterReducer from "./mainCharacterSlice";
import obstacleReducer from "./obstacleSlice";
import engineReducer from "./engineSlice";

export const store = configureStore({
  reducer: {
    mainCharacter: mainCharacterReducer,
    obstacle: obstacleReducer,
    engine: engineReducer,
  },
});

import { createSlice } from "@reduxjs/toolkit";
import mainCharacterSrc from "../media/img/gif/mainCharacter.webp";
import mainCharacterStaticSrc from "../media/img/mainCharacterStill.png";
import character2 from "../media/img/gif/mainCharacter2.gif";
import character3 from "../media/img/gif/mainCharacter3.gif";
import character4 from "../media/img/gif/mainCharacter4.gif";
import character2Standstill from "../media/img/character2Standstill.png";
import character3Standstill from "../media/img/mainCharacter3.png";
import character4Standstill from "../media/img/character4Standstill.png";
import character5 from "../media/img/gif/mainCharacter5.gif";
import character5StandStill from "../media/img/character5StandStill.png";

import character6 from "../media/img/gif/character6.gif";
import character6StandStill from "../media/img/character6.png";
import character7 from "../media/img/gif/character7.gif";
import character7StandStill from "../media/img/character7.png";
import character8 from "../media/img/gif/character8.gif";
import character8StandStill from "../media/img/character8.png";
import character9 from "../media/img/gif/character9.gif";
import character9StandStill from "../media/img/character9.png";
import character10 from "../media/img/gif/character10.gif";
import character10StandStill from "../media/img/character10.png";

const initialState = {
  staticSrc: character5StandStill,
  src: character5,
  jumping: false,
  bottom: null,
  height: null,
  left: null,
  right: null,
  top: null,
  width: null,
  x: null,
  y: null,
  /* charactersArray: [
    { staticSrc: mainCharacterStaticSrc, src: mainCharacterSrc },
    { staticSrc: character2Standstill, src: character2 },
    { staticSrc: character3Standstill, src: character3 },
    { staticSrc: character4Standstill, src: character4 },
    { staticSrc: character5StandStill, src: character5 },
  ], */
  charactersArray: [
    { staticSrc: character5StandStill, src: character5 },
    { staticSrc: character6StandStill, src: character6 },
    { staticSrc: character7StandStill, src: character7 },
    { staticSrc: character8StandStill, src: character8 },
    { staticSrc: character9StandStill, src: character9 },
    { staticSrc: character10StandStill, src: character10 },
  ],
};
export const mainCharacterSlice = createSlice({
  name: "mainCharacter",
  initialState,
  reducers: {
    setMainCharacterUrlStatic: (state, action) => {
      state.staticSrc = action.payload;
    },
    setMainCharacterUrl: (state, action) => {
      state.src = action.payload;
    },
    mainCharacterJumping: (state, action) => {
      state.jumping = action.payload;
    },
    mainCharacterBottom: (state, action) => {
      state.bottom = action.payload;
    },
    mainCharacterHeight: (state, action) => {
      state.height = action.payload;
    },
    mainCharacterLeft: (state, action) => {
      state.left = action.payload;
    },
    mainCharacterRight: (state, action) => {
      state.right = action.payload;
    },
    mainCharacterTop: (state, action) => {
      state.top = action.payload;
    },
    mainCharacterWidth: (state, action) => {
      state.width = action.payload;
    },
    mainCharacterX: (state, action) => {
      state.x = action.payload;
    },
    mainCharacterY: (state, action) => {
      state.y = action.payload;
    },
    setCharactersArray: (state, action) => {
      state.charactersArray = action.payload;
    },
  },
});

export const {
  setMainCharacterUrlStatic,
  setMainCharacterUrl,
  mainCharacterJumping,
  mainCharacterBottom,
  mainCharacterHeight,
  mainCharacterLeft,
  mainCharacterRight,
  mainCharacterTop,
  mainCharacterWidth,
  mainCharacterX,
  mainCharacterY,
  setCharactersArray,
} = mainCharacterSlice.actions;
export default mainCharacterSlice.reducer;

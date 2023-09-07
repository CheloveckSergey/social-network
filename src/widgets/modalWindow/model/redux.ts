import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import React, { FC } from "react";
import { Image } from "../../../entities/image/model";

export enum WindowTypes {
  LOAD_USER_AVATAR = 'loadUserAvatar',
  LOAD_GROUP_AVATAR = 'loadGroupAvatar',
  ADD_USER_POST = 'addUserPost',
  ADD_GROUP_POST = 'addGroupPost',
  ADD_GROUP = 'addGroup',
  ADD_USER_IMAGE = 'addUserImage',
  ADD_GROUP_IMAGE = 'addGroupImage',
  SHOW_USER_IMAGES = 'showUserImages',
  IMAGE_WINDOW = 'imageWindow',
}

interface ModalWindow {
  switch: boolean,
  windowType: WindowTypes | undefined,
  image: Image | undefined,
}

const initialState: ModalWindow = {
  switch: false,
  windowType: undefined,
  image: undefined,
}

type WindowAction = {
  window: WindowTypes,
}

type ImageWindowAction = {
  image: Image,
}

export const mwSlice = createSlice({
  name: 'modalWindow',
  initialState,
  reducers: {
    setWindow(state, action: PayloadAction<WindowAction>) {
      state.switch = true;
      state.windowType = action.payload.window;
    },
    closeWindow(state, action) {
      state.switch = false;
      state.windowType = undefined;
    },
    setImageWindow(state, action: PayloadAction<ImageWindowAction>) {
      state.switch = true;
      state.image = action.payload.image;
      state.windowType = WindowTypes.IMAGE_WINDOW;
    }
  }
});

export const { setWindow, closeWindow, setImageWindow } = mwSlice.actions;
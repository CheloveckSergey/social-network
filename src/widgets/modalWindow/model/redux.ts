import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import React, { FC } from "react";

export enum WindowTypes {
  LOAD_AVATAR = 'loadAvatar',
  ADD_POST = 'addPost',
  ADD_GROUP = 'addGroup',
}

interface ModalWindow {
  switch: boolean,
  windowType: WindowTypes | undefined,
}

const initialState: ModalWindow = {
  switch: false,
  windowType: undefined,
}

type WindowAction = {
  window: WindowTypes,
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
    }
  }
});

export const { setWindow, closeWindow } = mwSlice.actions;
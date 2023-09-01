import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import React, { FC } from "react";

export enum WindowTypes {
  LOAD_USER_AVATAR = 'loadUserAvatar',
  LOAD_GROUP_AVATAR = 'loadGroupAvatar',
  ADD_USER_POST = 'addUserPost',
  ADD_GROUP_POST = 'addGroupPost',
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
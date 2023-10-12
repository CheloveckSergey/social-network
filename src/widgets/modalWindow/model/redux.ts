import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import React, { FC } from "react";
import { Image } from "../../../entities/image/model";
import { Author } from "../../../entities/author";

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
  SHOW_SUBS_WINDOW = 'showSubsWindow',
  CHANGE_DESC_WINDOW = 'changeDescWindow',
}

interface ModalWindow {
  switch: boolean,
  windowType: WindowTypes | undefined,
  images: Image[],
  curImageIndex: number,
  subAuthor: Author | undefined,
}

const initialState: ModalWindow = {
  switch: false,
  windowType: undefined,
  images: [],
  curImageIndex: 0,
  subAuthor: undefined,
}

type WindowAction = {
  window: WindowTypes,
}

type ImageWindowAction = {
  images: Image[],
  curImageIndex: number,
}

type SubsWindowAction = {
  subAuthor: Author,
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
      state.images = [];
      state.subAuthor = undefined;
    },
    setImageWindow(state, action: PayloadAction<ImageWindowAction>) {
      state.switch = true;
      state.images = action.payload.images;
      state.curImageIndex = action.payload.curImageIndex;
      state.windowType = WindowTypes.IMAGE_WINDOW;
    },
    nextImage(state, action) {
      if (state.curImageIndex === state.images.length - 1) {
        return
      }
      state.curImageIndex = state.curImageIndex + 1;
    },
    previousImage(state, action) {
      if (state.curImageIndex === 0) {
        return
      }
      state.curImageIndex = state.curImageIndex - 1;
    },
    setSubsWindow(state, action: PayloadAction<SubsWindowAction>) {
      state.windowType = WindowTypes.SHOW_SUBS_WINDOW;
      state.subAuthor = action.payload.subAuthor;
      state.switch = true;
    },
  }
});

export const { setWindow, closeWindow, setImageWindow, nextImage, previousImage, setSubsWindow } = mwSlice.actions;
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import React, { FC } from "react";
import { OneImage } from "../../../entities/image/model";
import { Author } from "../../../entities/author";
import { MeUser, OneUser } from "../../../entities/user";
import { Room } from "../../../entities/room";

export enum WindowTypes {
  LOAD_USER_AVATAR = 'loadUserAvatar',
  LOAD_GROUP_AVATAR = 'loadGroupAvatar',
  ADD_POST = 'addPost',
  ADD_GROUP = 'addGroup',
  ADD_USER_IMAGE = 'addUserImage',
  ADD_GROUP_IMAGE = 'addGroupImage',
  SHOW_USER_IMAGES = 'showUserImages',
  IMAGE_WINDOW = 'imageWindow',
  SHOW_SUBS_WINDOW = 'showSubsWindow',
  CHANGE_DESC_WINDOW = 'changeDescWindow',
  WRITE_MESSAGE_WINDOW = 'writeMessageWindow',
  CREATE_GENERAL_ROOM_WINDOW = 'createGeneralRoomWindow',
  ADD_ROOM_MEMBER_WINDOW = 'addRoomMemberWindow',
  ROOM_MEMBERS_WINDOW = 'roomMembersWindow',
}

interface ModalWindow {
  switch: boolean,
  windowType: WindowTypes | undefined,
  images: OneImage[],
  curImageIndex: number,
  subAuthor: Author | undefined,
  author: Author | undefined,
  user: OneUser | undefined,
  meUser: MeUser | undefined,
  room: Room | undefined,
}

const initialState: ModalWindow = {
  switch: false,
  windowType: undefined,
  images: [],
  curImageIndex: 0,
  subAuthor: undefined,
  author: undefined,
  user: undefined,
  meUser: undefined,
  room: undefined,
}

type WindowAction = {
  window: WindowTypes,
}

type ImageWindowAction = {
  images: OneImage[],
  curImageIndex: number,
}

type SubsWindowAction = {
  subAuthor: Author,
}

type AddPostAction = {
  author: Author,
}

type WriteMessageWindow = {
  user: OneUser,
}

type CreateGRoomAction = {
  user: MeUser,
}

type AddRMemberAction = {
  room: Room,
}

type RoomMembersWindow = {
  room: Room,
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
    setAddPostWindow(state, action: PayloadAction<AddPostAction>) {
      state.windowType = WindowTypes.ADD_POST;
      state.author = action.payload.author;
      state.switch = true;
    },
    setWriteMessageWindow(state, action: PayloadAction<WriteMessageWindow>) {
      state.windowType = WindowTypes.WRITE_MESSAGE_WINDOW;
      state.user = action.payload.user;
      state.switch = true;
    },
    setCreateGRoomWindow(state, action: PayloadAction<CreateGRoomAction>) {
      state.windowType = WindowTypes.CREATE_GENERAL_ROOM_WINDOW;
      state.switch = true;
      state.meUser = action.payload.user;
    },
    setAddRoomMemberWindow(state, action: PayloadAction<AddRMemberAction>) {
      state.windowType = WindowTypes.ADD_ROOM_MEMBER_WINDOW;
      state.switch = true;
      state.room = action.payload.room;
    },
    setRoomMembersWindow(state, action: PayloadAction<RoomMembersWindow>) {
      state.windowType = WindowTypes.ROOM_MEMBERS_WINDOW;
      state.switch = true;
      state.room = action.payload.room;
    }
  }
});

export const { 
  setWindow, 
  closeWindow, 
  setImageWindow, 
  nextImage, 
  previousImage, 
  setSubsWindow, 
  setAddPostWindow, 
  setWriteMessageWindow,
  setCreateGRoomWindow,
  setAddRoomMemberWindow,
  setRoomMembersWindow,
} = mwSlice.actions;
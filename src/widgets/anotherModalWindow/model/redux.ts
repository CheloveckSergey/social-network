import { createSlice } from "@reduxjs/toolkit";

interface ModalWindowState {
  switch: boolean,
}

const initialState: ModalWindowState = {
  switch: false,
}

export const anotherModalWindowSlice = createSlice({
  name: 'anotherModalWindow',
  initialState,
  reducers: {
    openWindow(state, payload) {
      state.switch = true;
    },
    closeWindow(state, payload) {
      state.switch = false;
    },
  }
});

export const AnotherModalWindowActions = anotherModalWindowSlice.actions;
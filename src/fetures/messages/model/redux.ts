import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Message } from "../../../entities/message";

interface DeletedMessagesStore {
  deletedMessages: Message[],
}

const initialState: DeletedMessagesStore = {
  deletedMessages: [],
}

interface AddMessagePayload {
  message: Message,
}

interface DeleteMessagePayload {
  message: Message,
}

export const deletedMessagesSlice = createSlice({
  name: 'deletedMessages',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<AddMessagePayload>) {
      state.deletedMessages = [...state.deletedMessages, action.payload.message];
    },
    deleteMessage(state, action: PayloadAction<DeleteMessagePayload>) {
      const newState = state.deletedMessages.filter(message => message.id !== action.payload.message.id);
    }
  }
});

export const DeleteMessagesActions = deletedMessagesSlice.actions;
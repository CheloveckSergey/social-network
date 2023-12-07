import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Message } from ".";

interface MessagesState {
  messages: Message[],
}

const initialState: MessagesState = {
  messages: [],
}

interface AddMessageAction {
  message: Message,
}

interface DeleteMessageAction {
  message: Message,
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<AddMessageAction>) {
      state.messages = [...state.messages, action.payload.message];
    },
    deleteMessage(state, action: PayloadAction<DeleteMessageAction>) {
      state.messages = state.messages.filter(message => message.id !== action.payload.message.id);
    }
  }
})

export const MessageSliceActions = {
  ...messagesSlice.actions
}
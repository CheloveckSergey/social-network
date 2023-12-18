import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Message } from ".";
import { MessageApi } from "../api";
import { AxiosError } from "axios";

interface MessagesState {
  messages: Message[],
}

const initialState: MessagesState = {
  messages: [],
}

export interface MyRejectValue {
  message: string | undefined,
  status: number | undefined,
}

const getAllUnreadThunk = createAsyncThunk<
  Message[],
  { userId: number },
  {
    rejectValue: MyRejectValue,
  }
>(
  'messages/getAllUnread',
  async (reqDto, thunkAPI) => {
    console.log('GET_ALL_UNREAD_MESSAGES_THUNK');
    try {
      const messages = await MessageApi.getAllUnread(reqDto.userId);
      return messages;
    } catch (error) {
      const err = error as AxiosError<MyRejectValue>;
      return thunkAPI.rejectWithValue({ message: err.response?.data.message, status: err.response?.status });
    }
  }
)

interface AddMessageAction {
  message: Message,
}

interface AddMessagesAction {
  messages: Message[],
}

interface DeleteMessageAction {
  messageId: number,
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<AddMessageAction>) {
      state.messages = [...state.messages, action.payload.message];
    },
    addMessages(state, action: PayloadAction<AddMessagesAction>) {
      state.messages = [...state.messages, ...action.payload.messages];
    },
    deleteMessage(state, action: PayloadAction<DeleteMessageAction>) {
      state.messages = state.messages.filter(message => message.id !== action.payload.messageId);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUnreadThunk.fulfilled, (state, action) => {
      state.messages = [...state.messages, ...action.payload];
    })
    builder.addCase(getAllUnreadThunk.pending, (state, action) => {
      state.messages = [];
    })
  }
})

export const MessageSliceActions = {
  ...messagesSlice.actions
}

export const MessageThunks = {
  getAllUnreadThunk,
}
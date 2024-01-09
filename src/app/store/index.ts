import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../../fetures/auth";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { mwSlice } from "../../widgets/modalWindow/model/redux";
import { socketMiddleware } from "../../fetures/socket";
import SocketClient from "../../fetures/socket/model";
import { messagesSlice } from "../../entities/message";
import { commentsSlice } from "../../entities/comment/model/redux";
import { messageStatusesSlice } from "../../entities/message/model/statusesRedux";
import { deletedMessagesSlice } from "../../fetures/messages/model";

const socket = new SocketClient();

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    modalWindow: mwSlice.reducer,
    messages: messagesSlice.reducer,
    commets: commentsSlice.reducer,
    messageStatuses: messageStatusesSlice.reducer,
    deletedMessages: deletedMessagesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .prepend(
        socketMiddleware(socket)
      )
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

const rootReducer = combineReducers({
  user: userSlice.reducer,
  modalWindow: mwSlice.reducer,
  messages: messagesSlice.reducer,
  commets: commentsSlice.reducer,
  messageStatuses: messageStatusesSlice.reducer,
  deletedMessages: deletedMessagesSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>;

// export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
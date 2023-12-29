import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../../fetures/auth";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { mwSlice } from "../../widgets/modalWindow/model/redux";
import { socketMiddleware } from "../../fetures/socket";
import SocketClient from "../../fetures/socket/model";
import { messagesSlice } from "../../entities/message";
import { commentsSlice } from "../../entities/comment/model/redux";

const socket = new SocketClient();

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    modalWindow: mwSlice.reducer,
    messages: messagesSlice.reducer,
    commets: commentsSlice.reducer,
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
})

export type RootState = ReturnType<typeof rootReducer>;

// export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../../entities/user/model/redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { mwSlice } from "../../widgets/modalWindow/model/redux";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    modalWindow: mwSlice.reducer,
  }
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
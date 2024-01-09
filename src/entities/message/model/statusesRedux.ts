import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Status } from ".";

interface MessageStatusesState {
  statuses: Status[],
}

const initialState: MessageStatusesState = {
  statuses: [],
}

interface AddStatusAction {
  status: Status,
}

interface DeleteStatusAction {
  status: Status,
}

export const messageStatusesSlice = createSlice({
  name: 'messageStatuses',
  initialState,
  reducers: {
    addStatus(state, action: PayloadAction<AddStatusAction>) {
      state.statuses = [...state.statuses, action.payload.status];
    },
    deleteStatus(state, action: PayloadAction<DeleteStatusAction>) {
      const newState = state.statuses.filter(status => status.id !== action.payload.status.id);
      state.statuses = newState;
    }
  }
});

export const MessageStatusesActions = messageStatusesSlice.actions;
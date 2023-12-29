import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Comment } from ".";
import { Room } from "../../room";

interface CommentsState {
  comments: Comment[],
  conCreationIds: number[],
}

const initialState: CommentsState = {
  comments: [],
  conCreationIds: [],
}

export interface MyRejectValue {
  message: string | undefined,
  status: number | undefined,
}

interface AddCommentAction {
  comment: Comment,
}

interface AddCommentsAction {
  comments: Comment[],
}

interface DeleteCommentAction {
  commentId: number,
}

interface ConnectCreation {
  creationId: number,
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<AddCommentAction>) {
      state.comments = [...state.comments, action.payload.comment];
    },
    addMessages(state, action: PayloadAction<AddCommentsAction>) {
      state.comments = [...state.comments, ...action.payload.comments];
    },
    deleteMessage(state, action: PayloadAction<DeleteCommentAction>) {
      state.comments = state.comments.filter(comment => comment.id !== action.payload.commentId);
    },
    connectRoom(state, action: PayloadAction<ConnectCreation>) {
      state.conCreationIds = [action.payload.creationId];
    },
    disconnectRoom(state, action: PayloadAction<ConnectCreation>) {
      state.conCreationIds = state.conCreationIds.filter(creationId => creationId !== action.payload.creationId);
    }
  },
});

export const CommentsSliceActions = {
  ...commentsSlice.actions
}
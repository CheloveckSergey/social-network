import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { CommentsLib } from "../../../entities/comment";
import { Comment } from "../../../entities/comment";
import { SocketActions } from "../../socket";

const useCreateComment = (creationId: number, addComment: (comment: Comment) => void) => {

  const { comments } = useAppSelector(state => state.commets);

  const { connected } = CommentsLib.useCommentSocket(creationId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (connected) {
      const newComment = comments.at(-1);
      if (newComment && newComment.creationId === creationId) {
        addComment(newComment)
      }
    }
  }, [comments]);

  function sendComment(text: string) {
    if (!connected) {
      return;
    }
    dispatch(SocketActions.sendComment({creationId, text}));
  }

  return {
    sendComment
  }
}

export const CommentsActionsLib = {
  useCreateComment,
}
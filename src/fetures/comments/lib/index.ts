import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { CommentsLib } from "../../../entities/comment";
import { Comment } from "../../../entities/comment";
import { SocketActions } from "../../socket";
import { useMutation } from "react-query";
import CommentApi from "../../../entities/comment/api";

interface CreateCommentProps {
  text: string,
  responseToCommentId?: number,
}

const useCreateComment = (creationId: number, addComment: (comment: Comment) => void) => {
  const { user } = useAppSelector(state => state.user);
  const { comments } = useAppSelector(state => state.commets);

  const { connected } = CommentsLib.useCommentSocket(creationId);

  const { mutateAsync, isLoading, isError } = useMutation(
    ({ text, responseToCommentId } : CreateCommentProps) => CommentApi.createComment(user!.author.id, creationId, text, responseToCommentId),
    {
      onSuccess: (data) => {
        sendComment(data);
        addComment(data);
      }
    }
  )

  const dispatch = useAppDispatch();

  function sendComment(comment: Comment) {
    if (!connected) {
      return;
    }
    dispatch(SocketActions.sendComment({comment}));
  }

  return {
    mutate: mutateAsync,
    isLoading,
    isError,
  }
}

export const CommentsActionsLib = {
  useCreateComment,
}
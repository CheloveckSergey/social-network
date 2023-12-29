import { useQuery } from "react-query"
import CommentApi from "../api"
import { useAppDispatch, useAppSelector } from "../../../app/store"
import { SocketActions } from "../../../fetures/socket"
import { useEffect, useState } from "react"
import { Comment } from "../model"

const commentsKeys = {
  comments: {
    root: ['comments'],
    slug: (creationId: number) => [...commentsKeys.comments.root, creationId], 
  },
  comment: {
    root: ['comment'],
    slug: (commentId: number) => [...commentsKeys.comment.root, commentId],
  }
}

const useCommentSocket = (creationId: number) => {
  
  const { conCreationIds } = useAppSelector(state => state.commets);

  const [connected, setConnected] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  function connect() {
    dispatch(SocketActions.connectComments({creationId}))
  }

  function checkConnected() {
    if (conCreationIds.find(_creationId => _creationId === creationId)) {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }

  useEffect(() => {
    // console.log('USE_COMMENT_SOCKET_USEEFFECT[]');
    // console.log(conCreationIds);
    checkConnected();
  }, []);

  useEffect(() => {
    // console.log('USE_COMMENT_SOCKET_USEEFFECT[conCreationIds]');
    // console.log(conCreationIds);
    checkConnected();
  }, [conCreationIds]);

  return {
    connected,
    connect,
  }
}

const useComments = (creationId: number) => {

  const { connect, connected } = useCommentSocket(creationId);

  const [comments, setComments] = useState<Comment[]>([]);

  const commentsStatus = useQuery({
    queryKey: commentsKeys.comments.slug(creationId),
    queryFn: () => {
      return CommentApi.getAllCommentsByCreationId(creationId);
    },
    onSuccess: (data) => {
      if (data) {
        setComments(data);
      }
    },
    enabled: false,
  });

  function connectComments() {
    commentsStatus.refetch()
    .then(() => {
      connect();
    })
    .catch((e) => {
      console.log('Ошибка в connectComments');
      console.log(e);
    });
  }

  function addComment(comment: Comment) {
    setComments([...comments, comment]);
  }

  return {
    isLoading: commentsStatus.isLoading,
    isError: commentsStatus.isError,
    comments: comments,
    error: commentsStatus.error,
    connectComments,
    addComment,
    connected,
  };
}

const useCreateComment = (creationId: number, addComment: (comment: Comment) => void) => {

  const { comments } = useAppSelector(state => state.commets);

  const { connected } = useCommentSocket(creationId);

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

export const CommentsLib = {
  useCommentSocket,
  useComments,
  useCreateComment,
}
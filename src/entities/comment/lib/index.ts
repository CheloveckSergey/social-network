import { useQuery } from "react-query"
import CommentApi from "../api"
import { useAppDispatch, useAppSelector } from "../../../app/store"
import { SocketActions } from "../../../fetures/socket"
import { useEffect, useState } from "react"
import { Comment, OneComment } from "../model"

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

  function sendConnectSocket() {
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
    checkConnected();
  }, []);

  useEffect(() => {
    checkConnected();
  }, [conCreationIds]);

  return {
    connected,
    sendConnectSocket,
  }
}

const useComments = (creationId: number) => {
  const { comments: globalComments } = useAppSelector(state => state.commets);

  const { sendConnectSocket, connected } = useCommentSocket(creationId);

  const [comments, setComments] = useState<OneComment[]>([]);

  const commentsStatus = useQuery({
    queryKey: commentsKeys.comments.slug(creationId),
    queryFn: () => {
      return CommentApi.getAllCommentsByCreationId(creationId);
    },
    onSuccess: (data) => {
      if (data) {
        setComments(data);
        sendConnectSocket();
      }
    },
  });

  useEffect(() => {
    if (connected) {
      const newComment = globalComments.at(-1);
      if (newComment && newComment.creationId === creationId) {
        addComment(newComment)
      }
    }
  }, [globalComments]);


  // useEffect(() => {
  //   sendConnectSocket();
  // }, [creationId]);

  // function connectComments() {
  //   commentsStatus.refetch()
  //   .then(() => {
  //     sendConnectSocket();
  //   })
  //   .catch((e) => {
  //     console.log('Ошибка в connectComments');
  //     console.log(e);
  //   });
  // }

  function addComment(comment: OneComment) {
    setComments([...comments, comment]);
  }

  function setIsLiked(commentId: number, isLiked: boolean) {
    const newComments: OneComment[] = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          ownCreation: {
            ...comment.ownCreation,
            isLiked,
            likeNumber: isLiked ? comment.ownCreation.likeNumber + 1 : comment.ownCreation.likeNumber - 1,
          }
        }
      } else {
        return comment;
      }
    });
    setComments(newComments);
  }

  return {
    isLoading: commentsStatus.isLoading,
    isError: commentsStatus.isError,
    comments: comments,
    error: commentsStatus.error,
    // connectComments,
    addComment,
    connected,
    setIsLiked,
  };
}

export const CommentsLib = {
  useCommentSocket,
  useComments,
}
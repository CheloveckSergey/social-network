import { FC, useState } from "react";
import { OnePost, Post } from "../../post";
import { BiComment } from "react-icons/bi";
import { Comment } from "../model";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import './styles.scss';
import { getImageSrc } from "../../../shared/service/images";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import CommentApi from "../api";
import { SocketActions } from "../../../fetures/socket";

const useComments = (creationId: number) => {
  const { user } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();
  
  const commentStatus = useQuery(
    ['loadComments', creationId],
    () => {
      return CommentApi.getAllCommentsByCreationId(creationId);
    },
    {
      enabled: false,
      // onSuccess: (data) => {
      //   if (data) {
      //     setComments(data);
      //   }
      // }
    }
  );

  function connectComments() {
    if (!user) {
      return
    }

    commentStatus.refetch();

    dispatch(SocketActions.connectComments({creationId}));
  }

  return {
    isLoading: commentStatus.isLoading,
    isError: commentStatus.isError,
    refetch: connectComments,
    data: commentStatus.data,
  }
}

interface PCBProps {
  post: OnePost,
  opened: boolean,
  setOpened: React.Dispatch<React.SetStateAction<boolean>>,
}

export const PostCommentButton: FC<PCBProps> = ({ post, setOpened, opened }) => {

  const { user } = useAppSelector(state => state.user);  
  // const { commented, setCommented } = useComments(post.creation.comments);

  //жопно работает, setCommented пока бесполезен
  // function useComments(comments: Comment[]) {
  //   let _isCommented: boolean;
  //   if (comments.find(comment => comment.ownCreation.author.id === user?.author.id)) {
  //     _isCommented = true;
  //   } else {
  //     _isCommented = false;
  //   }
  //   const [commented, setCommented] = useState<boolean>(_isCommented);
  //   return { commented, setCommented };
  // }

  return (
    <button 
      className='comment-button'
      onClick={() => setOpened(!opened)}
    >
      <BiComment size={25} />
      {/* <BiComment size={25} className={`${commented ? 'commented' : ''}`} /> */}
      <p className="extra">{post.creation.commentNumber}</p>
    </button>
  )
}

interface PCInterface {
  comment: Comment,
}

export const PostComment: FC<PCInterface> = ({ comment }) => {

  return (
    <div className="comment">
      <div className="avatar-container">
        <img 
          src={getImageSrc(comment.ownCreation.author.avatar)} 
          alt="IMG" 
          className="avatar"
        />
      </div>
      <div className="main">
        <h3>{comment.ownCreation.author.name}</h3>
        <div className="body">
          <p>{comment.text}</p>
        </div>
        <div className="bottom">
          <p className="date extra">{comment.ownCreation.createdAt}</p>
        </div>
      </div>
      <div className="right">
        <button className="like-button">
          <AiOutlineHeart size={15} />
        </button>
      </div>
    </div>
  )
}

export * from './createComment';
export * from './commentFeed';
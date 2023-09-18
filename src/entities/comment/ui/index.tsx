import { FC, useState } from "react";
import { Post } from "../../post";
import { BiComment } from "react-icons/bi";
import { Comment } from "../model";
import { useAppSelector } from "../../../app/store";
import './styles.scss';
import { getImageSrc } from "../../../shared/service/images";
import { AiOutlineHeart } from "react-icons/ai";

interface PCBProps {
  post: Post,
  opened: boolean,
  setOpened: React.Dispatch<React.SetStateAction<boolean>>,
}

export const PostCommentButton: FC<PCBProps> = ({ post, setOpened, opened }) => {

  const { user } = useAppSelector(state => state.user);  
  const { commented, setCommented } = useComments(post.comments);

  //жопно работает, setCommented пока бесполезен
  function useComments(comments: Comment[]) {
    let _isCommented: boolean;
    if (comments.find(comment => comment.userId === user?.id)) {
      _isCommented = true;
    } else {
      _isCommented = false;
    }
    const [commented, setCommented] = useState<boolean>(_isCommented);
    return { commented, setCommented };
  }

  return (
    <button 
      className='comment-button'
      onClick={() => setOpened(!opened)}
    >
      <BiComment size={25} className={`${commented ? 'commented' : ''}`} />
      <p className="extra">{post.comments.length}</p>
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
          src={getImageSrc(comment.user.avatar)} 
          alt="IMG" 
          className="avatar"
        />
      </div>
      <div className="main">
        <h3>{comment.user.login}</h3>
        <div className="body">
          <p>{comment.text}</p>
        </div>
        <div className="bottom">
          <p className="date extra">{comment.createdAt}</p>
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
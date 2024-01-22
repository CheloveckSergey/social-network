import { FC } from "react";
import { Comment } from "../..";
import './styles.scss';
import { Helpers } from "../../../../shared/helpers";
import { AiOutlineHeart } from "react-icons/ai";

interface CLProps {
  comment: Comment,
}
export const CommentLine: FC<CLProps> = ({ comment }) => {

  return (
    <div className="comment">
      <div className="avatar-container">
        <img 
          src={Helpers.getImageSrc(comment.ownCreation.author.avatar)} 
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
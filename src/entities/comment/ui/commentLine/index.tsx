import { FC, useState } from "react";
import { Comment } from "../..";
import './styles.scss';
import { Helpers } from "../../../../shared/helpers";
import { AiOutlineHeart } from "react-icons/ai";
import { MyDate } from "../../../../shared/types";

interface CLProps {
  comment: Comment,
}
export const CommentLine: FC<CLProps> = ({ comment }) => {

  const [showResponseCreator, setShowResponseCreator] = useState<boolean>(false);

  return (
    <div className="comment">
      <div className="comment-section">
        <div className="avatar-container">
          <img 
            src={Helpers.getImageSrc(comment.ownCreation.author.avatar)} 
            alt="IMG" 
            className="avatar"
            />
        </div>
        <div className="main">
          <div className="head">
            <h3 className="ref title">{comment.ownCreation.author.name}</h3>
          </div>
          <div className="body">
            <p>{comment.text}</p>
          </div>
          <div className="bottom">
            <div className="left">
              <p className="date extra">{new MyDate(comment.ownCreation.createdAt).getDateAndTime()}</p>
              <button 
                className="ref"
                onClick={() => setShowResponseCreator(!showResponseCreator)}
                >
                Ответить
              </button>
            </div>
            <button className="like-button">
              <AiOutlineHeart size={15} />
            </button>
          </div>
        </div>
      </div>
      <div className="inner">
        asdfasdf
      </div>
    </div>
  )
}
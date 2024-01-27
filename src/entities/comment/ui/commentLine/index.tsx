import { FC, useState } from "react";
import { Comment } from "../..";
import './styles.scss';
import { Helpers } from "../../../../shared/helpers";
import { AiOutlineHeart } from "react-icons/ai";
import { MyDate } from "../../../../shared/types";
import { CommentsActionsUi } from "../../../../fetures/comments";

interface CLProps {
  comment: Comment,
  addComment: (comment: Comment) => void,
}
export const CommentLine: FC<CLProps> = ({ comment, addComment }) => {

  const [showResponseCreator, setShowResponseCreator] = useState<boolean>(false);

  function closeCreator() {
    setShowResponseCreator(false);
  }

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
            {comment.responseToComment && (
              <p className="extra">{'to ' + comment.responseToComment.ownCreation.author.name}</p>
            )}
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
        {showResponseCreator && <CommentsActionsUi.CommentResponseCreator
          creationId={comment.creationId}
          addComment={addComment}
          commentId={comment.id}
          effects={{
            closeCreator,
          }}
        />}
      </div>
    </div>
  )
}
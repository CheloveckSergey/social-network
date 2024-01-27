import { FC } from "react";
import { Comment, CommentsBlock, CommentsStructure, CommentsUi } from "../..";
import './styles.scss';

interface CBProps {
  commentsBlock: CommentsBlock,
  addComment: (comment: Comment) => void,
}
export const CommentsBlockUi: FC<CBProps> = ({ commentsBlock, addComment }) => {

  return (
    <div className="comments-block">
      <CommentsUi.CommentLine 
        comment={commentsBlock}
        addComment={addComment}
      />
      {commentsBlock.innerComments.length > 0 && (
        <div className="inner">
          {commentsBlock.innerComments.map((comment, index) => <CommentsUi.CommentLine 
            key={index}
            comment={comment}
            addComment={addComment}
          />)}
        </div>
      )}
    </div>
  )
}
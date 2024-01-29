import { FC } from "react";
import { Comment, CommentsBlock, CommentsStructure, CommentsUi, OneComment } from "../..";
import './styles.scss';

interface CBProps {
  commentsBlock: CommentsBlock,
  addComment: (comment: OneComment) => void,
  renderComment: (comment: OneComment, key: number) => React.ReactNode, 
}
export const CommentsBlockUi: FC<CBProps> = ({ commentsBlock, addComment, renderComment }) => {

  return (
    <div className="comments-block">
      {renderComment(commentsBlock, commentsBlock.id)}
      {commentsBlock.innerComments.length > 0 && (
        <div className="inner">
          {commentsBlock.innerComments.map(renderComment)}
        </div>
      )}
    </div>
  )
}
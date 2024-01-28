import { FC } from "react"
import { Comment, CommentsHelpers, CommentsUi } from '../../index';
import { SharedUi } from "../../../../shared/sharedUi";
import './styles.scss';

interface CFProps {
  comments: Comment[],
  addComment: (comment: Comment) => void,
}

const CommentFeed: FC<CFProps> = ({ comments, addComment }) => {

  const commentsStructure = CommentsHelpers.getCommentsStructure(comments);

  return (
    <div className="comment-feed">
      {commentsStructure.map((commentsBlock, index) => <CommentsUi.CommentsBlockUi
        key={index}
        commentsBlock={commentsBlock}
        addComment={addComment}
      />)}
    </div>
  )
}

interface PCFProps {
  comments: Comment[] | undefined,
  addComment: (comment: Comment) => void,
}

export const PostCommentFeed: FC<PCFProps> = ({ comments, addComment }) => {

  return (
    <>
      {comments && comments.length > 0 && <CommentFeed 
        comments={comments} 
        addComment={addComment}
      />}
    </>
  )
}

interface ICFProps {
  comments: Comment[] | undefined,
  addComment: (comment: Comment) => void,
}
export const ImageCommentFeed: FC<ICFProps> = ({ comments, addComment }) => {

  return (
    <div className="image-comments-feed">
      {comments && comments.length > 0 ? (
        comments.map((comment, index) => <CommentsUi.ImageCommentLine 
          key={index}
          comment={comment}
          addComment={addComment}
        />)
      ) : (
        <SharedUi.Divs.Empty 
          body="There's no comments yet"
        />
      )}
    </div>
  )
}
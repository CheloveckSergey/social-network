import { FC } from "react"
import { Comment, CommentsHelpers, CommentsUi } from '../../index';

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
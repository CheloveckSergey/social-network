import { FC } from "react"
import { Comment, PostComment } from '../../index';

interface CFProps {
  comments: Comment[],
}

const CommentFeed: FC<CFProps> = ({ comments }) => {

  return (
    <div className="comment-feed">
      {comments.map((comment, index) => <PostComment 
        key={index}
        comment={comment}
      />)}
    </div>
  )
}

interface PCFProps {
  comments: Comment[] | undefined,
}

export const PostCommentFeed: FC<PCFProps> = ({ comments }) => {

  return (
    <>
      {comments && comments.length > 0 && <CommentFeed comments={comments} />}
    </>
  )
}
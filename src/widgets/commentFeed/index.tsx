import { FC } from "react"
import { Comment } from "../../entities/comment/model"
import { PostComment } from "../../entities/comment/ui"

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

export default CommentFeed;
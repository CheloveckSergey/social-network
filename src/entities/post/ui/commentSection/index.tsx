import { FC, useState } from "react";
import { Post } from "../..";
import { User } from "../../../user";
import { Comment } from "../../../comment/model";
import { useQuery } from "react-query";
import CommentApi from "../../../comment/api";
import { CreateComment } from "../../../comment";
import { PostCommentFeed } from "../../../comment";
import './styles.scss';

interface CSProps {
  user: User,
  post: Post,
}

export const CommentSection: FC<CSProps> = ({ user, post }) => {

  const [comments, setComments] = useState<Comment[]>([]);

  const { data, isLoading, isError } = useQuery(
    ['getCommentsByPostId', post.id],
    () => CommentApi.getCommentsByPostId(post.id),
    {
      onSuccess: (data) => {
        setComments(data);
      }
    }
  )

  function addComment(comment: Comment) {
    setComments([...comments, comment]);
  }

  return (
    <div className="comments-section">
      {user && <PostCommentFeed comments={comments} />}
      <CreateComment post={post} user={user} addComment={addComment} />
    </div>
  )
}
import { FC, useState } from "react";
import { OnePost, Post } from "../..";
import { User } from "../../../user";
import { Comment } from "../../../comment/model";
import { useQuery } from "react-query";
import CommentApi from "../../../comment/api";
import { CreateComment } from "../../../comment";
import { PostCommentFeed } from "../../../comment";
import './styles.scss';
import { SocketActions } from "../../../../fetures/socket";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { SharedUi } from "../../../../shared/sharedUi";

interface CSProps {
  user: User,
  post: OnePost,
  commentsStatus: {
    data: Comment[] | undefined,
    isLoading: boolean,
    isError: boolean,
  }
  addComment: (comment: Comment) => void,
}
export const CommentSection: FC<CSProps> = ({ user, post, commentsStatus, addComment }) => {

  // const [comments, setComments] = useState<Comment[]>([]);

  // const { data, isLoading, isError } = useQuery(
  //   ['getCommentsByPostId', post.id],
  //   () => CommentApi.getAllCommentsByCreationId(post.creation.id),
  //   {
  //     onSuccess: (data) => {
  //       setComments(data);
  //     }
  //   }
  // )



  return (
    <div className="comments-section">
      <SharedUi.Helpers.LoadErrorHandler 
        isLoading={commentsStatus.isLoading}
        isError={commentsStatus.isError}
      >
        {commentsStatus.data && <PostCommentFeed comments={commentsStatus.data} />}
      </SharedUi.Helpers.LoadErrorHandler>
      <CreateComment creation={post.creation} user={user} addComment={addComment} />
    </div>
  )
}
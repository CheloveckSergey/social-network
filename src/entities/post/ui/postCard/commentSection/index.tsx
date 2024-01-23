import { FC, useState } from "react";
import './styles.scss';
import { User } from "../../../../user";
import { OnePost } from "../../..";
import { SharedUi } from "../../../../../shared/sharedUi";
import { Comment, CommentsUi } from "../../../../comment";
import { CommentsActionsUi } from "../../../../../fetures/comments";

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

  return (
    <div className="comments-section">
      <SharedUi.Helpers.LoadErrorHandler 
        isLoading={commentsStatus.isLoading}
        isError={commentsStatus.isError}
      >
        {commentsStatus.data && <CommentsUi.PostCommentFeed comments={commentsStatus.data} />}
      </SharedUi.Helpers.LoadErrorHandler>
      <CommentsActionsUi.CommentCreator creation={post.creation} user={user} addComment={addComment} />
    </div>
  )
}
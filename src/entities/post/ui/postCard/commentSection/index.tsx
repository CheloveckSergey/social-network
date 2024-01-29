import { FC, useEffect, useState } from "react";
import './styles.scss';
import { User } from "../../../../user";
import { OnePost } from "../../..";
import { CommentsLib, CommentsUi } from "../../../../comment";
import { CommentsActionsUi } from "../../../../../fetures/comments";

interface CSProps {
  user: User,
  post: OnePost,
}
export const CommentSection: FC<CSProps> = ({ user, post }) => {

  const {
    comments,
    isLoading,
    isError,
    connected,
    connectComments,
    addComment,
  } = CommentsLib.useComments(post.creationId);

  useEffect(() => {
    connectComments();
  }, []);

  return (
    <div className="comments-section">
      <CommentsUi.PostCommentFeed 
        comments={comments}
        isLoading={isLoading}
        isError={isError}
        addComment={addComment}
      />
      <CommentsActionsUi.CommentCreator 
        creation={post.creation} 
        user={user} 
        addComment={addComment} 
      />
    </div>
  )
}
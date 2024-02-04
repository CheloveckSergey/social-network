import { FC, useEffect, useState } from "react";
import './styles.scss';
import { User } from "../../../../user";
import { OnePost } from "../../..";
import { CommentsLib, CommentsUi, OneComment } from "../../../../comment";
import { CommentsActionsUi } from "../../../../../fetures/comments";
import Favourites from "../../../../../fetures/favourites";

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
    // connectComments,
    addComment,
    setIsLiked,
  } = CommentsLib.useComments(post.creationId);

  // useEffect(() => {
  //   connectComments();
  // }, []);

  return (
    <div className="comments-section">
      <CommentsUi.PostCommentFeed 
        comments={comments}
        isLoading={isLoading}
        isError={isError}
        addComment={addComment}
        renderComment={(comment: OneComment, index: number) => {

          function _setIsLiked(isLiked: boolean) {
            return setIsLiked(comment.id, isLiked);
          }

          return (
            <CommentsUi.CommentLine
              key={comment.id}
              comment={comment}
              addComment={addComment}
              likeButton={<Favourites.Actions.SmallLikeButton 
                creation={comment.ownCreation}
                effects={{
                  setIsLiked: _setIsLiked,
                }}
              />}
            />
          )
        }}
      />
      <CommentsActionsUi.CommentCreator 
        creation={post.creation} 
        user={user} 
        addComment={addComment} 
      />
    </div>
  )
}
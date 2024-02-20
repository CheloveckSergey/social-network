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
  addComment: () => void,
}
export const CommentSection: FC<CSProps> = ({ user, post, addComment: addCommentEffect }) => {

  const {
    comments,
    isLoading,
    isError,
    connected,
    addComment,
    setIsLiked,
  } = CommentsLib.useComments(post.creationId);

  function _addComment(comment: OneComment): void {
    addComment(comment);
    addCommentEffect();
  }

  return (
    <div className="comments-section">
      <CommentsUi.PostCommentFeed 
        comments={comments}
        isLoading={isLoading}
        isError={isError}
        addComment={_addComment}
        renderComment={(comment: OneComment, index: number) => {

          function _setIsLiked(isLiked: boolean) {
            return setIsLiked(comment.id, isLiked);
          }

          return (
            <CommentsUi.CommentLine
              key={comment.id}
              comment={comment}
              addComment={_addComment}
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
        addComment={_addComment} 
      />
    </div>
  )
}
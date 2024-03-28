import { FC } from "react";
import { CommentsLib, CommentsUi, OneComment } from "../../entities/comment";
import { OneCreation } from "../../entities/creation";
import Favourites from "../../fetures/favourites";
import { CommentsActionsUi } from "../../fetures/comments";
import { useAppSelector } from "../../app/store";

interface PCWProps {
  creation: OneCreation,
}
export const PostCommentsWidget: FC<PCWProps> = ({ creation }) => {

  const { user } = useAppSelector(state => state.user);

  const {
    comments,
    isLoading,
    isError,
    connected,
    addComment,
    setIsLiked,
  } = CommentsLib.useComments(creation.id);

  return (
    <>
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
      {user && <CommentsActionsUi.CommentCreator 
        creation={creation} 
        user={user} 
        addComment={addComment} 
      />}
    </>
  )
}
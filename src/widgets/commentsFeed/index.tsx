import { FC, useRef, useState } from "react";
import { OneCreation } from "../../entities/creation";
import { useAppSelector } from "../../app/store";
import { CommentsLib, CommentsUi, OneComment } from "../../entities/comment";
import Favourites from "../../fetures/favourites";
import { CommentsActionsUi } from "../../fetures/comments";

interface IWCProps {
  creation: OneCreation,
}
export const ImageWindowComments: FC<IWCProps> = ({ creation }) => {

  const { user } = useAppSelector(state => state.user);

  const [responseToComment, setResponseToComment] = useState<OneComment>();

  function cancelResponse() {
    setResponseToComment(undefined);
  }

  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    comments,
    isLoading,
    isError,
    addComment,
    setIsLiked,
  } = CommentsLib.useComments(creation.id);

  return (
    <>
      <div className="comments">
        <CommentsUi.ImageCommentFeed 
          comments={comments}
          isLoading={isLoading}
          isError={isError}
          addComment={addComment}
          renderComment={(comment: OneComment) => {

            function _setCommentLiked(isLiked: boolean) {
              return setIsLiked(comment.id, isLiked);
            }

            return (
              <CommentsUi.ImageCommentLine 
                key={comment.id}
                comment={comment}
                addComment={addComment}
                setResponseToComment={setResponseToComment}
                likeButton={<Favourites.Actions.SmallLikeButton 
                  creation={comment.ownCreation}
                  effects={{
                    setIsLiked: _setCommentLiked,
                  }}
                />}
              />
            )
          }} 
        />
        <div ref={scrollRef}></div>
      </div>
      
      {user && <CommentsActionsUi.ImageCommentCreator 
        user={user}
        creation={creation}
        addComment={addComment}
        responseToComment={responseToComment}
        cancelResponse={cancelResponse}
      />}
    </>
  )
}
import { FC } from "react"
import { Comment, CommentsHelpers, CommentsUi } from '../../index';
import { SharedUi } from "../../../../shared/sharedUi";
import './styles.scss';

interface CFProps {
  comments: Comment[],
  isLoading: boolean,
  isError: boolean,
  addComment: (comment: Comment) => void,
}
export const PostCommentFeed: FC<CFProps> = ({ comments, isLoading, isError, addComment }) => {

  const commentsStructure = CommentsHelpers.getCommentsStructure(comments);

  return (
    <div className="post-comment-feed">
      <SharedUi.Helpers.LoadErrorHandler 
        isLoading={isLoading}
        isError={isError}
      >
        {comments && comments.length > 0 ? (
          commentsStructure.map((commentsBlock, index) => <CommentsUi.CommentsBlockUi
            key={index}
            commentsBlock={commentsBlock}
            addComment={addComment}
          />)
        ) : (
          <SharedUi.Divs.Empty 
            body="Write some comment..."
          />
        )}
      </SharedUi.Helpers.LoadErrorHandler>
    </div>
  )
}

interface ICFProps {
  comments: Comment[] | undefined,
  addComment: (comment: Comment) => void,
}
export const ImageCommentFeed: FC<ICFProps> = ({ comments, addComment }) => {

  return (
    <div className="image-comments-feed">
      {comments && comments.length > 0 ? (
        comments.map((comment, index) => <CommentsUi.ImageCommentLine 
          key={index}
          comment={comment}
          addComment={addComment}
        />)
      ) : (
        <SharedUi.Divs.Empty 
          body="There's no comments yet"
        />
      )}
    </div>
  )
}
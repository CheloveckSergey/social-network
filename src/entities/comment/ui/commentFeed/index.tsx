import { FC } from "react"
import { Comment, CommentsHelpers, CommentsUi, OneComment } from '../../index';
import { SharedUi } from "../../../../shared/sharedUi";
import './styles.scss';

interface CFProps {
  comments: OneComment[],
  isLoading: boolean,
  isError: boolean,
  addComment: (comment: OneComment) => void,
  renderComment: (comment: OneComment, key: number) => React.ReactNode, 
}
export const PostCommentFeed: FC<CFProps> = ({ comments, isLoading, isError, addComment, renderComment }) => {

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
            renderComment={renderComment}
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
  comments: OneComment[] | undefined,
  addComment: (comment: OneComment) => void,
  renderComment: (comment: OneComment, key: number) => React.ReactNode,
}
export const ImageCommentFeed: FC<ICFProps> = ({ comments, addComment, renderComment }) => {

  return (
    <div className="image-comments-feed">
      {comments && comments.length > 0 ? (
        comments.map(renderComment)
      ) : (
        <SharedUi.Divs.Empty 
          body="There's no comments yet"
        />
      )}
    </div>
  )
}
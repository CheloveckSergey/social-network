import { FC, useRef, useState } from "react";
import './styles.scss';
import { OneCreation } from "../../../../entities/creation";
import { User } from "../../../../entities/user";
import { CommentsActionsLib } from "../../lib";
import { Comment, OneComment } from "../../../../entities/comment";
import { Helpers } from "../../../../shared/helpers";
import { BsFileEarmarkPlay } from "react-icons/bs";
import { useAppSelector } from "../../../../app/store";

interface CCInterface {
  creationId: number,
  addComment: (comment: OneComment) => void,
  commentId: number,
  effects?: {
    closeCreator?: () => void,
  },
}
export const CommentResponseCreator: FC<CCInterface> = ({ creationId, addComment, commentId, effects }) => {
  const { user } = useAppSelector(state => state.user);

  const [text, setText] = useState<string>('');

  const {
    mutate,
    isLoading,
    isError,
  } = CommentsActionsLib.useCreateComment(creationId, addComment, effects);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="comment-response-creator">
      <img 
        src={Helpers.getImageSrc(user?.avatar)} 
        alt="IMG" 
        className="avatar-image"
      />
      <form ref={formRef}>
        <label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            name="text"
            className="comment-input" 
          />
        </label>
        <button
          className="inherit-to-green"
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            console.log('createCommentButton_Click');
            mutate({text, responseToCommentId: commentId})
            .then(() => {
              setText('');
            });
          }}
        >
          <BsFileEarmarkPlay size={40} />
        </button>
      </form>
    </div>
  )
}
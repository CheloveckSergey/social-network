import { FC, useRef, useState } from "react"
import { getImageSrc } from "../../../../shared/service/images"
import { BsFileEarmarkPlay } from "react-icons/bs"
import { Comment, OneComment } from "../../../../entities/comment"
import './styles.scss';
import { User } from "../../../../entities/user";
import { CommentsActionsLib } from "../../lib";
import { OneCreation } from "../../../../entities/creation";
import { Helpers } from "../../../../shared/helpers";

interface CCInterface {
  user: User,
  creation: OneCreation,
  addComment: (comment: OneComment) => void,
}

export const CommentCreator: FC<CCInterface> = ({ user, creation, addComment }) => {

  const [text, setText] = useState<string>('');

  const formRef = useRef<HTMLFormElement>(null);

  const { 
    mutate,
    isLoading,
    isError
  } = CommentsActionsLib.useCreateComment(creation.id, addComment);

  return (
    <div className="create-comment">
      <img 
        src={Helpers.getImageSrc(user.avatar)} 
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
            mutate({text})
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

interface ICCProps {
  user: User,
  creation: OneCreation,
  addComment: (comment: OneComment) => void,
}
export const ImageCommentCreator: FC<ICCProps> = ({ user, creation, addComment }) => {

  const [text, setText] = useState<string>('');

  const { 
    mutate,
    isLoading,
    isError
  } = CommentsActionsLib.useCreateComment(creation.id, addComment);

  return (
    <div className="image-comments-creator">
      <div
        className="up"
      >
        <img
          src={Helpers.getImageSrc(user.avatar)} 
          alt="IMG" 
          className="avatar-image"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          name="text"
          className="comment-input"
        />
      </div>
      <div className="down">
        <button
          className="cancel-button white-back"
          onClick={() => {
            setText('');
          }}
        >
          Отменить
        </button>
        <button
          className="send-button green"
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            console.log('createCommentButton_Click');
            mutate({text})
            .then(() => {
              setText('');
            });
          }}
          disabled={text === ''}
        >
          Отправить
        </button>
      </div>
    </div>
  )
}
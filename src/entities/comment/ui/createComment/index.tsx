import { FC, useRef, useState } from "react"
import { User } from "../../../user"
import { getImageSrc } from "../../../../shared/service/images"
import { useQuery } from "react-query"
import CommentApi from "../../api"
import { BsFileEarmarkPlay } from "react-icons/bs"
import { Comment } from "../../model"
import './styles.scss';
import { CrTypeCodes, CrTypesNames, Creation, OneCreation } from "../../../creation"
import { CommentsLib } from "../../lib"

interface CCInterface {
  user: User,
  creation: OneCreation,
  addComment: (comment: Comment) => void,
}

export const CreateComment: FC<CCInterface> = ({ user, creation, addComment }) => {

  const [text, setText] = useState<string>('');

  const formRef = useRef<HTMLFormElement>(null);

  const { sendComment } = CommentsLib.useCreateComment(creation.id, addComment);

  return (
    <div className="create-comment">
      <img 
        src={getImageSrc(user?.avatar)} 
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
            sendComment(text);
          }}
        >
          <BsFileEarmarkPlay size={40} />
        </button>
      </form>
    </div>
  )
}
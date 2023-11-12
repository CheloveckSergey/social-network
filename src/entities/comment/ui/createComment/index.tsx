import { FC, useRef, useState } from "react"
import { User } from "../../../user"
import { getImageSrc } from "../../../../shared/service/images"
import { useQuery } from "react-query"
import CommentApi from "../../api"
import { BsFileEarmarkPlay } from "react-icons/bs"
import { Comment } from "../../model"
import './styles.scss';
import { CrTypeCodes, CrTypesNames, Creation, OneCreation } from "../../../creation"

interface CCInterface {
  user: User,
  creation: OneCreation,
  addComment: (comment: Comment) => void,
}

export const CreateComment: FC<CCInterface> = ({ user, creation, addComment }) => {

  const [text, setText] = useState<string>('');

  const formRef= useRef<HTMLFormElement>(null);

  const { refetch } = useQuery(
    ['loadComment', user?.id, text],
    () => {
      if (formRef.current) {
        // const formData = new FormData(formRef.current);
        // formData.append('creationId', String(post.id));
        return CommentApi.createComment(user.author.id, creation.id, text);
      }
    },
    {
      enabled: false,
      onSuccess: () => {
        addComment({
          id: 9999,
          text: text,
          ownCreation: {
            id: 9999,
            type: {
              id: 9999,
              code: CrTypeCodes.COMMENT,
              name: CrTypesNames.COMMENT,
            },
            author: user.author,
            createdAt: 'Только что',
            likes: [],
            comments: [],
          },
        })
      }
    }
  )

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
            refetch();
          }}
        >
          <BsFileEarmarkPlay size={40} />
        </button>
      </form>
    </div>
  )
}
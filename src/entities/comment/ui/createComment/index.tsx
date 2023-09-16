import { FC, useRef, useState } from "react"
import { User } from "../../../user"
import { getImageSrc } from "../../../../shared/service/images"
import { useQuery } from "react-query"
import CommentApi from "../../api"
import { Post } from "../../../post"
import { BsFileEarmarkPlay } from "react-icons/bs"
import './styles.scss'

interface CCInterface {
  user: User,
  post: Post
}

export const CreateComment: FC<CCInterface> = ({ user, post }) => {

  const [text, setText] = useState<string>('');

  const formRef= useRef<HTMLFormElement>(null);

  const { refetch } = useQuery(
    ['loadComment', user?.id, text],
    () => {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        formData.append('creationId', String(post.id));
        return CommentApi.createPostComment(formData);
      }
    },
    {
      enabled: false,
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
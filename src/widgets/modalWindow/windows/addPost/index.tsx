import { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { closeWindow } from "../../model/redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useQuery } from "react-query";
import { PostApi } from "../../../../entities/post/api";
import './styles.scss';
import MyImgLabel from "../../../../shared/myImgLabel";

const AddPostWindow: FC = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [description, setDescription] = useState<string | undefined>('');

  const [message, setMessage] = useState<string>('');

  const { user } = useAppSelector(state => state.user);

  const formRef= useRef<HTMLFormElement>(null);

  const { refetch } = useQuery(
    ['loadAvatar', image],
    () => {
      if (user) {
        if (formRef.current) {
          PostApi.createPostUser(new FormData(formRef.current))
        }
      }
    },
    {
      enabled: false,
      onSuccess: () => setMessage('Вроде как загружено'),
      onError: () => setMessage('Нихуя не загружено как же блять заебало'),
    }
  )

  const dispatch = useAppDispatch();

  return (
    <div className="window add-post-window">
      <button
        className="close"
        onClick={() => dispatch(closeWindow({}))}
      >
        <AiOutlineCloseCircle size={25} />
      </button>
      <div className="header-section section">
        <p>Add Post</p>
      </div>
      <hr/>
      <div className="input-section section">
        <form ref={formRef} onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
          <MyImgLabel 
            image={image}
            setImage={setImage}
            name='img'
          />
          <label className="description-label">
            <p>Enter description</p>
            <textarea 
              name="description" 
              value={description} 
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            />
          </label>
        </form>
        <button 
          className={`add ${(image || description) ? 'green' : 'blocked'}`} 
          onClick={() => refetch()}
          disabled={(image || description) ? false : true}
        >
          Add Avatar
        </button>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default AddPostWindow;
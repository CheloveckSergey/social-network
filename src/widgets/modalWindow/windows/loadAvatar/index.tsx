import { FC, FormEvent, useRef, useState } from "react";
import { useAppDispatch } from "../../../../app/store";
import { useQuery } from "react-query";
import { UserApi } from "../../../../entities/user/api";
import { closeWindow } from "../../model/redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import './styles.scss';

const LoadAvatarWindow: FC = () => {
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);
  const [message, setMessage] = useState<string>('');
  const dispatch = useAppDispatch();

  const formRef= useRef<HTMLFormElement>(null);

  const { refetch } = useQuery(
    ['loadAvatar', avatar],
    () => {
      if (formRef.current) {
        UserApi.loadAvatar(new FormData(formRef.current))
      }
    },
    {
      enabled: false,
      onSuccess: () => setMessage('Вроде как загружено'),
      onError: () => setMessage('Нихуя не загружено как же блять заебало'),
    }
  )

  return (
    <div className="window add-avatar-window">
      <button
        className="close"
        onClick={() => dispatch(closeWindow({}))}
      >
        <AiOutlineCloseCircle size={25} />
      </button>
      <div className="header-section section">
        <p>Load you avatar</p>
      </div>
      <hr/>
      <div className="input-section section">
        <img src={`${avatar ? avatar : 'https://yt3.googleusercontent.com/ytc/AGIKgqN-mCzwpbEqp84-_B9jzFKPvytC5zqTrqLMjac5=s900-c-k-c0x00ffffff-no-rj'}`} alt="" />
        <form ref={formRef} onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
          <label>
            <span className="green">
              Load
            </span>
            <input 
              type="file" 
              name='img' 
              onChange={(e) => {
                const fileReader = new FileReader();
                fileReader.onload = function() {
                  setAvatar(fileReader.result);
                }
                if (e.target.files) {
                  fileReader.readAsDataURL(e.target.files[0]);
                }
              }}
            />
          </label>
        </form>
        <button className={avatar ? 'green' : 'blocked'} onClick={() => refetch()}>
          Set Avatar
        </button>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default LoadAvatarWindow;
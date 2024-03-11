import { ChangeEvent, FC, useState } from "react";
import './styles.scss';
import { Helpers } from "../../../../shared/helpers";
import { useAppSelector } from "../../../../app/store";
import { MusicFeaturesLib } from "../../../../fetures/music";

interface CAWProps {
  onClose: () => void,
  updateAvatar: (image: string) => void,
  musicianId: number,
}
export const ChangeAvatarWindow: FC<CAWProps> = ({ updateAvatar, musicianId, onClose }) => {

  const { user } = useAppSelector(state => state.user);

  const [image, setImage] = useState<File>();

  const {
    mutateAsync,
  } = MusicFeaturesLib.useUpdateMusicianAvatar(updateAvatar)

  return (
    <div className="change-avatar-window window">
      <div className="header section">
        <h3>Add Image</h3>
      </div>
      <hr/>
      <div className="main section">
        <img 
          src={Helpers.getImageUrlFromFile(image)}
          alt="IMG" 
        />
        <label>
          <input
            type="file"
            name='img'
            style={{display: 'none'}}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (!e.target.files) {
                return;
              }
              const files = e.target.files;
              setImage(files[0]);
              const fileReader = new FileReader();
              if (e.target.files) {
                fileReader.readAsDataURL(e.target.files[0]);
              }
            }}
          />
          <span 
            className="gray-to-white green"
          >
            Добавить изображение
          </span>
        </label>
        <button
          className='white-back save-button'
          onClick={() => {
            if (!image) {
              return;
            }
            mutateAsync({imageFile: image, musicianId})
            .then(() => onClose())
          }}
        >
          Сохранить
        </button>
      </div>
    </div>
  )
}
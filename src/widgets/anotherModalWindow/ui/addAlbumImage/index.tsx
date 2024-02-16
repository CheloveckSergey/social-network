import { ChangeEvent, FC, useState } from 'react';
import { useAppSelector } from '../../../../app/store';
import './styles.scss';
import { ImagesActions, ImagesActionsLib } from '../../../../fetures/images';
import { OneAlbumImage } from '../../../../entities/image';

interface AIWProps {
  albumId: number,
  onClose: () => void,
  addImage: (image: OneAlbumImage) => void,
}
export const AddImageWindow: FC<AIWProps> = ({ albumId, onClose, addImage }) => {
  const { user } = useAppSelector(state => state.user);

  const [image, setImage] = useState<File>();

  const {
    mutate
  } = ImagesActionsLib.useCreateALbumImage(user!.author.id, addImage);

  function getImageFromFile(image: File | undefined): string {
    if (image) {
      return URL.createObjectURL(image);
    } else {
      return 'https://sun9-71.userapi.com/c604520/u329319273/video/y_13590500.jpg';
    }
  }

  return (
    <div className="window add-image-window">
      <div className="header section">
        <h3>Add Image</h3>
      </div>
      <hr/>
      <div className="main section">
        <img 
          src={getImageFromFile(image)}
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
            mutate({file: image, albumId})
            .then(() => onClose())
          }}
        >
          Сохранить
        </button>
      </div>
    </div>
  )
}

function getGroupNameFromUrl() {
  const tralala = window.location.href;
  const regexp = /\/groups\/\w+/;
  const lol = tralala.match(regexp);
  let groupName;
  if (lol) {
    groupName = lol[0].slice(8);
  }
  return groupName;
}
import { ChangeEvent, FC, useState } from "react";
import { Helpers } from "../../../../shared/helpers";
import './styles.scss';

interface AIWTProps {
  header: string,
  addImage: (imageFile: File) => void,
}
export const AddImageWindowType: FC<AIWTProps> = ({ header, addImage }) => {

  const [image, setImage] = useState<File>();

  return (
    <div className="add-image-window window">
      <div className="header section">
        <h3>{header}</h3>
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
            addImage(image);
          }}
        >
          Сохранить
        </button>
      </div>
    </div>
  )
}
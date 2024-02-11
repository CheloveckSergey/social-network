import { ChangeEvent, FC, useState } from "react";
import './styles.scss';
import { AlbumFeaturesLib } from "../../../../fetures/album";
import { OneAlbum } from "../../../../entities/image";

interface AAWProps {
  authorId: number,
  addAlbum: (album: OneAlbum) => void,
  onClose: () => void,
}
export const AddAlbumWindow: FC<AAWProps> = ({ authorId, addAlbum, onClose }) => {

  const [name, setName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    create,
    isLoading,
    isError,
  } = AlbumFeaturesLib.useCreateAlbum(authorId, addAlbum)

  return (
    <div className="add-album-window regular-panel">
      <div className="section header">
        <h3>Add Album</h3>
        {isError && <p className="font-error">{errorMessage}</p>}
      </div>
      <hr/>
      <div className="section main">
        <input 
          className="name-input"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => { 
            if (errorMessage.length > 0) {
              setErrorMessage('');
            }
            setName(e.target.value);
          }}
        />
        <button
          className="white-back add-button"
          onClick={() => {
            create({name})
            .then(() => onClose())
            .catch(() => setErrorMessage('Что-то пошло не так'))
          }}
        >
          Добавить
        </button>
      </div>
    </div>
  )
}
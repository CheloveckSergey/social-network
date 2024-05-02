import { ChangeEvent, FC, useState } from "react";
import './styles.scss';
import { AlbumFeaturesLib } from "../../../../fetures/album";
import { OneAlbum } from "../../../../entities/image";

interface AAWProps {
  submit: (name: string) => any,
  isError: boolean,
  isLoading: boolean,
}
export const AddAlbumWindow: FC<AAWProps> = ({ submit, isError, isLoading }) => {

  const [name, setName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

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
            submit(name);
          }}
        >
          Добавить
        </button>
      </div>
    </div>
  )
}
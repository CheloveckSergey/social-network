import { ChangeEvent, FC, useEffect, useState } from "react";
import { SharedUi } from "../../../../shared/sharedUi";
import { MusicFeaturesLib } from "../../../../fetures/music";
import './styles.scss';
import { Helpers } from "../../../../shared/helpers";
import { Music } from "../../../../entities/music";

interface LMWProps {
  onClose: () => void,
  addMusic: (music: Music) => void,
}
export const LoadMusicWindow: FC<LMWProps> = ({ onClose,addMusic }) => {

  const [musicFile, setMusicFile] = useState<File>();
  const [name, setName] = useState<string>('');
  const [musician, setMusician] = useState<string>('');
  const [musicImage, setMusicImage] = useState<File>();
  const [error, setError] = useState<string>('');

  const {
    mutateAsync,
  } = MusicFeaturesLib.useCreateMusic(addMusic);

  const disabled: boolean = !musicFile || !name || !musician;

  return (
    <div className="window load-music-window">
      <div className="header section">
        <h3>Load Music</h3>
      </div>
      <hr/>
      <div className="main section">
        <SharedUi.Inputs.FileLabel
          text="Load Music"
          setFile={setMusicFile}
        />
        {musicFile && (<>
          <p>{musicFile.name}</p>
          <p>Enter the name</p>
          <input 
            type="text" 
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setError('');
              setName(e.target.value);
            }}
          />
          <p>Enter the musician</p>
          <input 
            type="text" 
            value={musician}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setError('');
              setMusician(e.target.value);
            }}
          />
          <img 
            className="music-image"
            src={Helpers.getImageUrlFromFile(musicImage)}
            alt="IMG" 
          />
          <SharedUi.Inputs.FileLabel
            text="Load Image"
            setFile={setMusicImage}
            labelClass="image-input-class"
          />
          <button 
            className={`send white-back ${disabled ? 'disabled' : ''}`}
            onClick={() => {
              if (disabled) {
                setError('Не все данные заполнены');
                return;
              }

              mutateAsync({musicName: name, musicianName: musician, musicFile, imageFile: musicImage})
              .then((data) => {
                console.log(data);
                onClose();
              })
              .catch(() => setError('Какая-то ошибка'))
            }}
          >
            Send
          </button>
        </>)}
        <p className="error-message">{error}</p>
      </div>
    </div>
  )
}
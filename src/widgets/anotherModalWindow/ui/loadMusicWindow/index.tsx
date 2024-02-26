import { ChangeEvent, FC, useState } from "react";
import './styles.scss';
import { SharedUi } from "../../../../shared/sharedUi";
import { MusicFeaturesLib } from "../../../../fetures/music";

interface LMWProps {
  onClose: () => void,
}
export const LoadMusicWindow: FC<LMWProps> = ({ onClose }) => {

  const [musicFile, setMusicFile] = useState<File>();
  const [name, setName] = useState<string>('');
  const [musician, setMusician] = useState<string>('');
  const [error, setError] = useState<string>('');

  const {
    mutateAsync,
  } = MusicFeaturesLib.useCreateMusic();

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
        <button 
          className="send white-back"
          onClick={() => {
            if (!musicFile || !name || !musician) {
              setError('Не все данные заполнены');
              return;
            }

            mutateAsync({musicName: name, musicianName: musician, musicFile})
            .then((data) => {
              console.log(data);
              onClose();
            })
            .catch(() => setError('Какая-то ошибка'))
          }}
        >
          Send
        </button>
        <p className="error-message">{error}</p>
      </div>
    </div>
  )
}
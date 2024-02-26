import { FC, useState } from "react";
import './styles.scss';
import { ModalWindows, UseModalWindow } from "../../../widgets/anotherModalWindow/ui";
import { IoMdAdd } from "react-icons/io";
import { MusicsLib } from "../../../entities/music/lib";
import { MusicUi } from "../../../entities/music/ui";

export const GeneralMusic: FC = () => {

  const [showAddMusicWindow, setShowAddMusicWindow] = useState<boolean>(false);

  const musicListInterface = MusicsLib.useAllMusic();

  return (
    <div className="regular-panel general-music">
      <div className="header">
        <h3>Music</h3>
        <div className="right">
          <button 
            className="add-music-button white"
            onClick={() => setShowAddMusicWindow(true)}
          >
            <IoMdAdd size={25} />
          </button>
        </div>      
      </div>
      <div className="all-music">
        <MusicUi.MusicList 
          musicList={musicListInterface}
        />
      </div>
      <UseModalWindow 
        condition={showAddMusicWindow}
        onClose={() => setShowAddMusicWindow(false)}
      >
        <ModalWindows.LoadMusicWindow 
          onClose={() => setShowAddMusicWindow(false)}
        />
      </UseModalWindow>
    </div>
  )
}
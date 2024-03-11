import { FC, useState } from "react";
import './styles.scss';
import { ModalWindows, UseModalWindow } from "../../../widgets/anotherModalWindow/ui";
import { IoMdAdd } from "react-icons/io";
import { MusicsLib } from "../../../entities/music/lib";
import { MusicUi } from "../../../entities/music/ui";
import { Music } from "../../../entities/music";
import { MusicLine } from "../../../entities/music/ui/musicLine";
import { MusicFeaturesUi } from "../../../fetures/music";
import { useAppSelector } from "../../../app/store";

export const GeneralMusic: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const [showAddMusicWindow, setShowAddMusicWindow] = useState<boolean>(false);

  const musicListInterface = MusicsLib.useAllMusic(user!.author.id);

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
          musics={musicListInterface.musics}
          isLoading={musicListInterface.isLoading}
          isError={musicListInterface.isError}
          renderMusicLine={(music: Music, index: number) => <MusicLine 
            key={index}
            music={music}
            playPauseButton={<MusicFeaturesUi.PlayPauseMusicButton 
              music={music}
              musics={musicListInterface.musics}
              index={index}
            />}
            rightButtons={[
              <MusicFeaturesUi.DeleteMusicButton 
                key={0}
                music={music}
                deleteMusic={musicListInterface.deleteMusic}
              />
            ]}
          />}
        />
      </div>
      <UseModalWindow 
        condition={showAddMusicWindow}
        onClose={() => setShowAddMusicWindow(false)}
      >
        <ModalWindows.LoadMusicWindow 
          onClose={() => setShowAddMusicWindow(false)}
          addMusic={musicListInterface.addMusic}
        />
      </UseModalWindow>
    </div>
  )
}
import { FC, useState } from "react";
import './styles.scss';
import { ModalWindows, UseModalWindow } from "../../../widgets/anotherModalWindow/ui";
import { IoMdAdd } from "react-icons/io";
import { MusicsLib } from "../../../entities/music/lib";
import { MusicUi } from "../../../entities/music/ui";
import { Music, MyMusic } from "../../../entities/music";
import { MusicLine } from "../../../entities/music/ui/musicLine";
import { MusicFeaturesUi } from "../../../fetures/music";
import { useAppSelector } from "../../../app/store";

export const GeneralMusic: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const [showAddMusicWindow, setShowAddMusicWindow] = useState<boolean>(false);

  const {
    musics,
    isLoading,
    isError,
    deleteMusic,
    addMusic,
    addMusicToAdded,
    deleteMusicFromAdded,
  } = MusicsLib.useAllMusic(user!.author.id);

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
        <MusicUi.MusicList<MyMusic>
          musics={musics}
          isLoading={isLoading}
          isError={isError}
          renderMusicLine={(music: MyMusic, index: number) => <MusicLine 
            key={index}
            music={music}
            playPauseButton={<MusicFeaturesUi.PlayPauseMusicButton 
              music={music}
              musics={musics}
              index={index}
            />}
            rightButtons={[
              <MusicFeaturesUi.DeleteMusicButton 
                key={0}
                music={music}
                deleteMusic={deleteMusic}
              />,
              (user && <MusicFeaturesUi.AddDeleteMusicToAddedButton 
                musicId={music.id}
                authorId={user.author.id}
                addMusicToAdded={addMusicToAdded}
                deleteMusicFromAdded={deleteMusicFromAdded}
                added={music.added}
              />)
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
          addMusic={addMusic}
        />
      </UseModalWindow>
    </div>
  )
}
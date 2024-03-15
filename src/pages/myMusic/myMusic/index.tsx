import { FC, useState } from "react";
import './styles.scss';
import { IoMdAdd } from "react-icons/io";
import { ModalWindows, UseModalWindow } from "../../../widgets/anotherModalWindow/ui";
import { MusicsLib } from "../../../entities/music/lib";
import { useAppSelector } from "../../../app/store";
import { MusicUi } from "../../../entities/music/ui";
import { Music, MyMusic } from "../../../entities/music";
import { MusicFeaturesUi } from "../../../fetures/music";

export const MyMusicPanel: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const {
    musics,
    isLoading,
    isError,
    addMusic,
    deleteMusic,
  } = MusicsLib.useAddedMusic(user!.author.id)

  return (
    <div className="my-music regular-panel">
      <MusicUi.MusicList<MyMusic>
        musics={musics}
        isLoading={isLoading}
        isError={isError}
        renderMusicLine={(music: MyMusic, index: number) => <MusicUi.MusicLine 
          key={index}
          music={music}
          playPauseButton={<MusicFeaturesUi.PlayPauseMusicButton 
            index={index}
            music={music}
            musics={musics}
          />}
          rightButtons={<MusicFeaturesUi.AddDeleteMusicToAddedButton 
            musicId={music.id}
            authorId={user!.author.id}
            added={music.added}
            addMusicToAdded={addMusic}
            deleteMusicFromAdded={deleteMusic}
          />}
        />}
      />
    </div>
  )
}
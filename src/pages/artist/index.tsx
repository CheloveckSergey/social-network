import { FC, useRef, useState } from "react";
import Upbar from "../../widgets/upbar";
import { ScrollUpPanel } from "../../widgets/scrollUpPanel";
import LeftMenu from "../../widgets/leftMenu";
import './styles.scss';
import { useParams } from "react-router-dom";
import { Helpers } from "../../shared/helpers";
import { MusicUi } from "../../entities/music/ui";
import { MusicsLib } from "../../entities/music/lib";
import { SharedUi } from "../../shared/sharedUi";
import { ModalWindows, UseModalWindow } from "../../widgets/anotherModalWindow/ui";
import { Music } from "../../entities/music";
import { MusicFeaturesUi } from "../../fetures/music";
import { useAppSelector } from "../../app/store";

interface HProps {
  artistId: number,
}
const Header: FC<HProps> = ({ artistId }) => {

  const [showCAWindow, setShowCAWindow] = useState<boolean>(false);

  const {
    musician,
    isLoading,
    isError,
    updateAvatar,
  } = MusicsLib.useMusician(artistId);

  return (
    <div className="artist-header regular-panel">
      <SharedUi.Helpers.LoadErrorHandler
        isLoading={isLoading}
        isError={isError}
      >
        {musician ? (<>
          <div className="avatar">
            <img 
              className="musician-avatar"
              src={Helpers.getImageSrc(musician.image)}
              alt="IMG" 
            />
            <button
              className="change-avatar green"
              onClick={() => setShowCAWindow(true)}
            >
              Change Avatar
            </button>
          </div>
          <div className="right">
            <div className="description">
              <h3>{musician.name}</h3>
            </div>
          </div>
        </>) : (
          <SharedUi.Divs.Empty body="There's no musician" />
        )}
      </SharedUi.Helpers.LoadErrorHandler>
      <UseModalWindow
        condition={showCAWindow}
        onClose={() => setShowCAWindow(false)}
      >
        <ModalWindows.ChangeAvatarWindow
          musicianId={artistId}
          onClose={() => setShowCAWindow(false)}
          updateAvatar={updateAvatar}
        />
      </UseModalWindow>
    </div>
  )
}

interface MLProps {
  musicianId: number,
}
const MusicList: FC<MLProps> = ({ musicianId }) => {

  const { user } = useAppSelector(state => state.user);

  const musicListInterface = MusicsLib.useMusicByMusician(musicianId);

  console.log(musicListInterface);

  return (
    <div className="music-list regular-panel">
      <MusicUi.MusicList
        musics={musicListInterface.musics}
        isLoading={musicListInterface.isLoading}
        isError={musicListInterface.isError}
        renderMusicLine={(music: Music, index: number) => <MusicUi.MusicLine 
          key={index}
          music={music}
          playPauseButton={<MusicFeaturesUi.PlayPauseMusicButton 
            index={index}
            music={music}
            musics={musicListInterface.musics}
          />}
          rightButtons={[
            // (user && <MusicFeaturesUi.AddDeleteMusicToAddedButton 
            //   musicId={music.id} 
            //   authorId={user!.author.id}
            //   added={music}
            // />)
          ]}
        />}
      />
    </div>
  )
}

export const ArtistPage: FC = () => {

  const { artistId } = useParams();

  const emptyRef = useRef<HTMLDivElement>(null);

  function scrollUp() {
    if (emptyRef.current) {
      emptyRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }

  return (
    <>
      <div ref={emptyRef}></div>
      <Upbar />
      <ScrollUpPanel 
        scrollUp={scrollUp}
      />
      <main 
        className=""
      >
        <LeftMenu />
        <div className="my-music-page">
          <div className="main">
            <Header artistId={Number(artistId)} />
            <MusicList musicianId={Number(artistId)} />
          </div>
        </div>
      </main>
    </>
  )
}
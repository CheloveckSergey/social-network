import { ChangeEvent, FC, MouseEvent, useEffect, useRef, useState } from "react";
import './styles.scss';
import { BiSolidSkipNextCircle, BiSolidSkipPreviousCircle } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { FaCreativeCommonsRemix, FaMotorcycle, FaPause, FaPlay } from "react-icons/fa";
import { AudioSliceActions } from "../../../entities/music/model/store";
import { useDispatch } from "react-redux";
import { MusicUi } from "../../../entities/music/ui";
import { SharedHooks } from "../../../shared/hooks";
import { Music } from "../../../entities/music";
import { Helpers } from "../../../shared/helpers";
import { MusicFeaturesUi } from "../../../fetures/music";

const ControlButtons: FC = () => {

  const { music, isPlaying } = useAppSelector(state => state.audio);

  const dispatch = useAppDispatch();

  return (
    <div className="control-buttons">
      <button
        className="prev-music inherit-to-green"
        onClick={() => {
          if (music) {
            dispatch(AudioSliceActions.previous({}));
          }
        }}
      >
        <BiSolidSkipPreviousCircle size={25} />
      </button>
      {isPlaying ? (
        <button
          className="pause inherit-to-green"
          onClick={() => {
            dispatch(AudioSliceActions.pause({}));
          }}
        >
          <FaPause size={25} />
        </button>
      ) : (
        <button
          className="play inherit-to-green"
          onClick={() => {
            if (music) {
              dispatch(AudioSliceActions.play({}))
            }
          }}
        >
          <FaPlay size={25} />
        </button>
      )}
      <button
        className="next-music inherit-to-green"
        onClick={() => {
          if (music) {
            dispatch(AudioSliceActions.next({}));
          }
        }}
      >
        <BiSolidSkipNextCircle size={25} />
      </button>
    </div>
  )
}

const MusicSlider: FC = () => {

  const { progressTime, duration } = useAppSelector(state => state.audio);

  const dispatch = useAppDispatch();

  return (
    <div className="music-controller">
      <span className="progress-time">{Helpers.convertTime(progressTime)}</span>
      <input 
        className="music-slider"
        type='range'
        value={progressTime}
        min='0'
        max={duration}
        step='0.01'
        onChange={(e: ChangeEvent<any>) => {
          console.log('changeEvent');
          console.log(e.target.value);
          dispatch(AudioSliceActions.setAudioTime({audioTime: e.target.value}));
        }}
      />
      <span className="duration">{Helpers.convertTime(duration)}</span>
    </div>
  )
}

const LoudnessSlider: FC = () => {

  return (
    <input 
      className="loudness-slider"
      type="range" 
    />
  )
}

interface PUWProps {
  close: () => void,
  music: Music,
  musics: Music[],
  ref:  React.RefObject<HTMLDivElement>,
}
const PopUpWindow: FC<PUWProps> = ({ close, music, musics, ref }) => {


  // const windowRef = useRef<HTMLDivElement>(null);

  SharedHooks.useClickOutside(ref, () => {
    close();
  });

  return (
    <div
      className="pop-up-music-window"
    >
      <div className="header">
        <ControlButtons />
        <button
          className="cycle-button white"
        >
          <FaMotorcycle size={25} />
        </button>
        <button
          className="mix-button white"
        >
          <FaCreativeCommonsRemix size={25} />
        </button>
        <div className="main">
          <MusicUi.MusicView music={music} />
          <MusicSlider />
        </div>
        <LoudnessSlider />
      </div>
      <hr/>
      <div className="songs-list">
        {musics.map((music, index) => <MusicUi.MusicLine 
          key={index}
          music={music}
          playPauseButton={<MusicFeaturesUi.PlayPauseMusicButton 
            index={index}
            music={music}
            musics={musics}
          />}
          rightButtons={[]}
        />)}
      </div>
    </div>
  )
}

export const MusicPlayer: FC = () => {
  const { music, musics, isPlaying } = useAppSelector(state => state.audio);

  const [showPopUp, setShowPopUp] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const windowRef = useRef<HTMLDivElement>(null);

  function close() {
    setShowPopUp(false);
  }

  return (
    <div 
      ref={windowRef}
      className="music-player"
    >
      <div 
        className="upbar-music-panel"
        onClick={(e: MouseEvent<HTMLDivElement>) => {
          console.log(e.target);
          if (music && !showPopUp) {
            setShowPopUp(true);
          }
          if (showPopUp) {
            setShowPopUp(false);
          }
        }}  
      >
        <ControlButtons />
        <div>
          {music && <>
            <p>{music.musician.name + ' - ' + music.name}</p>
          </>}
        </div>
      </div>
      {showPopUp && music && (
        <PopUpWindow 
          music={music}
          musics={musics}
          close={close}
          ref={windowRef}
        />
      )}
    </div>
  )
}
import { ChangeEvent, FC, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { Helpers } from "../../shared/helpers";
import { AudioSliceActions } from "../../entities/music/model/store";

export const AudioRoot: FC = () => {

  const { curIndex, musics, music, isPlaying, audioTime } = useAppSelector(state => state.audio);

  const audioRef = useRef<HTMLAudioElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, music]);

  useEffect(() => {
    if (!audioRef.current) {
      return
    }
    audioRef.current.currentTime = audioTime;
  }, [audioTime]);

  return (
    <audio 
      ref={audioRef}
      src={Helpers.getMusicSrc(musics[curIndex]?.value)}
      onLoadedData={(e: ChangeEvent<HTMLAudioElement>) => {
        dispatch(AudioSliceActions.setDuration({duration: e.target.duration}));
      }}
      onTimeUpdate={(e: ChangeEvent<HTMLAudioElement>) => {
        dispatch(AudioSliceActions.setProgressTime({progressTime: e.target.currentTime}));
      }}
      hidden={true}
      loop
    />
  )
}
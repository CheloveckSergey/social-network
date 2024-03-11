import { FC } from "react";
import { Music } from "../../../entities/music";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { AudioSliceActions } from "../../../entities/music/model/store";
import { FaPauseCircle, FaPlayCircle, FaPlus, FaTrashAlt } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { MusicFeaturesLib } from "../lib";

interface PPMBProps {
  musics: Music[],
  index: number,
  music: Music,
}
const PlayPauseMusicButton: FC<PPMBProps> = ({ musics, index, music }) => {
  const { isPlaying, musics: allMusics, curIndex, music: curMusic } = useAppSelector(state => state.audio);

  const dispatch = useAppDispatch();

  const { setMusicAndPlay, pause } = AudioSliceActions; 

  return (
    <>
      {(curMusic?.id === music.id) && isPlaying ? (
        <button
          className="pause inherit-to-green"
          onClick={() => {
            dispatch(pause({}));
          }}
        >
          <FaPauseCircle size={25} />
        </button>
      ) : (
        <button
          className="play inherit-to-green"
          onClick={() => {
            dispatch(setMusicAndPlay({music, musics, curIndex: index}));
          }}
        >
          <FaPlayCircle size={25} />
        </button>
      )}
    </>
  )
}

interface DMBProps {
  music: Music,
  deleteMusic?: (musicId: number) => void,
}
const DeleteMusicButton: FC<DMBProps> = ({ music, deleteMusic }) => {

  const {
    mutateAsync,
  } = MusicFeaturesLib.useDeleteMusic(deleteMusic);

  return (
    <button 
      className="delete-music white"
      onClick={() => {
        mutateAsync({id: music.id})
      }}
    >
      <AiFillDelete size={25} />
    </button>
  )
}

interface AMTABProps {
  musicId: number,
  authorId: number,
  added: boolean,
  addMusicToAdded: (music: Music) => void,
  deleteMusicFromAdded: (music: Music) => void,
}
const AddDeleteMusicToAddedButton: FC<AMTABProps> = ({ musicId, authorId, added, addMusicToAdded, deleteMusicFromAdded }) => {

  const {
    mutateAsync,
  } = MusicFeaturesLib.useAddDeleteMusicToAdded(added, addMusicToAdded, deleteMusicFromAdded);

  return (
    <button
      className="add-music-to-added white"
      onClick={() => {
        mutateAsync({authorId, musicId})
      }}
    >
      {added ? (
        <FaTrashAlt size={25} />
      ) : (
        <FaPlus size={25} />
      )}
    </button>
  )
}

export const MusicFeaturesUi = {
  PlayPauseMusicButton,
  DeleteMusicButton,
  AddDeleteMusicToAddedButton,
}
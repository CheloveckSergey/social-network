import { FC } from "react";
import { Music } from "../..";
import './styles.scss';
import { Helpers } from "../../../../shared/helpers";
import { useNavigate } from "react-router-dom";

interface MVProps {
  music: Music,
}
export const MusicView: FC<MVProps> = ({ music }) => {

  const navigate = useNavigate();

  return (
    <div className="music-view">
      <img 
        className="music-image"
        src={Helpers.getImageSrc(music.image)} 
        alt="MUSIC" 
      />
      <div className="description">
        <h5 
          className="musician-name ref"
          onClick={() => {
            navigate('/artist/' + music.musicianId);
          }}
        >
        </h5>
        <p className="music-name">{music.name}</p>
      </div>
    </div>
  )
}
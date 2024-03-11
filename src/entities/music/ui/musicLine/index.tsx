import { FC } from "react";
import { Music, MyMusic } from "../../model";
import { Helpers } from "../../../../shared/helpers";
import './styles.scss';
import { useNavigate } from "react-router-dom";

interface MLProps {
  music: Music,
  playPauseButton: React.ReactNode | React.ReactNode[],
  rightButtons:  React.ReactNode | React.ReactNode[],
}
export const MusicLine: FC<MLProps> = ({ music, playPauseButton, rightButtons }) => {

  const navigate = useNavigate();

  return (
    <div className="music-line to-gray-back">
      <div className="image-container">
        <img 
          className="music-image"
          src={Helpers.getImageSrc(music.image)} 
          alt="MUSIC" 
        />
        <div className="image-cover">
          {playPauseButton}
        </div>
      </div>
      <div className="description">
        <h5 
          className="musician-name"
          onClick={() => {
            navigate('/artist/' + music.musicianId);
          }}
        >
          {music.musician.name}
        </h5>
        <p className="music-name">{music.name}</p>
      </div>
      <div className="right">
        {rightButtons}
      </div>
    </div>
  )
}
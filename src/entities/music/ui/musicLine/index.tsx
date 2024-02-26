import { FC } from "react";
import { Music } from "../../model";
import { Helpers } from "../../../../shared/helpers";
import './styles.scss';
import { FaPlayCircle } from "react-icons/fa";

interface MLProps {
  music: Music,
}
export const MusicLine: FC<MLProps> = ({ music }) => {

  return (
    <div className="music-line to-gray-back">
      <div className="image-container">
        <img 
          className="music-image"
          src={Helpers.getImageSrc(music.image)} 
          alt="MUSIC" 
        />
        <div className="image-cover">
          <button
            className="play inherit-to-green"
          >
            <FaPlayCircle size={25} />
          </button>
        </div>
      </div>
      <div className="description">
        <h5 className="musician-name">{music.musician.name}</h5>
        <p className="music-name">{music.name}</p>
      </div>
    </div>
  )
}
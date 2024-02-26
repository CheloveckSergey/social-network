import { FC } from "react";
import './styles.scss';
import { useSearchParams } from "react-router-dom";

export const MusicMenu: FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="regular-panel music-menu">
      <h4 
        className="gray-to-light-back"
        onClick={() => setSearchParams((prev) => {
          prev.set('section', 'general');
          return prev;
        })}
      >
        General
      </h4>
      <h4 
        className="gray-to-light-back"
        onClick={() => setSearchParams((prev) => {
          prev.set('section', 'my-music');
          return prev;
        })}
      >
        My music
      </h4>
    </div>
  )
}
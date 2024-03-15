import { FC, useRef } from "react";
import { useAppSelector } from "../../app/store";
import Upbar from "../../widgets/upbar";
import { ScrollUpPanel } from "../../widgets/scrollUpPanel";
import LeftMenu from "../../widgets/leftMenu";
import { MyMusicPanel } from "./myMusic";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { MusicMenu } from "./menu";
import './styles.scss';
import { GeneralMusic } from "./general";

export const MusicPage: FC = () => {
  const { user } = useAppSelector(state => state.user);

  const location = useLocation();
  const section = new URLSearchParams(location.search).get('section');

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
            {section === 'general' && user ? (
              <GeneralMusic />
            ) : section === 'my-music' && user ? (
              <MyMusicPanel />
            ) : (
              <></>
            )}
          </div>
          <div className="right">
            <MusicMenu />
          </div>
        </div>
      </main>
    </>
  )
}
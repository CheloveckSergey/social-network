import { FC, useRef } from "react";
import LeftMenu from "../../widgets/leftMenu";
import Upbar from "../../widgets/upbar";
import './styles.scss';
import { User } from "../../entities/user";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { WindowTypes, setWindow } from "../../widgets/modalWindow/model/redux";
import AddPostPanel from "../../widgets/addPost";
import { getImageSrc } from "../../shared/service/images";
import HomeImages from "./homeImages";
import { Info } from "./homeInfo";
import { HomeFeed } from "./homeFeed";
import { HomeAvatar } from "./homeAvatar";
import { ScrollUpPanel } from "../../widgets/scrollUpPanel";
import { setTimeout } from "timers/promises";

const Home: FC = () => {
  const { user } = useAppSelector(state => state.user);

  const emptyRef = useRef<HTMLDivElement>(null);

  function scrollUp() {
    if (emptyRef.current) {
      emptyRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }

  

  if (!user) {
    return (
      <>
        There's no any user :(
      </>
    )
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
        <div className="home">
          <div className="home-extra">
            <HomeAvatar user={user} />
          </div>
          <div className="home-main">
            <Info user={user} />
            <HomeImages user={user} />
            <AddPostPanel author={user.author} />
            <HomeFeed meUser={user} />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home;
import { FC } from "react";
import LeftMenu from "../../widgets/leftMenu";
import Upbar from "../../widgets/upbar";
import './styles.scss';
import { User } from "../../entities/user";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { WindowTypes, setWindow } from "../../widgets/modalWindow/model/redux";
import AddPostPanel from "../../shared/addPost";
import { getImageSrc } from "../../shared/service/images";
import HomeImages from "./homeImages";
import { Info } from "./homeInfo";
import { HomeFeed } from "./homeFeed";
import { HomeAvatar } from "./homeAvatar";

const Home: FC = () => {
  const { user } = useAppSelector(state => state.user);

  if (!user) {
    return (
      <>
        There's no any user :(
      </>
    )
  }

  return (
    <>
      <Upbar />
      <main>
        <LeftMenu />
        <div className="home">
          <div className="home-extra">
            <HomeAvatar user={user} />
          </div>
          <div className="home-main">
            <Info user={user} />
            {/* <HomeImages user={user} /> */}
            <AddPostPanel author={user.author} />
            <HomeFeed user={user} />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home;
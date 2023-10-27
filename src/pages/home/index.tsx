import { FC } from "react";
import LeftMenu from "../../widgets/leftMenu";
import Upbar from "../../widgets/upbar";
import './styles.scss';
import { User } from "../../entities/user";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { WindowTypes, setWindow } from "../../widgets/modalWindow/model/redux";
import Feed from "../../widgets/feed";
import { useQuery } from "react-query";
import { PostApi } from "../../entities/post/api";
import AddPostPanel from "../../shared/addPost";
import { getImageSrc } from "../../shared/service/images";
import HomeImages from "./homeImages";
import { Info } from "./homeInfo";

interface HomeAvatarProps {
  user: User | undefined,
}

const HomeAvatar: FC<HomeAvatarProps> = ({ user }) => {

  const dispatch = useAppDispatch();

  const img = getImageSrc(user?.avatar) || 'https://pichold.ru/wp-content/uploads/2021/03/10976505-1.jpg';

  return (
    <div className="home-avatar regular-panel">
      <img src={img} alt={process.env.REACT_APP_BACK_URL} />
      <button
        onClick={() => dispatch(setWindow({window: WindowTypes.LOAD_USER_AVATAR}))}
      >
        Edit
      </button>
    </div>
  )
}

interface HomeFeedProps {
  user: User | undefined,
}

const HomeFeed: FC<HomeFeedProps> = ({ user }) => {
  const { data, isLoading, isError } = useQuery(
    ['loadQuery', user?.id],
    () => {
      if (user?.id) {
        return PostApi.getAllPostsByAuthorId(user.author.id);
      }
    }
  )

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>ErrorХуйня...</p>
      ) : !data ? (
        <p>Something went wrong...</p>
      ) : (
        <Feed posts={data} />
      )}
    </>
  )
}

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
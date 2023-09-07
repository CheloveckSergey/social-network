import { FC } from "react";
import LeftMenu from "../../widgets/leftMenu";
import Upbar from "../../widgets/upbar";
import './styles.scss';
import { User } from "../../entities/user/model/redux";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { WindowTypes, setWindow } from "../../widgets/modalWindow/model/redux";
import { BsPencilSquare } from 'react-icons/bs';
import Feed from "../../widgets/feed";
import { useQuery } from "react-query";
import { UserApi } from "../../entities/user/api";
import { PostApi } from "../../entities/post/api";
import AddPostPanel from "../../shared/addPost";
import ImagesFeed from "../../widgets/imagesFeed";
import ImageApi from "../../entities/image/api";

interface HomeAvatarProps {
  user: User | undefined,
}

const HomeAvatar: FC<HomeAvatarProps> = ({ user }) => {

  const dispatch = useAppDispatch();

  const img = user?.avatar ? (process.env.REACT_APP_BACK_URL + user.avatar) : 'https://pichold.ru/wp-content/uploads/2021/03/10976505-1.jpg';

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

interface InfoProps {
  user: User | undefined,
}

const Info: FC<InfoProps> = ({ user }) => {

  const { data } = useQuery(
    ['getUserDesc', user?.id],
    () => {
      if (user?.id) {
        return UserApi.getUserDesc(user.id);
      }
    }
  )

  return (
    <div className="info regular-panel">
      <div>
        <h2>{user?.login}</h2>
        {data?.quote && <p>
          {data?.quote}
        </p>}
      </div>
      <hr/>
      <div>
        <div className="string-info">
          <p className="extra-normal">Birth Date</p>
          <p>{data?.data}</p>
        </div>
        {data?.city && <div className="string-info">
          <p className="extra-normal">City</p>
          <p>{data?.city}</p>
        </div>}
        {data?.telephone && <div className="string-info">
          <p className="extra-normal">Telephone</p>
          <p>{data?.telephone}</p>
        </div>}
        <div className="add-info">
          <button className="show-more">
            Show additional information
          </button>
        </div>
      </div>
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
        return PostApi.getAllPostsByUserId(user.id);
      }
    }
  )

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error...</p>
      ) : !data ? (
        <p>Something went wrong...</p>
      ) : (
        <Feed posts={data} />
      )}
    </>
  )
}

interface HomeImagesProps {
  user: User | undefined,
}

const HomeImages: FC<HomeImagesProps> = ({ user }) => {
  const { data, isLoading, isError } = useQuery(
    ['getUserImages', user?.id],
    () => {
      if (user) {
        return ImageApi.getAllImagesByUserId(user.id)
      }
    }
  )

  const images = data?.slice(0, 3);

  return (
    <ImagesFeed
      images={images} 
      isError={isError}
      isLoading={isLoading}
    />
  )
}

const Home: FC = () => {
  const { user } = useAppSelector(state => state.user);

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
            <HomeImages user={user} />
            <AddPostPanel windowType={WindowTypes.ADD_USER_POST} />
            <HomeFeed user={user} />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home;
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

// const fakeUser: User = {
//   name: 'Zhenya',
//   avatar: 'https://image.krasview.ru/thread/18214/c42b006c94e05ec5169ab2765506d6c2.jpg',
//   date: '21 февраля 2000',
//   city: 'Livny',
//   familyStatus: 'idle',
//   work: 'cladman',
//   telephone: '89538118184',
//   description: "Here must be some description or something...",
//   images: [
//     'https://nypost.com/wp-content/uploads/sites/2/2015/01/petergriffin1.jpg?quality=75&amp;strip=all&amp;w=1024',
//     'https://i.pinimg.com/originals/2a/b8/fc/2ab8fc2eff2dd39de5dcdebf76e311ba.jpg',
//     'https://sun9-8.userapi.com/impf/c847120/v847120693/1c4fad/D3ScTHn1-G8.jpg?size=1280x960&quality=96&sign=cf2a964c3ff72c98f7e99da5a4f8ed21&c_uniq_tag=lSnSxMUW3EquyoS-g5Xi-Faik7cJBSQcG7RrDgypx4E&type=album',
//     'https://i.pinimg.com/736x/b5/b6/4f/b5b64f67657f3487f751bdb0e5991d0e--peter-griffin-family-guy.jpg',
//     'https://i.pinimg.com/736x/13/5e/db/135edbb7e1dab6e0719669a872aed16d.jpg'
//   ],
//   posts: [
    
//   ]
// }

interface HomeExtraProps {
  user: User | undefined,
}

const HomeExtra: FC<HomeExtraProps> = ({ user }) => {

  const dispatch = useAppDispatch();

  const img = user?.avatar ? (process.env.REACT_APP_BACK_URL + user.avatar) : 'https://pichold.ru/wp-content/uploads/2021/03/10976505-1.jpg';

  return (
    <div className="home-extra">
      <div className="avatar regular-panel">
        <img src={img} alt={process.env.REACT_APP_BACK_URL} />
        <button
          onClick={() => dispatch(setWindow({window: WindowTypes.LOAD_USER_AVATAR}))}
        >
          Edit
        </button>
      </div>
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

const Home: FC = () => {
  const { user } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  return (
    <>
      <Upbar />
      <main>
        <LeftMenu />
        <div className="home">
          <HomeExtra user={user} />
          <div className="home-main">
            <Info user={user} />
            <div className="images regular-panel">
              
            </div>
            <AddPostPanel windowType={WindowTypes.ADD_USER_POST} />
            <HomeFeed user={user} />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home;
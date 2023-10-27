import { FC } from "react"
import './styles.scss';
import { OneUser, User, UserApi } from "../../../entities/user";
import { useQuery } from "react-query";
import { getImageSrc } from "../../../shared/service/images";
import { AiOutlineCheckCircle, AiOutlineUserAdd } from "react-icons/ai";
import Rotator from "../../../shared/rotator";
import { useAppSelector } from "../../../app/store";
import { useNavigate } from "react-router-dom";

interface FriendCardProps {
  friend: OneUser,
}

const FriendCard: FC<FriendCardProps> = ({ friend }) => {

  const { user } = useAppSelector(state => state.user);

  const { data, isLoading, isError, refetch } = useQuery(
    ['addFriend', friend.id],
    () => {
      if (user) {
        return UserApi.addFriend(user.id, friend.id);
      }
    },
    {
      enabled: false,
    }
  );

  const navigate = useNavigate();

  return (
    <div className="possible-friend-card">
      <img src={getImageSrc(friend.avatar)} alt="IMG" />
      <div className="main-info">
        <h4 
          className="login"
          onClick={() => navigate('/user/' + friend.id)}
        >
          {friend.login}
        </h4>
      </div>
      {isLoading ? (
        <Rotator size={25} />
      ) : isError ? (
        <div>Error ebat'</div>
      ) : data ? (
        <AiOutlineCheckCircle size={25} />
      ) : (
        <button 
          className="add-button inherit-to-green"
          onClick={() => refetch()}
        >
          <AiOutlineUserAdd size={30} />
        </button>
      )}
    </div>
  )
}

interface PFPProps {
  user: User,
}
export const PossibleFriendsPanel: FC<PFPProps> = ({ user }) => {

  const { data, isLoading, isError } = useQuery(
    ['loadPossibleFriends'],
    () => {
      console.log('ЛОООЛ');
      console.log(user);
      if (user) {
        console.log('LAAAAAL');
        return UserApi.getPossibleFriends(user.id);
      }
    }
  )

  return (
    <div className="regular-panel possible-friends-panel">
      <h3>Possible friends</h3>
      <div className="pfc-list">
        {data?.length ? data?.map((friend, index) => (
          <FriendCard key={index} friend={friend} />
        )) : <div className="no-friends">
          There's no friends yet
        </div>}
      </div>
    </div>
  )
}
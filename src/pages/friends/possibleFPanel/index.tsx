import { FC } from "react"
import './styles.scss';
import { OneUser, User, UserApi } from "../../../entities/user";
import { useQuery } from "react-query";
import { getImageSrc } from "../../../shared/service/images";
import { AiOutlineCheckCircle, AiOutlineUserAdd } from "react-icons/ai";
import Rotator from "../../../shared/rotator";

interface FriendCardProps {
  friend: OneUser,
}

const FriendCard: FC<FriendCardProps> = ({ friend }) => {

  const { data, isLoading, isError, refetch } = useQuery(
    ['addFriend', friend.id],
    () => {
      return UserApi.addFriend(friend.id);
    },
    {
      enabled: false,
    }
  )

  return (
    <div className="possible-friend-card">
      <img src={getImageSrc(friend.avatar)} alt="IMG" />
      <div className="main-info">
        <h4 className="login">{friend.login}</h4>
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

export const PossibleFriendsPanel: FC = () => {

  const { data, isLoading, isError } = useQuery(
    ['loadFriends'],
    () => {
      return UserApi.getPossibleFriends();
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
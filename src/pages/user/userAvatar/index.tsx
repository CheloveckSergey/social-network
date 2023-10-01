import { FC } from "react";
import { OneUser, UserApi } from "../../../entities/user";
import { useAppDispatch } from "../../../app/store";
import { getImageSrc } from "../../../shared/service/images";
import './styles.scss';
import { useQuery } from "react-query";
import Rotator from "../../../shared/rotator";

/////////////////////////////////////////////////////////////////////////////////

interface CrFrButtProps {
  user: OneUser,
  setIsFriend: (isFriend: boolean) => void,
}

const CrFrButton: FC<CrFrButtProps> = ({ user, setIsFriend }) => {

  const dlFrStatus = useQuery(
    ['deleteFriendship', user.id],
    () => UserApi.deleteFriend(user.id),
    {
      enabled: false,
      onSuccess: () => {
        setIsFriend(false);
      }
    }
  )

  const crFrStatus = useQuery(
    ['createFriendship', [user.id]],
    () => {
      return UserApi.addFriend(user.id);
    },
    {
      enabled: false,
      onSuccess: () => {
        setIsFriend(true);
      }
    }
  )


  if (user.isFriend) {
    if (dlFrStatus.isLoading) {
      return (
        <div className="cr-dl-status">
          <Rotator size={25} />
        </div>
      )
    }

    return (
      <button 
        className="delete-friend white-back"
        onClick={() => dlFrStatus.refetch()}
      >
        Stop friendship
      </button>
    )
  } else {
    if (crFrStatus.isLoading) {
      return (
        <div className="cr-dl-status">
          <Rotator size={25} />
        </div>
      )
    }

    return (
      <button 
        className="get-friend"
        onClick={() => crFrStatus.refetch()}
      >
        Start friendship
      </button>
    )
  }
}

/////////////////////////////////////////////////////////////////////////////////

interface UserAvatarProps {
  user: OneUser,
  setIsFriend: (isFriend: boolean) => void,
}

export const UserAvatar: FC<UserAvatarProps> = ({ user, setIsFriend }) => {

  const img = getImageSrc(user?.avatar) || 'https://pichold.ru/wp-content/uploads/2021/03/10976505-1.jpg';

  return (
    <div className="user-avatar regular-panel">
      <img src={img} alt={process.env.REACT_APP_BACK_URL} />
      <CrFrButton 
        user={user}
        setIsFriend={setIsFriend}
      />
      {/* <button
        onClick={() => refetch()}
      >
        Edit
      </button> */}
    </div>
  )
}

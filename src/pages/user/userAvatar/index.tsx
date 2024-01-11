import { FC } from "react";
import { OneUser } from "../../../entities/user";
import { Helpers } from "../../../shared/helpers";
import { Friendship } from "../../../fetures/friendship";
import './styles.scss';
import { useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { RoomApi } from "../../../entities/room";
import { useNavigate } from "react-router-dom";
import { setWindow, setWriteMessageWindow } from "../../../widgets/modalWindow/model/redux";

interface WMBProps {
  user: OneUser,
}
const WriteMessageButton: FC<WMBProps> = ({ user }) => {

  const { user: curUser } = useAppSelector(state => state.user);

  const { data, isLoading, isError, refetch } = useQuery(
    ['loadRoom', user.id],
    () => {
      if (curUser) {
        return RoomApi.getPersonalRoom(user.id, curUser.id);
      }
    },
    {
      enabled: false,
    }
  );

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  return (
    <button
      className="green"
      onClick={() => {
        refetch()
          .then(room => {
            if (room.data) {
              navigate('/room/' + room.data.id);
            } else {
              dispatch(setWriteMessageWindow({user}));
            }
          })
      }}
      disabled={isError || isLoading}
    >
      Write Message
    </button>
  )
}
/////////////////////////////////////////////////////////////////////////////////

// interface CrFrButtProps {
//   user: OneUser,
//   setIsFriend: (isFriend: boolean) => void,
// }
// const CrFrButton: FC<CrFrButtProps> = ({ user, setIsFriend }) => {

//   const { headline, isError, isLoading, refetch } = Friendship.Hooks.useFriendship(
//     user, { setFriendship: setIsFriend },
//   );

//   return (
//     <button 
//       className={`green use-friendship ${isLoading || isError ? 'disabled' : ''}`}
//       disabled={isLoading || isError}
//       onClick={() => refetch()}
//     >
//       {headline}
//     </button>
//   )
// }

/////////////////////////////////////////////////////////////////////////////////

interface UserAvatarProps {
  user: OneUser,
  setIsFriend: (isFriend: boolean) => void,
}

export const UserAvatar: FC<UserAvatarProps> = ({ user, setIsFriend }) => {

  return (
    <div className="user-avatar regular-panel">
      <img src={Helpers.getImageSrc(user.avatar)} alt={process.env.REACT_APP_BACK_URL} />
      {/* <CrFrButton
        user={user}
        setIsFriend={setIsFriend}
      /> */}
      <WriteMessageButton 
        user={user}
      />
    </div>
  )
}

import { FC, useState, MouseEvent, ChangeEvent } from "react";
import './styles.scss';
import { useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { OneUser, UserApi, UserUi } from "../../../../entities/user";
import { SharedUi } from "../../../../shared/sharedUi";
import { Helpers } from "../../../../shared/helpers";
import { IoMdSend } from "react-icons/io";
import { RoomApi } from "../../../../entities/room";
import { useNavigate } from "react-router-dom";
import { closeWindow } from "../../model/redux";
import { FriendsLib } from "../../../../entities/friends";
import { RoomActionsLib } from "../../../../fetures/roomMembership";

interface ULCard {
  user: OneUser,
  addDeleteUser: (user: OneUser) => void,
}
export const UserListCard: FC<ULCard> = ({ user, addDeleteUser }) => {

  const [added, setAdded] = useState<boolean>(false);

  return (
    <div 
      className={`empty-user-list-card ${added ? 'added' : ''}`}
      onClick={() => {
        addDeleteUser(user);
        setAdded(!added);
      }}  
    >
      <img src={Helpers.getImageSrc(user.avatar)} alt="IMG" />
      <div className="main-info">
        <h4 
          className="login"
        >
          {user.login}
        </h4>
      </div>
      
    </div>
  )
}

export const CreateGRoomWindow: FC = ( ) => {

  const { user } = useAppSelector(state => state.user);

  const [addedUsers, setAddedUsers] = useState<OneUser[]>([]);

  const [avatar, setAvatar] = useState<File>();
  const [name, setName] = useState<string>('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    friends,
    isLoading: isFriendsLoading,
    isError: isFriendsError,
    error: frindsError,
  } = FriendsLib.useFriends(user!.id);

  const { mutateAsync } = RoomActionsLib.useCreateGRoom();

  function addDeleteUser(user: OneUser) {
    if (addedUsers.find(_user => _user.id === user.id)) {
      const newUsers = addedUsers.filter(_user => _user.id !== user.id);
      setAddedUsers(newUsers);
    }
    setAddedUsers([...addedUsers, user]);
  }

  function send(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    mutateAsync({
      adminId: user!.id, 
      userIds: addedUsers.map(user => user.id),
      name,
      roomAvatar: avatar,
    }).then((room) => {
      navigate('/room/' + room.id);
    })
  }

  return (
    <div className="create-general-room-window regular-panel">
      <div className="head section">
        Create General Room
      </div>
      <div className="users section">
        <SharedUi.Helpers.LoadErrorHandler 
          isError={isFriendsError}
          isLoading={isFriendsLoading}
        >
          {friends && friends.length ? (
            <div className="users-list">
              {friends.map((user, index) => <UserListCard 
                key={index}
                user={user}
                addDeleteUser={addDeleteUser}
              />)}
            </div>
          ) : (
            <div>
              Something went wrong
            </div>
          )}
        </SharedUi.Helpers.LoadErrorHandler>
      </div>
      <div className="bottom section">
        <SharedUi.Inputs.ImageLabel 
          setImage={setAvatar}
        >
          <img
            className="image-avatar"
            src={Helpers.getImageUrlFromFile(avatar)}
            alt="AVATAR" 
          /> 
        </SharedUi.Inputs.ImageLabel>
        <input 
          type="text" 
          className="room-name-input"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <button
          className="load-button white"
          onClick={send}
        >
          <IoMdSend size={35} />
        </button>
      </div>
    </div>
  )
}
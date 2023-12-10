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

  const [users, setUsers] = useState<OneUser[]>([]);
  const [addedUsers, setAddedUsers] = useState<OneUser[]>([]);

  const [avatar, setAvatar] = useState<File>();
  const [name, setName] = useState<string>('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const usersStatus = useQuery(
    ['loadFriends', user?.id],
    () => {
      if (user) {
        return UserApi.getAllFriends(user.id);
      }
    },
    {
      onSuccess: (data) => {
        if (data) {
          setUsers(data)
        }
      }
    }
  )

  const loadStatus = useQuery(
    ['createRoom', user?.id],
    () => {
      if (user) {
        return RoomApi.createGeneralRoom(getForm());
      }
    },
    {
      enabled: false,
      onSuccess: (data) => {
        if (data) {
          dispatch(closeWindow({}));
          navigate('/room/' + data.id);
        }
      }
    }
  )

  function addDeleteUser(user: OneUser) {
    if (addedUsers.find(_user => _user.id === user.id)) {
      const newUsers = addedUsers.filter(_user => _user.id !== user.id);
      setAddedUsers(newUsers);
    }
    setAddedUsers([...addedUsers, user]);
  }

  function getImageUrl(file: File | undefined) {
    if (file) {
      return URL.createObjectURL(file);
    } else {
      return process.env.REACT_APP_DEFAULT_IMAGE;
    }
  }

  function getForm() {
    const form = new FormData();
    form.append('adminId', String(user?.id));
    form.append('name', name);
    if (avatar) {
      form.append('img', avatar);
    }
    addedUsers.forEach(addedUser => form.append('userIds', String(addedUser.id)));
    return form;
  }

  function send(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    loadStatus.refetch();
  }

  return (
    <div className="create-general-room-window regular-panel">
      <div className="head section">
        Create General Room
      </div>
      <div className="users section">
        <SharedUi.Helpers.LoadErrorHandler 
          isError={usersStatus.isError}
          isLoading={usersStatus.isLoading}
        >
          {users && users.length ? (
            <div className="users-list">
              {users.map((user, index) => <UserListCard 
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
            src={getImageUrl(avatar)}
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
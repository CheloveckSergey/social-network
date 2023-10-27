import { FC, useState } from "react";
import { OneUser, UserApi } from "../../../entities/user";
import { useQuery } from "react-query";
import { BsThreeDots } from "react-icons/bs";
import Rotator from "../../../shared/rotator";
import { getImageSrc } from "../../../shared/service/images";
import { useAppSelector } from "../../../app/store";
import { useNavigate } from "react-router-dom";

interface EPProps {
  user: OneUser,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>,
}

const ExtraPanel: FC<EPProps> = ({ user, setLoading, setDeleted }) => {

  const { data, isLoading, isError, refetch } = useQuery(
    ['deleteFriend', user?.id],
    () => {
      if (user) {
        return UserApi.deleteFriend(user.id);
      }
    },
    {
      enabled: false,
      onSettled: () => {
        setLoading(false);
      },
      onSuccess: () => {
        setDeleted(true);
      }
    }
  )

  return (
    <div className="extra-user-panel extra-panel">
      <h4
        onClick={() => {
          setLoading(true);
          refetch();
        }}
      >
        Delete from friends
      </h4>
      <h4>Tralala</h4>
      <h4>Trololo</h4>
    </div>
  )
}

interface ESProps {
  user: OneUser,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>,
}

const ExtraSection: FC<ESProps> = ({ user, setLoading, setDeleted }) => {

  return (
    <div className="user-extra-section">
      <button className="white">
        <BsThreeDots size={25}/>
      </button>
      <ExtraPanel user={user} setLoading={setLoading} setDeleted={setDeleted} />
    </div>
  )
}

interface UserCardProps {
  user: OneUser,
}

const UserCard: FC<UserCardProps> = ({ user }) => {

  const userObject = useAppSelector(state => state.user);

  const [loading, setLoading] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);

  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useQuery(
    ['createFriendship', [user.id]],
    () => {
      if (userObject.user) {
        return UserApi.addFriend(userObject.user.id, user.id);
      }
    },
    {
      enabled: false,
      onSuccess: () => setDeleted(false),
      onSettled: () => setLoading(false),
    }
  )

  if (deleted) {
    return (
      <div className="user-friend-deleted">
        {loading && <div className="black-out">
          <Rotator size={40} />
        </div>}
        <button 
          className="inherit-to-green"
          onClick={() => {
            setLoading(true);
            refetch();
          }}
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <div className="user-friend-card">
      {loading && <div className="black-out">
        <Rotator size={40} />
      </div>} 
      <img src={getImageSrc(user.avatar)} alt="IMG" />
      <div className="main-info">
        <h4 
          onClick={() => navigate('/user/' + user.id)}
          className="login"
        >
          {user.login}
        </h4>
      </div>
      <ExtraSection user={user} setLoading={setLoading} setDeleted={setDeleted} />
    </div>
  )
}

export const FriendsBlock: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const { data, isLoading, isError } = useQuery(
    ['getFriends', user?.id],
    () => {
      if (user) {
        return UserApi.getAllFriends(user.id);
      }
    }
  )

  return (
    <div className="friend-list">
      {isLoading ? (
        <div className="just-cause">
          <Rotator size={25} />
        </div>
      ) : isError ? (
        <div className="just-cause">
          <div>Error ebat'</div>
        </div>
      ) : data && data.length > 0 ? (
        data.map((user, index) => <UserCard user={user} key={index} />)
      ) : (
        <div className="just-cause">
          <p>There's no friends</p>
        </div>
      )}
    </div>
  )
}
import { FC, useState } from "react";
import { Hook } from "../../../../../shared/types";
import { OneUser } from "../../../model";
import { useNavigate } from "react-router-dom";
import { Helpers } from "../../../../../shared/helpers";
import { SharedUi } from "../../../../../shared/sharedUi";
import './styles.scss';

interface Effects {
  setFriendship: (isFriend: boolean) => void,
  setSubscription: (isSubscribed: boolean) => void
}

interface ULCProps {
  user: OneUser,
  hooks: Hook<OneUser, Effects>[],
}
export const UserListCard: FC<ULCProps> = ({ user: _user, hooks }) => {
  const [user, setUser] = useState<OneUser>(_user);

  const setFriendship = (isFriend: boolean) => {
    setUser({
      ...user, 
      isFriend
    });
  }

  const setSubscription = (isSubscribed: boolean) => {
    setUser({
      ...user,
      author: {
        ...user.author,
        subscribed: isSubscribed,
      }
    })
  }

  const effects: Effects = {
    setFriendship, 
    setSubscription,
  }
  
  const navigate = useNavigate();

  return (
    <div className={`user-friend-card ${!user.isFriend ? 'shadowed' : ''}`}>
      <img src={Helpers.getImageSrc(user.avatar)} alt="IMG" />
      <div className="main-info">
        <h4 
          onClick={() => navigate('/user/' + user.id)}
          className="login"
        >
          {user.login}
        </h4>
      </div>
      <SharedUi.Buttons.ExtraSection<OneUser, Effects> 
        entity={user} 
        hooks={hooks} 
        effects={effects} 
      />
    </div>
  )
}
import { FC, useState } from "react";
import { OneUser } from "../../../model";
import { Helpers } from "../../../../../shared/helpers";
import { useNavigate } from "react-router-dom";
import './styles.scss'

interface AFBProps {
  user: OneUser,
  effects: {
    setFriendship: (isFriend: boolean) => void,
  }
}

interface FriendCardProps {
  friend: OneUser,
  AddFriendButton: FC<AFBProps>
}
export const PossibleFriendCard: FC<FriendCardProps> = ({ friend, AddFriendButton }) => {

  const [user, setUser] = useState<OneUser>(friend);

  const navigate = useNavigate();

  function setFriendship(isFriend: boolean): void {
    setUser({
      ...user,
      isFriend
    });
  }

  const effects = {
    setFriendship,
  }

  return (
    <div className="possible-friend-card">
      <img src={Helpers.getImageSrc(user.avatar)} alt="IMG" />
      <div className="main-info">
        <h4 
          className="login"
          onClick={() => navigate('/user/' + friend.id)}
        >
          {friend.login}
        </h4>
      </div>
      <AddFriendButton 
        user={user}
        effects={effects}
      />
    </div>
  )
}
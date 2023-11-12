import { FC } from "react";
import './styles.scss';
import { FriendsBlock } from "./friendsBlock";
import { InputBlock } from "./inputBlock";
import { MeUser } from "../../../entities/user";

interface AFProps {
  user: MeUser,
}
const AllFriends: FC<AFProps> = ({ user }) => {

  return (
    <div className="regular-panel all-friends">
      <h3>Friends</h3>
      <InputBlock user={user} />
      <FriendsBlock user={user} />
    </div>
  )
}

export default AllFriends;
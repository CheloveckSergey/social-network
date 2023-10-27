import { FC } from "react";
import { BsSearch } from "react-icons/bs";
import './styles.scss';
import { FriendsBlock } from "./friendsBlock";


const AllFriends: FC = () => {

  return (
    <div className="regular-panel all-friends">
      <h3>Friends</h3>
      <div className="input-block">
        <div className="input">
          <input type="text" />
        </div>
        <button className="light-back">
          <BsSearch size={20} />
        </button>
      </div>
      <FriendsBlock />
    </div>
  )
}

export default AllFriends;
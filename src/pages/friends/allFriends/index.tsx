import { FC, useState } from "react";
import { BsSearch, BsThreeDots } from "react-icons/bs";
import { OneUser, UserApi } from "../../../entities/user";
import { getImageSrc } from "../../../shared/service/images";
import { useAppSelector } from "../../../app/store";
import { useQuery } from "react-query";
import Rotator from "../../../shared/rotator";
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
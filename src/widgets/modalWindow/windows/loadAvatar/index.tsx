import { FC, FormEvent, useRef, useState } from "react";
import { useAppDispatch } from "../../../../app/store";
import { useQuery } from "react-query";
import { UserApi } from "../../../../entities/user/api";
import { closeWindow } from "../../model/redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import './styles.scss';
import AddWindowType from "../../types/addType";
import MyImgLabel from "../../../../shared/myImgLabel";
import { GroupApi } from "../../../../entities/group/api";

export const LoadUserAvatarWindow: FC = () => {
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);

  return (
    <AddWindowType
      queryName="loadGroupAvatar"
      inputs={[avatar]}
      apiFunction={UserApi.loadAvatar}
      enabledCondition={avatar ? true : false}
    >
      <MyImgLabel 
        image={avatar}
        setImage={setAvatar}
        name="img"
      />
    </AddWindowType>
  )
}

function getGroupNameFromUrl() {
  const tralala = window.location.href;
  const regexp = /\/groups\/\w+/;
  const lol = tralala.match(regexp);
  let groupName;
  if (lol) {
    groupName = lol[0].slice(8);
  }
  return groupName;
}

export const LoadGroupAvatarWindow: FC = () => {
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);

  const groupName = getGroupNameFromUrl();

  const [_groupName, setGroupName] = useState<string | undefined>(groupName);

  return (
    <AddWindowType
      queryName="loadGroupAvatar"
      inputs={[avatar]}
      apiFunction={GroupApi.loadAvatar}
      enabledCondition={avatar ? true : false}
    >
      <MyImgLabel 
        image={avatar}
        setImage={setAvatar}
        name="img"
      />
      <label style={{display: "none"}}>
        <input 
          type="text"
          name="groupName"
          value={_groupName}
        />
      </label>
    </AddWindowType>
  )
}
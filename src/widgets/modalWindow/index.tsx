import { FC } from "react";
import './styles.scss';
import { useAppSelector } from "../../app/store";
import { WindowTypes } from "./model/redux";
import { LoadGroupAvatarWindow, LoadUserAvatarWindow } from "./windows/loadAvatar";
import { AddGroupPostWindow, AddUserPostWindow } from "./windows/addPost";
import AddGroupWindow from "./windows/addGroup/indes";


const ModalWindow: FC = () => {
  const { windowType } = useAppSelector(state => state.modalWindow)

  return (
    <div className="blackout">
      {windowType === WindowTypes.LOAD_USER_AVATAR ? (
        <LoadUserAvatarWindow />
      ) : windowType === WindowTypes.ADD_USER_POST ? (
        <AddUserPostWindow />
      ) : windowType === WindowTypes.ADD_GROUP ? (
        <AddGroupWindow />
      ) : windowType === WindowTypes.ADD_GROUP_POST ? (
        <AddGroupPostWindow />
      ) : windowType === WindowTypes.LOAD_GROUP_AVATAR ? (
        <LoadGroupAvatarWindow />
      ) : ''}
    </div>
  )
}

export default ModalWindow;
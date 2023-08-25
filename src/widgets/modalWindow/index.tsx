import { FC } from "react";
import './styles.scss';
import { useAppSelector } from "../../app/store";
import { WindowTypes } from "./model/redux";
import LoadAvatarWindow from "./windows/loadAvatar";
import AddPostWindow from "./windows/addPost";
import AddGroupWindow from "./windows/addGroup/indes";


const ModalWindow: FC = () => {
  const { windowType } = useAppSelector(state => state.modalWindow)

  return (
    <div className="blackout">
      {windowType === WindowTypes.LOAD_AVATAR ? (
        <LoadAvatarWindow />
      ) : windowType === WindowTypes.ADD_POST ? (
        <AddPostWindow />
      ) : windowType === WindowTypes.ADD_GROUP ? (
        <AddGroupWindow />
      ) : ''}
    </div>
  )
}

export default ModalWindow;
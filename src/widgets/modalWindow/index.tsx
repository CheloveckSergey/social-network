import { FC } from "react";
import './styles.scss';
import { useAppDispatch, useAppSelector } from "../../app/store";
import { WindowTypes, closeWindow } from "./model/redux";
import { LoadGroupAvatarWindow, LoadUserAvatarWindow } from "./windows/loadAvatar";
import AddGroupWindow from "./windows/addGroup/indes";
import { AddUserImageWindow } from "./windows/addImage";
import { AddGroupImageWindow } from "./windows/addImage";
import ShowImages from "./windows/showImages";
import ImageWindow from "./windows/imageWindow";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ShowSubsWindow from "./windows/showSubs";
import { ChangeDescWindow } from "./windows/changeDesc";
import { AddPostWindow } from "./windows/addPost";


const ModalWindow: FC = () => {
  const { windowType } = useAppSelector(state => state.modalWindow)

  const dispatch = useAppDispatch();

  return (
    <div className="blackout">
      {windowType === WindowTypes.LOAD_USER_AVATAR ? (
        <LoadUserAvatarWindow />
      ) : windowType === WindowTypes.ADD_GROUP ? (
        <AddGroupWindow />
      ) : windowType === WindowTypes.ADD_POST ? (
        <AddPostWindow />
      ) : windowType === WindowTypes.LOAD_GROUP_AVATAR ? (
        <LoadGroupAvatarWindow />
      ) : windowType === WindowTypes.ADD_USER_IMAGE ? (
        <AddUserImageWindow />
      ) : windowType === WindowTypes.ADD_GROUP_IMAGE ? (
        <AddGroupImageWindow />
      ) : windowType === WindowTypes.SHOW_USER_IMAGES ? (
        <ShowImages />
      ) : windowType === WindowTypes.IMAGE_WINDOW ? (
        <ImageWindow />
      ) : windowType === WindowTypes.SHOW_SUBS_WINDOW ? (
        <ShowSubsWindow />
      ) : windowType === WindowTypes.CHANGE_DESC_WINDOW ? (
        <ChangeDescWindow />
      ) : ''}
      <button 
        className="close-button white"
        onClick={() => dispatch(closeWindow({}))}
      >
        <AiOutlineCloseCircle size={50} />
      </button>
    </div>
  )
}

export default ModalWindow;
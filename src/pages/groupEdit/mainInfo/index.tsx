import { ChangeEvent, FC, useState } from "react";
import { OneGroup } from "../../../entities/group";
import { Helpers } from "../../../shared/helpers";
import './styles.scss';
import { SharedUi } from "../../../shared/sharedUi";
import { GroupFeaturesLib } from "../../../fetures/group";
import { FaEdit } from "react-icons/fa";
import { ModalWindows, UseModalWindow } from "../../../widgets/anotherModalWindow/ui";

interface EBProps {
  onClick?: () => void,
  disabled?: boolean,
  body?: string,
}
const EditButton: FC<EBProps> = ({ onClick, disabled, body = 'Edit' }) => {

  return (
    <button
      className="edit white"
      onClick={onClick}
    >
      <FaEdit size={13} /> {body}
    </button>
  )
}

interface MIProps {
  group: OneGroup,
  setName: (name: string) => void,
  setAvatar: (avatar: string) => void,
}
export const MainInfo: FC<MIProps> = ({ group, setName, setAvatar }) => {

  const [editName, setEditName] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>(group.name);
  const [avatarWindow, setAvatarWindow] = useState<boolean>(false);

  const updateNameStatus = GroupFeaturesLib.useUpdateName(group.id, setName);
  const updateAvatarStatus = GroupFeaturesLib.useUpdateAvatar(group.id, setAvatar);

  return (
    <div
      className="regular-panel main-info"
    >
      <div className="avatar-section">
        <img 
          className="avatar"
          src={Helpers.getImageSrc(group.avatar)} 
          alt="IMG" 
        />
        <button
          className="change-avatar green"
          onClick={() => setAvatarWindow(true)}
        >
          Change
        </button>
        <UseModalWindow
          condition={avatarWindow}
          onClose={() => {
            setAvatarWindow(false)
          }}
        >
          <ModalWindows.ChangeAvatarWindow
            onClickIn={(imageFile: File) => {
              updateAvatarStatus.mutateAsync({imageFile})
              .then(() => setAvatarWindow(false));
            }}
            onClose={() => setAvatarWindow(false)}
          />
        </UseModalWindow>
      </div>
      <div className="main-section">
        {editName ? (
          <div
            className="edit-name-line"
          >
            <input 
              className="name"
              type="text" 
              value={nameInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNameInput(e.target.value)}
            />
            <SharedUi.Buttons.BynareWhiteButton
              className="save-button"
              isLoading={updateNameStatus.isLoading}
              isError={updateNameStatus.isError}
              body="Save"
              onClick={() => updateNameStatus.mutateAsync({name: nameInput})
              .then(() => setEditName(false))}
            />
            <button
              className="back-button gray-to-light-back"
              onClick={() => {
                setEditName(false);
                setNameInput(group.name);
              }}
            >
              Back
            </button>
          </div>
        ) : (
          <div
            className="name-line"
          >
            <h3 className="name">{group.name}</h3>
            <EditButton 
              onClick={() => {
                setEditName(true);
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
import { ChangeEvent, FC, useState } from "react";
import './styles.scss';
import { Helpers } from "../../../../shared/helpers";
import { useAppSelector } from "../../../../app/store";
import { MusicFeaturesLib } from "../../../../fetures/music";
import { WindowTypes } from "../../types";

interface CAWProps {
  onClose: () => void,
  onClickIn: (imageFile: File) => void,
}
export const ChangeAvatarWindow: FC<CAWProps> = ({ onClose, onClickIn }) => {

  const { user } = useAppSelector(state => state.user);

  const [image, setImage] = useState<File>();

  return (
    <WindowTypes.AddImageWindowType
      header="Change avatar"
      addImage={onClickIn}
    />
  )
}
import { FC } from "react";
import './styles.scss';
import { WindowTypes } from "../../types";

interface CAWProps {
  createImageObject: {
    submit: (imageFile: File) => Promise<any>;
    isLoading: boolean;
    isError: boolean;
  },
  close: () => void,
}
export const ChangeAvatarWindow: FC<CAWProps> = ({ createImageObject, close }) => {

  return (
    <WindowTypes.AddImageWindowType
      header="Change avatar"
      createImageObject={createImageObject}
      close={close}
    />
  )
}
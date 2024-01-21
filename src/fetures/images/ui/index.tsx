import { FC } from "react";
import './styles.scss';
import { ImagesActionsLib } from "../lib";
import { useAppSelector } from "../../../app/store";

interface CAIBProps {
  file: File | undefined,
}
const CreateAlbumImageButton: FC<CAIBProps> = ({ file }) => {
  const { user } = useAppSelector(state => state.user);

  const {
    mutate,
    isLoading,
    isError,
  } = ImagesActionsLib.useCreateALbumImage(user!.author.id);

  return (
    <button 
      className="create-album-image-button white-back"
      disabled={!file}
      onClick={() => {
        if (!file) {
          return;
        }
        mutate({file}, {
          onSuccess: () => {
            window.location.reload();
          }
        });
      }}
    >
      Сохранить
    </button>
  )
}

export const ImagesActions = {
  CreateAlbumImageButton,
}
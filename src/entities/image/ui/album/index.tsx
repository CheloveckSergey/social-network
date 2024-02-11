import { FC } from "react";
import { OneAlbum } from "../../model";
import './styles.scss';
import { ImageUi } from "..";

interface AProps {
  album: OneAlbum,
  setIsLiked: (imageId: number, isLiked: boolean) => void,
}
export const Album: FC<AProps> = ({ album, setIsLiked }) => {

  return (
    <div className="album">
      <h3>{album.name}</h3>
      <ImageUi.ImagesList
        images={album.images}
        isLoading={false}
        isError={false}
        setIsLiked={setIsLiked}
      />
    </div>
  )
}
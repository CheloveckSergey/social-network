import { FC } from "react";
import { OneAlbum, OneAlbumImage } from "../../model";
import './styles.scss';
import { ImageUi } from "..";

interface AProps {
  album: OneAlbum,
  setIsLiked: (imageId: number, isLiked: boolean) => void,
  addImage: (image: OneAlbumImage) => void,
}
export const Album: FC<AProps> = ({ album, setIsLiked, addImage }) => {

  return (
    <div className="album">
      <h3>{album.name}</h3>
      <ImageUi.ImagesList
        images={album.images}
        isLoading={false}
        isError={false}
        albumId={album.id}
        setIsLiked={setIsLiked}
        addImage={addImage}
      />
    </div>
  )
}
import { FC, useState } from "react";
import { OneAlbum, OneAlbumImage, OneImage } from "../../model";
import './styles.scss';
import { ImageUi } from "..";

interface AProps {
  album: OneAlbum,
  setIsLiked: (imageId: number, isLiked: boolean) => void,
  addImage: (image: OneAlbumImage) => void,
  renderImage: (image: OneImage, index: number) => React.ReactNode | React.ReactNode[],
}
export const Album: FC<AProps> = ({ album, setIsLiked, addImage, renderImage }) => {

  const [curImageIndex, setCurImageIndex] = useState<number>(0);

  return (
    <div className="album">
      <h3>{album.name}</h3>
      <ImageUi.ImagesList
        images={album.images}
        isLoading={false}
        isError={false}
        albumId={album.id}
        renderImage={renderImage}
        addImage={addImage}
      />
    </div>
  )
}
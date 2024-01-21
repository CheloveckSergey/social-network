import { FC } from "react";
import { User } from "../../../entities/user";
import { useQuery } from "react-query";
import { ImageApi, ImageUi, ImagesLib } from "../../../entities/image";
import ImagesFeed from "../../../widgets/imagesFeed";
import { useAppSelector } from "../../../app/store";

interface HomeImagesProps {
  user: User,
}

const HomeImages: FC<HomeImagesProps> = ({ user }) => {

  const {
    images: _images,
    isLoading,
    isError
  } = ImagesLib.useAlbumImages(user.author.id);

  const images = _images?.slice(0, 3);

  return (
    <ImageUi.ImageBar
      // userId={user.id}
      // allowToAdd={true}
      images={images} 
      isError={isError}
      isLoading={isLoading}
    />
  )
}

export default HomeImages;
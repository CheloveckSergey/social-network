import { FC } from "react";
import { User } from "../../../entities/user";
import { useQuery } from "react-query";
import { ImageApi } from "../../../entities/image";
import ImagesFeed from "../../../widgets/imagesFeed";
import { useAppSelector } from "../../../app/store";

interface HomeImagesProps {
  user: User,
}

const HomeImages: FC<HomeImagesProps> = ({ user }) => {

  const { data, isLoading, isError } = useQuery(
    ['getUserImages', user.id],
    () => {
      return ImageApi.getAllImagesByUserId(user.id)
    }
  )

  const images = data?.slice(0, 3);

  return (
    <ImagesFeed
      userId={user.id}
      allowToAdd={true}
      images={images} 
      isError={isError}
      isLoading={isLoading}
    />
  )
}

export default HomeImages;
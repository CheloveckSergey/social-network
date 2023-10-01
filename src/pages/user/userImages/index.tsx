import { FC } from "react";
import { OneUser, User } from "../../../entities/user";
import { useQuery } from "react-query";
import { ImageApi } from "../../../entities/image";
import ImagesFeed from "../../../widgets/imagesFeed";

interface UserImagesProps {
  user: OneUser,
}

export const UserImages: FC<UserImagesProps> = ({ user }) => {
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
      allowToAdd={false}
      images={images} 
      isError={isError}
      isLoading={isLoading}
    />
  )
}
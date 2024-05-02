import { FC } from "react";
import { User } from "../../../entities/user";
import { ImagesPreview } from "../../../widgets/imagesPreview";
import { useNavigate } from "react-router-dom";

interface HomeImagesProps {
  user: User,
}

const HomeImages: FC<HomeImagesProps> = ({ user }) => {

  const navigate = useNavigate();

  return (
    <ImagesPreview 
      authorId={user.author.id}
      onNavigateClick={() => navigate('/userAlbum/' + user.id)}
      canEdit={true}
    />
  )
}

export default HomeImages;
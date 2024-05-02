import { FC } from "react";
import { ImagesPreview } from "../../../widgets/imagesPreview";
import { GMTypes, Group, OneGroupWithMembership } from "../../../entities/group";
import { useNavigate } from "react-router-dom";

interface GIProps {
  group: OneGroupWithMembership,
}
export const GroupImages: FC<GIProps> = ({ group }) => {

  const canEdit: boolean = (group.membership === GMTypes.ADMIN || group.membership === GMTypes.MODERATOR) 
  ? true : false;

  const navigate = useNavigate();

  return (
    <ImagesPreview
      authorId={group.authorId}
      onNavigateClick={() => navigate('/groupImages/' + group.id)}
      canEdit={canEdit}
    />
  )
}
import { FC } from "react";
import { ImagesPreview } from "../../../widgets/imagesPreview";
import { GMTypes, Group, OneGroupWithMembership } from "../../../entities/group";
import { useNavigate } from "react-router-dom";

interface GIProps {
  group: OneGroupWithMembership | undefined,
  isLoading: boolean,
  isError: boolean,
}
export const GroupImages: FC<GIProps> = ({ group, isLoading, isError }) => {

  const accepted: boolean = group?.membership ? true : false;

  const canEdit: boolean = (group?.membership === GMTypes.ADMIN || group?.membership === GMTypes.MODERATOR) 
  ? true : false;

  const navigate = useNavigate();

  return (
    <ImagesPreview
      accepted={accepted}
      rejectionReason="Только для членов, так сказать"
      isLoading={isLoading && !group}
      isError={isError}
      authorId={group?.authorId}
      onNavigateClick={() => navigate('/groupImages/' + group?.id)}
      canEdit={canEdit}
    />
  )
}
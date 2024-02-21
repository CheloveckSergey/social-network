import { FC } from "react";
import { SharedUi } from "../../../shared/sharedUi";
import { PostsFeaturesLib } from "../lib";
import { BiRepost } from "react-icons/bi";

interface RBProps {
  postId: number,
  authorId: number,
}
const RepostButton: FC<RBProps> = ({ postId, authorId }) => {

  const {
    mutateAsync,
    isLoading,
    isError,
  } = PostsFeaturesLib.useMakeRepost();

  return (
    <SharedUi.Buttons.CreationActionButton 
      Icon={BiRepost}
      iconSize={25}
      activeColor="blue"
      isActive={false}
      generalNumber={0}
      onClick={() => mutateAsync({repostId: postId, authorId})}
      isLoading={isLoading}
      isError={isError}
    />
  )
}

export const PostsFeaturesUi = {
  RepostButton,
}
import { FC } from "react";
import { SharedUi } from "../../../shared/sharedUi";
import { PostsFeaturesLib } from "../lib";
import { BiRepost } from "react-icons/bi";

interface RBProps {
  postId: number,
  repostsNumber: number,
  authorId: number,
  activeCondition: boolean,
}
const RepostButton: FC<RBProps> = ({ postId, repostsNumber, authorId, activeCondition }) => {

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
      isActive={activeCondition}
      generalNumber={repostsNumber}
      onClick={() => mutateAsync({repostId: postId, authorId})}
      isLoading={isLoading}
      isError={isError}
    />
  )
}

export const PostsFeaturesUi = {
  RepostButton,
}
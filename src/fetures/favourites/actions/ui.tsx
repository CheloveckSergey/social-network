import { FC, useState } from "react";
import { AiOutlineHeart } from 'react-icons/ai';
import "./styles.scss";
import { useAppSelector } from "../../../app/store";
import { Like, LikesApi } from "../../../entities/like";
import { Creation, OneCreation } from "../../../entities/creation";
import { SharedUi } from "../../../shared/sharedUi";
import { Hooks } from "../hooks";

const useToggleLike = (creation: Creation) => {
  const { user } = useAppSelector(state => state.user);

  let _isLiked = false;
  if (creation.likes.find(like => like.userId === user?.id)) {
    _isLiked = true;
  }
  const [isLiked, setIsLiked] = useState<boolean>(_isLiked);
  const [likesNumber, setLikesNumber] = useState<number>(creation.likes.length);
  const toggleLike = () => {
    if (!user) {
      return;
    }
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikesNumber(likesNumber - 1);
      LikesApi.deleteLike(user.id, creation.id);
    } else {
      setLikesNumber(likesNumber + 1);
      LikesApi.createLike(user.id, creation.id);
    }
  }
  return { isLiked, likesNumber, toggleLike };
}


interface LikeButtonProps {
  creation: OneCreation,
  effects: {
    setIsLiked: (isLiked: boolean) => void,
  }
}
export const LikeButton: FC<LikeButtonProps> = ({ creation, effects }) => {

  const { isLoading, isError, refetch } = Hooks.useLike(creation, {
    setIsLiked: effects.setIsLiked,
  })

  return (
    <SharedUi.Buttons.CreationActionButton 
      Icon={AiOutlineHeart}
      activeColor="red"
      isActive={creation.isLiked}
      generalNumber={creation.likeNumber}
      onClick={() => refetch()}
      isLoading={isLoading}
      isError={isError}
    />
  )
}
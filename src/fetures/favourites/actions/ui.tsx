import { FC, useState } from "react";
import { AiOutlineHeart } from 'react-icons/ai';
import "./styles.scss";
import { OneCreation } from "../../../entities/creation";
import { SharedUi } from "../../../shared/sharedUi";
import { Hooks } from "../hooks";

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

export const SmallLikeButton: FC<LikeButtonProps> = ({ creation, effects }) => {

  const { isLoading, isError, refetch } = Hooks.useLike(creation, {
    setIsLiked: effects.setIsLiked,
  })

  return (
    <SharedUi.Buttons.CreationActionButton 
      Icon={AiOutlineHeart}
      iconSize={15}
      activeColor="red"
      isActive={creation.isLiked}
      generalNumber={creation.likeNumber}
      onClick={() => refetch()}
      isLoading={isLoading}
      isError={isError}
    />
  )
}
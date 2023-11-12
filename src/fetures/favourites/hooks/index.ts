import { useQuery } from "react-query";
import { Creation, OneCreation } from "../../../entities/creation";
import { Hook } from "../../../shared/types";
import { useAppSelector } from "../../../app/store";
import { LikesApi } from "../../../entities/like";
import { useState } from "react";

interface Effects {
  setIsLiked: (isLiked: boolean) => void,
}
const useLike: Hook<OneCreation, Effects> = (entity: OneCreation, effects: Effects) => {

  const { user } = useAppSelector(state => state.user);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const createStatus = useQuery(
    ['createLike', entity.id],
    () => {
      if (user) {
        return LikesApi.createLike(user.id, entity.id);
      }
    },
    {
      onSuccess: () => {
        setIsSuccess(true);
        effects.setIsLiked(true);
      },
      onError: () => {
        setIsSuccess(false);
      },
      enabled: false,
    }
  )

  const deleteStatus = useQuery(
    ['delete', entity.id],
    () => {
      if (user) {
        return LikesApi.deleteLike(user.id, entity.id);
      }
    },
    {
      enabled: false,
      onSuccess: () => {
        setIsSuccess(true);
        effects.setIsLiked(false);
      },
      onError: () => {
        setIsSuccess(false);
      },
    }
  )

  if (entity.isLiked) {
    return {
      headline: 'Удалить лайк',
      isLoading: deleteStatus.isLoading,
      isError: deleteStatus.isError,
      refetch: deleteStatus.refetch,
      isSuccess,
    }
  } else {
    return {
      headline: 'Лайкнуть',
      isLoading: createStatus.isLoading,
      isError: createStatus.isError,
      refetch: createStatus.refetch,
      isSuccess,
    }
  }
}

export const Hooks = {
  useLike,
}
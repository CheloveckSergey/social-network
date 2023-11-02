import { useQuery } from "react-query";
import { useAppSelector } from "../../../app/store";
import { OneUser, UserApi } from "../../../entities/user";
import { useState } from "react";

export function useDeleteFriendship(user: OneUser) : {
  refetch: () => any,
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
} {
  const { user: curUser } = useAppSelector(state => state.user);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { data, isLoading, isError, refetch } = useQuery(
    ['deleteFriend', user.id],
    () => {
      if (user) {
        return UserApi.deleteFriend(user.id);
      }
    },
    {
      enabled: false,
      onSuccess: () => {
        setIsSuccess(true);
      }
    }
  );

  return { refetch, isLoading, isError, isSuccess }
}

export function useCreateFriendship(user: OneUser) : {
  refetch: () => any,
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
} {
  const { user: curUser } = useAppSelector(state => state.user);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { data, isLoading, isError, refetch } = useQuery(
    ['deleteFriend', user.id],
    () => {
      if (curUser) {
        return UserApi.addFriend(curUser.id, user.id);
      }
    },
    {
      enabled: false,
      onSuccess: () => {
        setIsSuccess(true);
      }
    }
  );

  return { refetch, isLoading, isError, isSuccess }
}
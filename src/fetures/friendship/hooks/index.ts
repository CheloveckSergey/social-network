import { useQuery } from "react-query";
import { useAppSelector } from "../../../app/store";
import { Hook, OneUser, UserApi } from "../../../entities/user";
import { useState } from "react";

export interface FriendshipEffects {
  setFriendship: (isFriend: boolean) => void,
}

export const useFriendship: Hook<FriendshipEffects> = (user: OneUser, effects: FriendshipEffects) => {
  const { user: curUser } = useAppSelector(state => state.user);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const deleteStatus = useQuery(
    ['deleteFriend', user.id],
    () => {
      if (curUser) {
        return UserApi.deleteFriend(user.id);
      }
    },
    {
      enabled: false,
      onSuccess: () => {
        setIsSuccess(true);
        effects.setFriendship(false);
      }
    }
  );

  const addStatus = useQuery(
    ['addFriend', user.id],
    () => {
      if (curUser) {
        return UserApi.addFriend(curUser.id, user.id);
      }
    },
    {
      enabled: false,
      onSuccess: () => {
        setIsSuccess(true);
        effects.setFriendship(true);
      }
    }
  );

  if (user.isFriend) {
    return {
      refetch: deleteStatus.refetch,
      isLoading: deleteStatus.isLoading,
      isError: deleteStatus.isError,
      isSuccess,
      headline: 'Delete',
    }
  } else {
    return {
      refetch: addStatus.refetch,
      isLoading: addStatus.isLoading,
      isError: addStatus.isError,
      isSuccess,
      headline: 'Add',
    }
  }
}

// export const useCreateFriendship: Hook = (user: OneUser) => {
//   const { user: curUser } = useAppSelector(state => state.user);

//   const [isSuccess, setIsSuccess] = useState<boolean>(false);

//   const { data, isLoading, isError, refetch } = useQuery(
//     ['deleteFriend', user.id],
//     () => {
//       if (curUser) {
//         return UserApi.addFriend(curUser.id, user.id);
//       }
//     },
//     {
//       enabled: false,
//       onSuccess: () => {
//         setIsSuccess(true);
//       }
//     }
//   );

//   return { refetch, isLoading, isError, isSuccess, headline: 'Get friend' }
// }

// export const useFriendshipHook: Hook = (user: OneUser) => {
//   if (user.isFriend) {
//     return useDeleteFriendship(user);
//   } else {
//     return useCreateFriendship(user);
//   }
// }
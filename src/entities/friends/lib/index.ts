import { useQuery } from "react-query";
import { useAppSelector } from "../../../app/store";
import { FriendsApi } from "../api";
import { useState } from "react";
import { OneUser } from "../../user";

const friendsKeys = {
  friends: {
    root: 'friends',
    slug: (userId: number) => [friendsKeys.friends.root, userId],
  },
}

const useFriends = (userId: number) => {

  const [friends, setFriends] = useState<OneUser[]>([]);

  const friendsStatus = useQuery({
    queryKey: friendsKeys.friends.slug(userId),
    queryFn: () => {
      return FriendsApi.getAllFriends(userId);
    },
    onSuccess: (data) => {
      setFriends(data);
    }
  })

  return {
    friends,
    isLoading: friendsStatus.isLoading,
    isError: friendsStatus.isError,
    error: friendsStatus.error,
  }
}

export const FriendsLib = {
  useFriends,
}
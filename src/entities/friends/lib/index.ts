import { useQuery } from "react-query";
import { useAppSelector } from "../../../app/store";
import { FriendsApi } from "../api";
import { useState } from "react";
import { MeUser, OneUser, User } from "../../user";
import { FriendRequest } from "../model";

const friendsKeys = {
  friends: {
    root: 'friends',
    slug: (userId: number) => [friendsKeys.friends.root, userId],
  },
  possibleFriends: {
    root: 'possibleFriends',
    slug: (userId: number) => [friendsKeys.possibleFriends.root, userId],
  },
  incomeRequests: {
    root: 'incomeRequests',
    slug: (userId: number) => [friendsKeys.incomeRequests.root, userId],
  },
  outcomeRequests: {
    root: 'outcomeRequests',
    slug: (userId: number) => [friendsKeys.outcomeRequests.root, userId],
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

const usePossibleFriends = (user: User) => {

  const [possibleFriends, setPossibleFriends] = useState<OneUser[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: friendsKeys.friends.slug(user.id),
    queryFn: () => {
        return FriendsApi.getPossibleFriends(user.id);
    },
    onSuccess: (data) => {
      setPossibleFriends(data);
    }
  });

  return {
    possibleFriends,
    isLoading,
    isError,
  }
}

const useIncomeRequests = (user: User) => {

  const [incomeRequests, setIncomeRequests] = useState<FriendRequest[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: [friendsKeys.incomeRequests.slug(user.id)],
    queryFn: () => {
      return FriendsApi.getAllActiveIncomeRequestsByUser(user.id);
    },
    onSuccess: (data) => {
      setIncomeRequests(data);
    }
  });

  return {
    incomeRequests,
    isLoading,
    isError,
  }
}

const useOutcomeRequests = (user: User) => {

  const [outcomeRequests, setOutcomeRequests] = useState<FriendRequest[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: [friendsKeys.outcomeRequests.slug(user.id)],
    queryFn: () => {
      return FriendsApi.getAllActiveOutcomeRequestsByUser(user.id);
    },
    onSuccess: (data) => {
      setOutcomeRequests(data);
    }
  });

  return {
    outcomeRequests,
    isLoading,
    isError,
  }
}

export const FriendsLib = {
  useFriends,
  usePossibleFriends,
  useIncomeRequests,
  useOutcomeRequests,
}
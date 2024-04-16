import { useState } from "react";
import { useAppSelector } from "../../../app/store";
import { OneUser } from "../../../entities/user";
import { useMutation, useQuery } from "react-query";
import { AuthorApi, OneAuthor } from "../../../entities/author";
import { Hook } from "../../../shared/types";

export interface SubscriptionEffects {
  setSubscription: (isSubscribed: boolean) => void,
}

export const useSubscription: Hook<OneUser, SubscriptionEffects> = (user: OneUser, effects: SubscriptionEffects) => {
  const { user: curUser } = useAppSelector(state => state.user);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const unsubscribeStatus = useQuery(
    ['unsubscribe', user.id],
    () => {
      if (curUser) {
        return AuthorApi.unsubscribe(curUser.id, user.author.id);
      }
    },
    {
      enabled: false,
      onSuccess: () => {
        setIsSuccess(true);
        effects.setSubscription(false);
      }
    }
  );

  const subscribeStatus = useQuery(
    ['subscribe', user.id],
    () => {
      if (curUser) {
        return AuthorApi.subscribe(curUser.id, user.author.id);
      }
    },
    {
      enabled: false,
      onSuccess: () => {
        setIsSuccess(true);
        effects.setSubscription(true);
      }
    }
  );

  if (user.author.subscribed) {
    return {
      refetch: unsubscribeStatus.refetch,
      isLoading: unsubscribeStatus.isLoading,
      isError: unsubscribeStatus.isError,
      isSuccess,
      headline: 'Unsubscribe',
    }
  } else {
    return {
      refetch: subscribeStatus.refetch,
      isLoading: subscribeStatus.isLoading,
      isError: subscribeStatus.isError,
      isSuccess,
      headline: 'Subscribe',
    }
  }
}

const useSubscribe = (userId: number, authorId: number, setSubscribed?: (subscribed: boolean) => void) => {

  const status = useMutation(
    () => {
      return AuthorApi.subscribe(userId, authorId);
    },
    {
      onSuccess: () => {
        if (setSubscribed) {
          setSubscribed(true);
        }
      }
    },
  );

  return status;
}

const useUnubscribe = (userId: number, authorId: number, setSubscribed?: (subscribed: boolean) => void) => {

  const status = useMutation(
    () => {
      return AuthorApi.unsubscribe(userId, authorId);
    },
    {
      onSuccess: () => {
        if (setSubscribed) {
          setSubscribed(false);
        }
      }
    },
  );

  return status;
}

export const SubscriptionFeaturesLib = {
  useSubscribe,
  useUnubscribe,
}
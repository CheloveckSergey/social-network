import { useState } from "react";
import { useAppSelector } from "../../../app/store";
import { Hook, OneUser, UserApi } from "../../../entities/user";
import { useQuery } from "react-query";
import { AuthorApi } from "../../../entities/author";

export interface SubscriptionEffects {
  setSubscription: (isSubscribed: boolean) => void,
}

export const useSubscription: Hook<SubscriptionEffects> = (user: OneUser, effects: SubscriptionEffects) => {
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
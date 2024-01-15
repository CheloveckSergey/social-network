import { useState } from "react";
import { useQuery } from "react-query";
import { FriendsApi } from "../../../entities/friends";

const friendshipKeys = {
  createRequest: {
    root: 'createRequest',
    slug: (userId: number) => [friendshipKeys.createRequest.root, userId],
  },
  acceptRequest: {
    root: 'acceptRequest',
    slug: (requestId: number) => [friendshipKeys.acceptRequest.root, requestId],
  },
  rejectRequest: {
    root: 'rejectRequest',
    slug: (requestId: number) => [friendshipKeys.rejectRequest.root, requestId],
  },
  cancelRequest: {
    root: 'cancelRequest',
    slug: (requestId: number) => [friendshipKeys.cancelRequest.root, requestId],
  }
}

const useCreateRequest = (userId1: number, userId2: number) => {

  const [requestCreated, setRequestCreated] = useState<boolean>(false)

  const createRequestStatus = useQuery({
    queryKey: friendshipKeys.createRequest.slug(userId2),
    queryFn: () => {
      return FriendsApi.createRequest(userId1, userId2);
    },
    onSuccess: () => {
      setRequestCreated(true);
    },
    enabled: false,
  });

  return {
    refetch: createRequestStatus.refetch,
    isLoading: createRequestStatus.isLoading,
    isError: createRequestStatus.isError,
    requestCreated,
  }
}

const useAcceptRequest = (requestId: number) => {

  const [success, setSuccess] = useState<boolean>(false);

  const { isLoading, isError, refetch } = useQuery({
    queryKey: friendshipKeys.acceptRequest.slug(requestId),
    queryFn: () => {
      return FriendsApi.acceptRequest(requestId);
    },
    enabled: false,
    onSuccess: () => {
      setSuccess(true);
    }
  })

  return {
    success,
    refetch,
    isLoading,
    isError,
  }
}

const useRejectRequest = (requestId: number) => {

  const [success, setSuccess] = useState<boolean>(false);

  const { isLoading, isError, refetch } = useQuery({
    queryKey: friendshipKeys.rejectRequest.slug(requestId),
    queryFn: () => {
      return FriendsApi.rejectRequest(requestId);
    },
    enabled: false,
    onSuccess: () => {
      setSuccess(true);
    }
  })

  return {
    success,
    refetch,
    isLoading,
    isError,
  }
}

const useCancelRequest = (requestId: number) => {

  const [success, setSuccess] = useState<boolean>(false);

  const { isLoading, isError, refetch } = useQuery({
    queryKey: friendshipKeys.cancelRequest.slug(requestId),
    queryFn: () => {
      return FriendsApi.deleteRequest(requestId);
    },
    enabled: false,
    onSuccess: () => {
      setSuccess(true);
    }
  })

  return {
    success,
    refetch,
    isLoading,
    isError,
  }
}

export const ActionsLib = {
  useCreateRequest,
  useAcceptRequest,
  useRejectRequest,
  useCancelRequest,
}
import { useQuery } from "react-query"
import { GroupApi, GroupMembersApi, MembershipRequestsApi } from "../api"
import { GroupMember, GroupMembershipStatuses, MembershipRequest, OneGroup, OneGroupWithMembership } from "../model"
import { useState } from "react"

const groupsKeys = {
  allGroups: {
    root: ['allGroups'],
  },
  group: {
    root: 'group',
    slug: (slug: number) => [groupsKeys.group.root, slug],
  },
  waitinRequests: {
    root: 'waitingRequests',
    slug: (slug: number) => [groupsKeys.waitinRequests.root, slug],
  },
  rejectedRequests: {
    root: 'rejectedRequests',
    slug: (slug: number) => [groupsKeys.rejectedRequests.root, slug],
  },
  members: {
    root: 'members',
    slug: (slug: number) => [groupsKeys.members.root, slug],
  },
}

const useAllGroups = () => {

  const [groups, setGroups] = useState<OneGroup[]>([])

  const status = useQuery({
    queryKey: groupsKeys.allGroups.root,
    queryFn: () => {
      return GroupApi.getAllGroups()
    },
    onSuccess: (data) => {
      setGroups(data);
    }
  });

  return {
    groups,
    isLoading: status.isLoading,
    isError: status.isError,
  }
}

const useGroup = (groupId: number) => {

  const [group, setGroup] = useState<OneGroupWithMembership>();

  const status = useQuery({
    queryKey: groupsKeys.group.slug(groupId),
    queryFn: () => {
      return GroupApi.getOneGroupWithMembershipById(groupId)
    },
    onSuccess: (data) => {
      setGroup(data);
    }
  });

  function setSubscribed(subscribed: boolean) {
    if (!group) {
      return;
    }
    const newGroup: OneGroupWithMembership = {
      ...group,
      author: {
        ...group.author,
        subscribed: subscribed,
        subsNumber: subscribed ? group.author.subsNumber + 1 : group.author.subsNumber - 1,
      }
    }
    setGroup(newGroup);
  }

  function setName(name: string) {
    if (!group) {
      return;
    }
    console.log(name);
    setGroup({
      ...group,
      name,
    })
  }

  function setAvatar(avatar: string) {
    if (!group) {
      return;
    }
    setGroup({
      ...group,
      avatar,
      author: {
        ...group.author,
        avatar,
      }
    })
  }

  function createRequest(request: MembershipRequest) {
    if (!group) {
      return;
    }
    setGroup({
      ...group,
      request,
    });
  }

  function deleteRequest() {
    if (!group) {
      return;
    } 
    setGroup({
      ...group,
      request: undefined,
    })
  }

  return {
    group,
    isLoading: status.isLoading,
    isError: status.isError,
    setSubscribed,
    setName,
    setAvatar,
    createRequest,
    deleteRequest,
  }
}

const useWaitingRequests = (groupId: number) => {
  const [requests, setRequests] = useState<MembershipRequest[]>([]);

  const status = useQuery({
    queryKey: groupsKeys.waitinRequests.slug(groupId),
    queryFn: () => {
      return MembershipRequestsApi.getAllWaitingRequests(groupId);
    },
    onSuccess: (data) => {
      setRequests(data);
    }
  });

  function acceptRequest(requestId: number) {
    const newRequests: MembershipRequest[] = requests.map(request => {
      if (request.id === requestId) {
        const newRequest: MembershipRequest = {
          ...request, 
          status: GroupMembershipStatuses.ACCEPTED,
        }
        return newRequest;
      } else {
        return request;
      }
    });
    setRequests(newRequests);
  }

  function cancelAcceptRequest(requestId: number) {
    const newRequests: MembershipRequest[] = requests.map(request => {
      if (request.id === requestId) {
        const newRequest: MembershipRequest = {
          ...request, 
          status: GroupMembershipStatuses.WAITING,
        }
        return newRequest;
      } else {
        return request;
      }
    });
    setRequests(newRequests);
  }

  return {
    requests,
    isLoading: status.isLoading,
    isError: status.isError,
    acceptRequest,
    cancelAcceptRequest,
  }
}

const useRejectedRequests = (groupId: number) => {
  const [requests, setRequests] = useState<MembershipRequest[]>([]);

  const status = useQuery({
    queryKey: groupsKeys.rejectedRequests.slug(groupId),
    queryFn: () => {
      return MembershipRequestsApi.getAllRejectedRequests(groupId);
    },
    onSuccess: (data) => {
      setRequests(data);
    }
  });

  return {
    requests,
    isLoading: status.isLoading,
    isError: status.isError,
  }
}

const useMembers = (groupId: number) => {
  const [members, setMembers] = useState<GroupMember[]>([]);

  const status = useQuery({
    queryKey: groupsKeys.members.slug(groupId),
    queryFn: () => {
      return GroupMembersApi.getAllMembers(groupId);
    },
    onSuccess: (data) => {
      setMembers(data);
    }
  });

  return {
    members,
    isLoading: status.isLoading,
    isError: status.isError,
  }
}

export const GroupsLib = {
  useAllGroups,
  useGroup,
  useWaitingRequests,
  useRejectedRequests,
  useMembers,
}
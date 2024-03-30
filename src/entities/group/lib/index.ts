import { useQuery } from "react-query"
import { GroupApi } from "../api"
import { OneGroup } from "../model"
import { useState } from "react"

const groupsKeys = {
  allGroups: {
    root: ['allGroups'],
  },
  group: {
    root: 'group',
    slug: (slug: number) => [groupsKeys.group.root, slug],
  }
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

  const [group, setGroup] = useState<OneGroup>();

  const status = useQuery({
    queryKey: groupsKeys.group.slug(groupId),
    queryFn: () => {
      return GroupApi.getGroupById(groupId)
    },
    onSuccess: (data) => {
      setGroup(data);
    }
  });

  return {
    group,
    isLoading: status.isLoading,
    isError: status.isError,
  }
}

export const GroupsLib = {
  useAllGroups,
  useGroup,
}
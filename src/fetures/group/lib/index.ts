import { useMutation } from "react-query"
import { GMTypes, GroupApi, GroupMembersApi, MembershipRequest, MembershipRequestsApi } from "../../../entities/group"
import { FC } from "react";

interface UpdateNameProps {
  name: string,
}
const useUpdateName = (groupId: number, updateName?: (name: string) => void) => {

  const status = useMutation(
    ({ name } : UpdateNameProps) => {
      return GroupApi.updateName(name, groupId);
    },
    {
      onSuccess: (data) => {
        if (updateName) {
          updateName(data.name);
        }
      }
    }
  );

  return status;
}

interface UpdateAvatarProps {
  imageFile: File,
}
const useUpdateAvatar = (groupId: number, updateAvatar?: (avatar: string) => void) => {

  const status = useMutation(
    ({ imageFile } : UpdateAvatarProps) => {
      return GroupApi.updateAvatar(imageFile, groupId);
    },
    {
      onSuccess: (data) => {
        if (updateAvatar && data.avatar) {
          updateAvatar(data.avatar);
        }
      }
    }
  );

  return status;
}

const useCreateMembRequest = (groupId: number, createMembRequest?: (request: MembershipRequest) => void) => {
  const status = useMutation(
    () => {
      return MembershipRequestsApi.createRequest(groupId);
    },
    {
      onSuccess: (data) => {
        if (createMembRequest) {
          createMembRequest(data);
        }
      }
    }

  );

  return status
} 

const useDeleteRequest = (groupId: number, userId: number, deleteRequest?: () => void) => {
  const status = useMutation(
    () => {
      return MembershipRequestsApi.deleteRequest(userId, groupId);
    },
    {
      onSuccess: () => {
        if (deleteRequest) {
          deleteRequest();
        }
      }
    }

  );

  return status
}

interface AcceptProps {
  requestId: number,
}
const useAcceptRequest = (acceptRequest?: (requestId: number) => void) => {
  const status = useMutation(
    ({ requestId } : AcceptProps) => {
      return MembershipRequestsApi.acceptRequest(requestId)
    },
    {
      onSuccess: (data) => {
        if (acceptRequest) {
          acceptRequest(data.id);
        }
      }
    }
  );

  return status;
}

const useCancelAcceptRequest = (
  userId: number, 
  groupId: number, 
  requestId: number, 
  cancelAcceptRequest?: (requestId: number) => void
) => {
  const status = useMutation(
    () => {
      return GroupMembersApi.cancelAcceptRequest(userId, groupId);
    },
    {
      onSuccess: (data) => {
        if (cancelAcceptRequest) {
          cancelAcceptRequest(requestId)
        }
      }
    }
  );

  return status;
}

const useDeleteMember = (memberId: number, deleteMember?: (memberId: number) => void) => {

  const status = useMutation(() => {
    return GroupMembersApi.deleteMember(memberId);
  }, {
    onSuccess: (data) => {
      if (deleteMember) {
        deleteMember(memberId);
      }
    }
  });

  return status;
}

const useChangeGMType = (memberId: number, type: GMTypes, changeGMType?: (memberId: number, type: GMTypes) => void) => {

  const status = useMutation(() => {
    return GroupMembersApi.changeMemberType(memberId, type);
  }, {
    onSuccess: (data) => {
      if (changeGMType) {
        changeGMType(memberId, type);
      }
    }
  });

  return status;
}

export const GroupFeaturesLib = {
  useUpdateName,
  useUpdateAvatar,
  useCreateMembRequest,
  useDeleteRequest,
  useAcceptRequest,
  useDeleteMember,
  useCancelAcceptRequest,
  useChangeGMType,
}
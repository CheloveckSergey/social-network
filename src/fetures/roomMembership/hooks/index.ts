import { useQuery } from "react-query";
import { RoomApi, RoomMember } from "../../../entities/room";
import { Hook } from "../../../shared/types";
import { useState } from "react";

interface Effects {
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>
}
const useDeleteMember: Hook<RoomMember, Effects> = (roomMember: RoomMember, effects: Effects) => {

  const [_deleted, _setDeleted] = useState<boolean>(false);

  function lolSetDeleted(value: boolean) {
    _setDeleted(value);
    effects.setDeleted(value);
  }

  const deleteStatus = useQuery(
    ['deleteMember', roomMember.id],
    () => RoomApi.deleteRoomMember(roomMember.userId, roomMember.roomId),
    {
      enabled: false,
      onSuccess: () => {
        lolSetDeleted(true);
      }
    }
  );

  const addStatus = useQuery(
    ['addMember', roomMember.id],
    () => RoomApi.addRoomMember(roomMember.userId, roomMember.roomId),
    {
      enabled: false,
      onSuccess: () => {
        lolSetDeleted(false);
      }
    }
  );

  if (!_deleted) {
    return {
      isLoading: deleteStatus.isLoading,
      isError: deleteStatus.isError,
      isSuccess: deleteStatus.isSuccess,
      headline: 'Delete',
      refetch: deleteStatus.refetch,
    }
  } else {
    return {
      isLoading: addStatus.isLoading,
      isError: addStatus.isError,
      isSuccess: addStatus.isSuccess,
      headline: 'Add',
      refetch: addStatus.refetch,
    }
  }
}

export const Hooks = {
  useDeleteMember,
}
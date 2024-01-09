import { useMutation } from "react-query"
import { RoomApi } from "../../../entities/room"

type CreateGRoomDto = {
  adminId: number,
  name: string,
  userIds: number[],
  roomAvatar?: File,
}

const useCreateGRoom = () => {

  return useMutation(
    async (dto: CreateGRoomDto) => {
      return RoomApi.createGeneralRoom(dto.adminId, dto.name, dto.userIds, dto.roomAvatar)
    }
  )
}

export const RoomActionsLib = {
  useCreateGRoom,
}
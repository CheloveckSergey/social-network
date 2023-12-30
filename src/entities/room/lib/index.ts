import { useQuery } from "react-query"
import { RoomApi } from "../api";
import { useState } from "react";
import { Room } from "../model";

const roomsKeys = {
  room: {
    root: 'room',
    slug: (roomId: number) => [roomsKeys.room.root, roomId],
  }
}

const useRoom = (roomId: number) => {

  const [room, setRoom] = useState<Room>();

  const { isLoading, isError, error } = useQuery({
    queryKey: roomsKeys.room.slug(roomId),
    queryFn: () => {
      return RoomApi.getRoomById(Number(roomId));
    },
    onSuccess: (data) => {
      setRoom(data);
    }
  });

  return {
    room,
    isLoading: isLoading,
    isError,
    error,
  }
}

export const RoomLib = {
  useRoom,
}
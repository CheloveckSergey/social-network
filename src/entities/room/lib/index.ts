import { useQuery } from "react-query"
import { RoomApi } from "../api";
import { useEffect, useState } from "react";
import { Room } from "../model";
import { useAppSelector } from "../../../app/store";
import { RoomHelpers } from "../helpers";
import { Message } from "../../message";

const roomsKeys = {
  room: {
    root: 'room',
    slug: (roomId: number) => [roomsKeys.room.root, roomId],
  },
  rooms: ['rooms'],
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

const useRooms = () => {
  const { user } = useAppSelector(state => state.user);
  const { messages } = useAppSelector(state => state.messages);

  const [_rooms, setRooms] = useState<Room[]>([]);

  const rooms = RoomHelpers.getSortedByLastMessageRooms(_rooms);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: roomsKeys.rooms,
    queryFn: () => RoomApi.getAllRoomsByUserId(user!.id),
    onSuccess: (data) => {
      setRooms(data);
    }
  });

  function updateLastMessage(message: Message) {
    const newRooms = _rooms.map(room => {
      if (room.id === message.roomId) {
        console.log('innerFunction - ', room.id);
        return {
          ...room,
          messages: [message],
        }
      } else {
        return room;
      }
    });
    setRooms(newRooms);
  }

  useEffect(() => {
    console.log('updateLastMessage');
    const lastMessage = messages.at(-1);
    if (lastMessage) {
      console.log('updateLastMessageInner');
      updateLastMessage(lastMessage);
    }
  }, [messages]);

  return {
    rooms,
    isLoading,
    isError,
    error,
  }
}

const useHasNewMessage = (room: Room) => {
  const { messages } = useAppSelector(state => state.messages);

  const [hasNewMessage, setHasNewMessage] = useState<boolean>(false);

  useEffect(() => {
    console.log('setHasNewMessage');
    if (room.messages?.length && messages.find(message => room.messages[0].id === message.id)) {
      console.log('setHasNewMessageInner');
      console.log(room.id);
      setHasNewMessage(true);
    }
  }, [messages, room]);

  return {
    hasNewMessage,
  }
}

export const RoomLib = {
  useRoom,
  useRooms,
  useHasNewMessage,
}
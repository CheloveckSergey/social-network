import { useQuery } from "react-query"
import { MessageApi } from "../api"
import { useEffect, useState } from "react"
import { Message } from "../model"
import { MeUser } from "../../user"
import { useAppSelector } from "../../../app/store"

const messagesKeys = {
  messages: {
    root: 'messages',
    room: (roomId: number) => [messagesKeys.messages.root, roomId],
  }
}

const useMessages = (roomId: number, user: MeUser) => {

  const [messages, setMessages] = useState<Message[]>([]);

  const messagesStatus = useQuery({
    queryKey: messagesKeys.messages.room(roomId),
    queryFn: () => {
      return MessageApi.getMessageByRoomId(roomId);
    },
    onSuccess: (data) => {
      setMessages(data);
    }
  });

  function addMessage(message: Message) {
    setMessages([...messages, message]);
  }

  useSocketMessages(roomId, user, addMessage);

  return {
    messages,
    isLoading: messagesStatus.isLoading,
    isError: messagesStatus.isError,
    error: messagesStatus.error,
    addMessage,
  }
}

const useSocketMessages = (roomId: number, user: MeUser, addMessage: (message: Message) => void) => {

  const { messages } = useAppSelector(state => state.messages);

  useEffect(() => {
    const lastMessage = messages.at(-1)
    if (lastMessage && lastMessage.room.id === roomId) {
      addMessage(lastMessage);
    }
  }, [messages]);
}

export const MessagesLib = {
  useMessages,
}
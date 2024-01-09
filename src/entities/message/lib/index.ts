import { useQuery } from "react-query"
import { MessageApi } from "../api"
import { useEffect, useRef, useState } from "react"
import { Message } from "../model"
import { MeUser } from "../../user"
import { useAppDispatch, useAppSelector } from "../../../app/store"
import { SocketActions } from "../../../fetures/socket"
import { DeleteMessagesActions } from "../../../fetures/messages/model"

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

  function deleteMessage(message: Message) {
    const newMessages = messages.filter(_message => _message.id !== message.id);
    setMessages(newMessages);
  }

  function toggleReadMessage(message: Message) {
    const newMessages = messages.map(_message => {
      if (_message.id === message.id) {
        return {
          ..._message,
          read: true,
        }
      }
      return _message;
    });
    setMessages(newMessages);
  }

  useSocketMessages(roomId, user, addMessage);

  return {
    messages,
    isLoading: messagesStatus.isLoading,
    isError: messagesStatus.isError,
    error: messagesStatus.error,
    addMessage,
    deleteMessage,
    toggleReadMessage,
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

const useMessage = (
  message: Message, 
  deleteMessage: (message: Message) => void, 
  toggleReadMessage: (message: Message) => void,
) => {
  
  const { user } = useAppSelector(state => state.user);
  const { messages } = useAppSelector(state => state.messages);
  const { deletedMessages } = useAppSelector(state => state.deletedMessages);
  const { statuses } = useAppSelector(state => state.messageStatuses);

  const dispatch = useAppDispatch();

  const ref = useRef(null);

  useEffect(() => {
    if (messages.find(_message => _message.id === message.id)) {
      dispatch(SocketActions.readMessage({userId: user!.id, messageId: message.id, roomId: message.roomId}));
    }
  }, []);

  useEffect(() => {
    const lastMessage = deletedMessages.at(-1);
    if (lastMessage?.id === message.id) {
      deleteMessage(message);
      dispatch(DeleteMessagesActions.deleteMessage({message: lastMessage}))
    }
  }, [deletedMessages]);

  useEffect(() => {
    const lastStatus = statuses.at(-1);
    // console.log(lastStatus);
    if (lastStatus && lastStatus.messageId === message.id) {
      toggleReadMessage(message)
    }
  }, [statuses])
}

export const MessagesLib = {
  useMessages,
  useMessage,
}
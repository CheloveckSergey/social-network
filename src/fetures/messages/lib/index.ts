import { useAppDispatch, useAppSelector } from "../../../app/store";
import { Message, SentMessage } from "../../../entities/message";
import { MeUser } from "../../../entities/user";
import { SocketActions } from "../../socket";

const useCreateMessage = (roomId: number, addMessage: (message: Message) => void, user: MeUser) => {

  const dispatch = useAppDispatch();

  function sendMessage(text: string) {
    const sendMessage: SentMessage = {
      text,
      roomId,
      userId: user.id,
    }
    dispatch(SocketActions.sendMessage(sendMessage));
  }

  return {
    sendMessage,
  }
}

export const MessagesLib = {
  useCreateMessage,
}
import { ChangeEvent, FC, useState } from "react";
import { Room } from "../../../entities/room";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { MessageActionsLib } from "../lib";
import { Message } from "../../../entities/message";
import { IoMdSend } from "react-icons/io";
import './styles.scss';

interface CMSProps {
  room: Room,
  addMessage: (message: Message) => void,
}
const MessageCreator: FC<CMSProps> = ({ room, addMessage }) => {

  const { user } = useAppSelector(state => state.user);

  const { sendMessage } = MessageActionsLib.useCreateMessage(room.id, addMessage, user!)

  const [message, setMessage] = useState<string>('');

  if (!user) {
    return (
      <div>
        You're fucking unauthorized!
      </div>
    )
  }

  return (
    <div className="creating-message-section">
      <textarea 
        className="message-input"
        value={message}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
      />
      <button
        className="inherit-to-green"
        onClick={() => {
          sendMessage(message);
          setMessage('');
        }}
      >
        <IoMdSend size={25} />   
      </button>
    </div>
  )
}

export const MessageActionsUi = {
  MessageCreator,
}
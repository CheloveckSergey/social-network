import { FC, useEffect } from "react";
import { Message } from "../model";
import { MeUser, } from "../../user";
import { Helpers } from "../../../shared/helpers";
import { useNavigate } from "react-router-dom";
import './styles.scss';
import { SharedUi } from "../../../shared/sharedUi";
import { FiMessageSquare } from "react-icons/fi";
import { useAppSelector } from "../../../app/store";
import { MyDate } from "../../../shared/types";

interface MLProps {
  message: Message,
  user: MeUser, 
}
export const MessageLine: FC<MLProps> = ({ message, user }) => {

  const navigate = useNavigate();

  // useEffect(() => {
  //   const time = Helpers.getTimeFromMySQLDate(message.createdAt);
  //   console.log(time);
  // }, []);

  return (
    <div className="message-line">
      <img 
        className="user-avatar"
        src={Helpers.getImageSrc(message.user.avatar)} 
        alt="AVATAR_IMG" 
      />
      <div className="main">
        <div className="head">
          <h3 
            className="ref"
            onClick={() => navigate('/user/' + message.user.id)}
          >
            {message.user.login}
          </h3>
          <p className="extra">
            {new MyDate(message.createdAt).getStringTime()}
          </p>
        </div>
        <p>
          {message.text}
        </p>
      </div>
    </div>
  )
}

interface NMLProps {
  message: Message,
}
export const NoteMessageLine: FC<NMLProps> = ({ message }) => {
  
  return (
    <div className="note-message-line">
      <h3 className="user-login ref">{message.user.login}</h3>
      <p className="message-text">{message.text}</p>
    </div>
  )
}

export const AllMessagesButton: FC = () => {

  const { messages } = useAppSelector(state => state.messages);

  return (
    <SharedUi.Buttons.ExtraButton 
      Icon={FiMessageSquare}
    >
      <div>
        {messages.map((message, index) => <NoteMessageLine 
          key={index}
          message={message}
        />)}
      </div>
    </SharedUi.Buttons.ExtraButton>
  )
}
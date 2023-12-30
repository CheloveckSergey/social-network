import { FC, useEffect } from "react";
import { Message } from "../model";
import { MeUser, } from "../../user";
import { Helpers } from "../../../shared/helpers";
import { useNavigate } from "react-router-dom";
import './styles.scss';
import { SharedUi } from "../../../shared/sharedUi";
import { FiMessageSquare } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { MyDate } from "../../../shared/types";
import { MessagesLib } from "../lib";

interface MLProps {
  message: Message,
  user: MeUser, 
}
export const MessageLine: FC<MLProps> = ({ message, user }) => {

  const { messages } = useAppSelector(state => state.messages);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (messages.find(_message => _message.id === message.id)) {
      dispatch({
        type: 'socket/readMessage', 
        payload: {userId: user.id, messageId: message.id, roomId: message.roomId}
      });
    }
  }, []);

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

interface MListProps {
  messages: Message[],
  isLoading: boolean,
  isError: boolean,
  error: any,
}
export const MessagesList: FC<MListProps> = ({ messages, isLoading, isError, error }) => {

  const { user } = useAppSelector(state => state.user);

  return (
    <div className="messages-list">
      <SharedUi.Helpers.LoadErrorHandler 
        isLoading={isLoading}
        isError={isError}
      >
        {messages.map((message, index) => (
          Helpers.isTheFirstMessageToday(message, messages) ? (
            <>
              <p className="date extra">{new MyDate(message.createdAt).getStringDate()}</p>
              <MessageLine 
                key={index}
                message={message}
                user={user!}
              />
            </>
          ) : (
            <MessageLine 
              key={index}
              message={message}
              user={user!}
            />
          )
        ))}
      </SharedUi.Helpers.LoadErrorHandler>
    </div>
  )
}

export const MessagesUi = {
  MessagesList,
}
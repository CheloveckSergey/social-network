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
import { BiCheckboxChecked } from "react-icons/bi";
import { AiFillAppstore, AiFillDelete } from "react-icons/ai";
import { MessageActionsLib } from "../../../fetures/messages";

interface MLProps {
  message: Message,
  user: MeUser, 
  deleteMessage: (message: Message) => void,
  toggleReadMessage: (message: Message) => void,
}
export const MessageLine: FC<MLProps> = ({ message, user, deleteMessage, toggleReadMessage }) => {

  MessagesLib.useMessage(message, deleteMessage, toggleReadMessage);

  const navigate = useNavigate();

  const { sendDeleteMessage } = MessageActionsLib.useDeleteMessage(message);

  return (
    <div 
      className="message-line"
    >
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
      <div className="extra-section">
        <span className="read-or-not">
          {message.read && <BiCheckboxChecked size={25} />}
        </span>
        <button
          className="white"
          onClick={() => sendDeleteMessage()}
        >
          <AiFillDelete size={25} /> 
        </button>
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
    <SharedUi.Buttons.ButtonWithExtraSection 
      body={<FiMessageSquare />}
    >
      <div>
        {messages.map((message, index) => <NoteMessageLine 
          key={index}
          message={message}
        />)}
      </div>
    </SharedUi.Buttons.ButtonWithExtraSection>
  )
}

interface MListProps {
  messages: Message[],
  isLoading: boolean,
  isError: boolean,
  error: any,
  deleteMessage: (message: Message) => void,
  toggleReadMessage: (message: Message) => void,
}
export const MessagesList: FC<MListProps> = ({ messages, isLoading, isError, error, deleteMessage, toggleReadMessage }) => {

  const { user } = useAppSelector(state => state.user);

  return (
    <SharedUi.Helpers.LoadErrorHandler 
      isLoading={isLoading}
      isError={isError}
    >
      {!messages.length ? (
        <div className="empty-list">
          Do something! You're smart, right?! Do that! Do that thing!!!
        </div>
      ) : (
        <div className="messages-list">
          {messages.map((message, index) => (
            Helpers.isTheFirstMessageToday(message, messages) ? (
              <>
                <p className="date extra">{new MyDate(message.createdAt).getStringDate()}</p>
                <MessageLine 
                  key={index}
                  message={message}
                  user={user!}
                  deleteMessage={deleteMessage}
                  toggleReadMessage={toggleReadMessage}
                />
              </>
            ) : (
              <MessageLine 
                key={index}
                message={message}
                user={user!}
                deleteMessage={deleteMessage}
                toggleReadMessage={toggleReadMessage}
              />
            )
          ))}
        </div>
      )}
    </SharedUi.Helpers.LoadErrorHandler>
  )
}

const MyMessageStatuses: FC = () => {

  const { statuses } = useAppSelector(state => state.messageStatuses);

  return (
    <SharedUi.Buttons.ButtonWithExtraSection 
      body={<AiFillAppstore />}
      panelClass="my-statuses"
    >
      {(!statuses.length) ? (
        <>
          <div className="empty">
            Пока нет никаких статусов
          </div>
        </>
      ) : statuses.map((status, index) => (
        <div 
          key={index}
          className="status-line"
        >
          {`Сообщение с ID ${status.messageId} пользователя с ID ${status.message.userId}
          прочитано пользователем ${status.user.login} с ID ${status.user.login}`}
        </div>
      ))}
      
    </SharedUi.Buttons.ButtonWithExtraSection>
  )
}

export const MessagesUi = {
  MessagesList,
  MyMessageStatuses,
}
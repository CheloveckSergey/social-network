import { ChangeEvent, FC, useEffect, useState } from "react";
import { MeUser } from "../../../entities/user";
import './styles.scss'
import { useNavigate, useParams } from "react-router-dom";
import { Room, RoomApi, RoomHelpers, RoomMemberStatus } from "../../../entities/room";
import { useQuery } from "react-query";
import { Helpers } from "../../../shared/helpers";
import { SharedUi } from "../../../shared/sharedUi";
import { Message, MessageLine, SentMessage } from "../../../entities/message";
import { IoMdSend } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { MyDate } from "../../../shared/types";
import { BsThreeDots } from "react-icons/bs";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { setAddRoomMemberWindow, setRoomMembersWindow } from "../../../widgets/modalWindow/model/redux";



interface CMSProps {
  room: Room,
  user: MeUser,
}
const CreatingMessageSection: FC<CMSProps> = ({ room, user }) => {

  const [message, setMessage] = useState<string>('');

  const dispatch = useAppDispatch();

  return (
    <div className="creating-message-section section">
      <textarea 
        className="message-input"
        value={message}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
      />
      <button
        className="inherit-to-green"
        onClick={() => {
          const sendMessage: SentMessage = {
            text: message,
            roomId: room.id,
            userId: user.id,
          }
          const a = 2;
          console.log('XYI');
          dispatch({type: 'socket/send', payload: sendMessage});
        }}
      >
        <IoMdSend size={25} />   
      </button>
    </div>
  )
}

interface RPProps {
  user: MeUser,
}
export const RoomPanel: FC<RPProps> = ({ user }) => {

  const { messages: allMessages } = useAppSelector(state => state.messages)

  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState<Room>();
  const [status, setStatus] = useState<RoomMemberStatus>('offline');

  const { roomId } = useParams();

  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useQuery(
    ['loadRoom', roomId],
    () => {
      if (roomId) {
        return RoomApi.getRoomById(Number(roomId));
      }
    },
    {
      onSuccess: (data) => {
        setRoom(data);
        if (data?.messages) {
          setMessages(data?.messages);
        }
      }
    }
  )

  function addMessage(message: Message) {
    console.log('addMessageFunction');
    console.log(message);
    setMessages([...messages, message]);
  }

  useEffect(() => {
    const lastMessage = allMessages.at(-1)
    if (lastMessage && lastMessage.room.id === room?.id) {
      console.log('addMessage');
      addMessage(lastMessage);
    }
    console.log(lastMessage);
  }, [allMessages]);

  const navigate = useNavigate();

  return (
    <div className="room-panel regular-panel">
      <SharedUi.Helpers.LoadErrorHandler 
        isError={isError}
        isLoading={isLoading}
      >
        {data && room ? (
          <>
            <div className="head-section section">
              <button 
                className="white"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
              <div className="name-status">
                <h3>{RoomHelpers.getName(room, user)}</h3>
                <p className="status extra">
                  {status}
                </p>
              </div>
              <div className="right">
                <SharedUi.Buttons.ExtraButton 
                  Icon={BsThreeDots }
                >
                  <ul className="function-list">
                    <li
                      onClick={() => dispatch(setAddRoomMemberWindow({room}))}
                    >
                      <FaUserPlus />
                      <span>Add member</span>
                    </li>
                    <li
                      onClick={() => dispatch(setRoomMembersWindow({room}))}
                    >
                      <FaUsers />
                      <span>Members</span>
                    </li>
                  </ul>
                </SharedUi.Buttons.ExtraButton>
                <img 
                  className="room-avatar"
                  src={Helpers.getImageSrc(RoomHelpers.getRoomImage(room, user))} 
                  alt="ROOM_AVATAR" 
                />
              </div>
            </div>
            <div className="messages section">
              {messages.map((message, index) => (
                Helpers.isTheFirstMessageToday(message, messages) ? (
                  <>
                    <p className="date extra">{new MyDate(message.createdAt).getStringDate()}</p>
                    <MessageLine 
                      key={index}
                      message={message}
                      user={user}
                    />
                  </>
                ) : (
                  <MessageLine 
                    key={index}
                    message={message}
                    user={user}
                  />
                )
              ))}
                
              
            </div>
            <CreatingMessageSection 
              room={room}
              user={user}
            />
          </>
        ) : (
          <div>
            Something went wrong
          </div>
        )}
      </SharedUi.Helpers.LoadErrorHandler>
    </div>
  )
}
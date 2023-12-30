import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { MeUser } from "../../../entities/user";
import './styles.scss'
import { useNavigate, useParams } from "react-router-dom";
import { Room, RoomApi, RoomHelpers, RoomMemberStatus } from "../../../entities/room";
import { useQuery } from "react-query";
import { Helpers } from "../../../shared/helpers";
import { SharedUi } from "../../../shared/sharedUi";
import { Message, MessagesLib, MessageLine, SentMessage, messagesSlice, MessagesUi } from "../../../entities/message";
import { IoMdSend } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { MyDate } from "../../../shared/types";
import { BsThreeDots } from "react-icons/bs";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { setAddRoomMemberWindow, setRoomMembersWindow } from "../../../widgets/modalWindow/model/redux";
import { SocketActions } from "../../../fetures/socket";
import { MessageActionsUi } from "../../../fetures/messages";
import { RoomLib } from "../../../entities/room/lib";

interface RPProps {
  user: MeUser,
}
export const RoomPanel: FC<RPProps> = ({ user }) => {

  const [status, setStatus] = useState<'online' | 'offline'>('offline');

  const { roomId } = useParams();

  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const {
    room,
    isLoading: isRoomLoading,
    isError: isRoomError,
    error: roomError,
  } = RoomLib.useRoom(Number(roomId))

  const {
    messages,
    isLoading: isMessagesLoading,
    isError: isMessagesError,
    error: messagesError,
    addMessage
  } = MessagesLib.useMessages(Number(roomId!), user!);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView();
    }
  }, [])

  const navigate = useNavigate();

  return (
    <div 
      className="room-panel regular-panel"
    >
      <SharedUi.Helpers.LoadErrorHandler 
        isError={isRoomError}
        isLoading={isRoomLoading}
      >
        {room ? (
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
              <MessagesUi.MessagesList 
                messages={messages}
                isLoading={isMessagesLoading}
                isError={isMessagesError}
                error={messagesError}
              />
            </div>
            <MessageActionsUi.MessageCreator 
              room={room}
              addMessage={addMessage}
            />
            <div ref={ref}></div>
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
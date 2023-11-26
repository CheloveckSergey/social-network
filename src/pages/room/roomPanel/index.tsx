import { ChangeEvent, FC, useState } from "react";
import { MeUser } from "../../../entities/user";
import './styles.scss'
import { useNavigate, useParams } from "react-router-dom";
import { Room, RoomApi, RoomHelpers, RoomMemberStatus } from "../../../entities/room";
import { useQuery } from "react-query";
import { Helpers } from "../../../shared/helpers";
import { SharedUi } from "../../../shared/sharedUi";
import { MessageLine } from "../../../entities/message";
import { IoMdSend } from "react-icons/io";

interface CMSProps {
  room: Room,
  user: MeUser,
}
const CreatingMessageSection: FC<CMSProps> = ({ room, user }) => {

  const [message, setMessage] = useState<string>('');

  return (
    <div className="creating-message-section section">
      <textarea 
        className="message-input"
        value={message}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
      />
      <button
        className="inherit-to-green"
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
  const [room, setRoom] = useState<Room>();
  const [status, setStatus] = useState<RoomMemberStatus>('offline');

  const { roomId } = useParams();

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
      }
    }
  )

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
                <img 
                  className="room-avatar"
                  src={Helpers.getImageSrc(RoomHelpers.getRoomImage(room, user))} 
                  alt="ROOM_AVATAR" 
                />
              </div>
            </div>
            <div className="section">
              {room.messages.map((message, index) => <MessageLine 
                key={index}
                message={message}
                user={user}
              />)}
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
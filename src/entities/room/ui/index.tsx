import { FC, useState } from "react"
import { Room, RoomMember } from "../model"
import { useAppSelector } from "../../../app/store"
import { Helpers } from "../../../shared/helpers";
import './styles.scss';
import { Message } from "../../message";
import { useNavigate } from "react-router-dom";
import { RoomHelpers } from "../helpers";
import { SharedUi } from "../../../shared/sharedUi";
import { RoomMembership } from "../../../fetures/roomMembership";
import { RoomLib } from "../lib";

interface RLProps {
  room: Room,
}
const RoomLine: FC<RLProps> = ({ room }) => {

  const { user } = useAppSelector(state => state.user);

  const { hasNewMessage } = RoomLib.useHasNewMessage(room);

  const navigate = useNavigate();

  if (!user) {
    return <div>
      No Fucking user
    </div>
  }

  return (
    <div 
      onClick={() => navigate('/room/' + room.id)}
      className={`room-line ${hasNewMessage ? 'has-new-message' : ''}`}
    >
      <img 
        className="room-avatar"
        src={Helpers.getImageSrc(RoomHelpers.getRoomImage(room, user))} 
        alt="ROOM_AVATAR" 
      />
      <div className="description">
        <h3 className="room-name">
          {RoomHelpers.getName(room, user)}
        </h3>
        <p className="last-message extra">
          {RoomHelpers.getLastMessageText(room.messages, user)}
        </p>
      </div>
      <div className="right">
        <p className="date extra">
          {room.id}
          {/* {RoomHelpers.getLastMessageDate(room, user)} */}
        </p>
      </div>
    </div>
  )
}

interface RMLProps {
  roomMember: RoomMember,
}
const RoomMemberLine: FC<RMLProps> = ({ roomMember }) => {

  const [deleted, setDeleted] = useState<boolean>(false);

  const navigate = useNavigate();

  interface Effects {
    setDeleted: React.Dispatch<React.SetStateAction<boolean>>,
  }

  return (
    <div className={`room-member-line ${deleted ? 'shadowed' : ''}`}>
      <img 
        className="avatar"
        src={Helpers.getImageSrc(roomMember.user.avatar)} 
        alt="AVATAR" 
      />
      <div className="main">
        <p 
          className="ref"
          onClick={() => navigate('/user/' + roomMember.user.id)}
        >
          {roomMember.user.login}
        </p>
        <p className="extra">{roomMember.type}</p>
      </div>
      <SharedUi.Buttons.ExtraSection<RoomMember, Effects> 
        entity={roomMember}
        effects={{setDeleted}}
        hooks={[RoomMembership.Hooks.useDeleteMember]}
      />
    </div>
  )
}

interface RFProps {
  rooms: Room[],
  isLoading: boolean,
  isError: boolean,
}
const RoomsFeed: FC<RFProps> = ({ rooms, isLoading, isError }) => {

  return (
    <div className="rooms-feed">
      <SharedUi.Helpers.LoadErrorHandler 
        isError={isError}
        isLoading={isLoading}
      >
        {rooms && rooms.length ? (
          <>
            {rooms.map((room, index) => <RoomUi.RoomLine
              key={index}
              room={room}
            />)}
          </>
        ) : (
          <div className="empty">
            Here's no rooms
          </div>
        )}
      </SharedUi.Helpers.LoadErrorHandler>
    </div>
  )
}

export const RoomUi = {
  RoomLine,
  RoomMemberLine,
  RoomsFeed,
}
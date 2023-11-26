import { FC, useState } from "react"
import { Room } from "../model"
import { useAppSelector } from "../../../app/store"
import { Helpers } from "../../../shared/helpers";
import './styles.scss';
import { Message } from "../../message";
import { useNavigate } from "react-router-dom";
import { RoomHelpers } from "../helpers";

interface RLProps {
  _room: Room,
}
const RoomLine: FC<RLProps> = ({ _room }) => {

  const { user } = useAppSelector(state => state.user);

  const [room, setRoom] = useState<Room>(_room)

  const navigate = useNavigate();

  if (!user) {
    return <div>
      No Fucking user
    </div>
  }

  return (
    <div 
      onClick={() => navigate('/room/' + room.id)}
      className="room-line"
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
          {RoomHelpers.getLastMessageDate(room, user)}
        </p>
      </div>
    </div>
  )
}

export const RoomUi = {
  RoomLine,
}
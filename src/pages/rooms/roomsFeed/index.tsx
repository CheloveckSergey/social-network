import { FC } from "react";
import './styles.scss';
import { Room, RoomApi } from "../../../entities/room";
import { Helpers } from "../../../shared/helpers";
import { SharedUi } from "../../../shared/sharedUi";
import { useQuery } from "react-query";
import { MeUser } from "../../../entities/user";
import { RoomUi } from "../../../entities/room/ui";
import { RoomLib } from "../../../entities/room/lib";

interface RFProps {
  user: MeUser,
}
export const RoomsFeed: FC<RFProps> = ({ user }) => {

  const {
    rooms,
    isLoading,
    isError,
  } = RoomLib.useRooms();

  return (
    <div className="rooms-feed regular-panel">
      <SharedUi.Helpers.LoadErrorHandler 
        isError={isError}
        isLoading={isLoading}
      >
        {rooms && rooms.length ? (
          <div className="feed">
            {rooms.map((room, index) => <RoomUi.RoomLine
              key={index}
              room={room}
            />)}
          </div>
        ) : (
          <div>
            Here's no rooms
          </div>
        )}
      </SharedUi.Helpers.LoadErrorHandler>
    </div>
  )
}
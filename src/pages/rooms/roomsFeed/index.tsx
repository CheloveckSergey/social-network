import { FC } from "react";
import './styles.scss';
import { Room, RoomApi } from "../../../entities/room";
import { Helpers } from "../../../shared/helpers";
import { SharedUi } from "../../../shared/sharedUi";
import { useQuery } from "react-query";
import { MeUser } from "../../../entities/user";
import { RoomUi } from "../../../entities/room/ui";

interface RFProps {
  user: MeUser,
}
export const RoomsFeed: FC<RFProps> = ({ user }) => {

  const { data, isLoading, isError } = useQuery(
    ['loadRooms', user.id],
    () => RoomApi.getAllRoomsByUserId(user.id),
  )

  return (
    <div className="rooms-feed regular-panel">
      <SharedUi.Helpers.LoadErrorHandler 
        isError={isError}
        isLoading={isLoading}
      >
        {data && data.length ? (
          <div className="feed">
            {data.map((room, index) => <RoomUi.RoomLine
              key={index}
              _room={room}
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
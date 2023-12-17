import { FC, useState } from "react";
import './styles.scss';
import { useAppSelector } from "../../../../app/store";
import { useQuery } from "react-query";
import { RoomApi, RoomMember } from "../../../../entities/room";
import { SharedUi } from "../../../../shared/sharedUi";
import { UserUi } from "../../../../entities/user";
import { RoomUi } from "../../../../entities/room/ui";

export const RoomMembersWindow: FC = () => {

  const { room } = useAppSelector(state => state.modalWindow);

  const [roomMembers, setRoomMembers] = useState<RoomMember[]>([]);

  const loadMembersStatus = useQuery(
    ['loadMembers', room?.id],
    () => {
      if (room) {
        return RoomApi.getAllMembersByRoom(room.id);
      }
    },
    {
      onSuccess: (data) => {
        if (data) {
          setRoomMembers(data);
        }
      }
    }
  )

  return (
    <div className='room-members-window regular-panel'>
      <div className="head section">
        <h3>All Members</h3>
        <p className="extra">{room?.name}</p>
      </div>
      <div className="main section">
        <SharedUi.Helpers.LoadErrorHandler 
          isError={loadMembersStatus.isError}
          isLoading={loadMembersStatus.isLoading}
        >
          {roomMembers && roomMembers.length ? (
            <>
              {roomMembers.map((roomMember, index) => <RoomUi.RoomMemberLine 
                key={index}
                roomMember={roomMember}
              />)}
            </>
          ) : (
            <>
              No Members... Is's kind of weird
            </>
          )}
        </SharedUi.Helpers.LoadErrorHandler>
      </div>
    </div>
  )
}
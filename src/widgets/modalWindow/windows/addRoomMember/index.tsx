import { FC, useState } from "react";
import './styles.scss';
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { useQuery } from "react-query";
import { RoomApi } from "../../../../entities/room";
import { OneUser, UserUi } from "../../../../entities/user";
import { SharedUi } from "../../../../shared/sharedUi";
import { IoMdSend } from "react-icons/io";
import { closeWindow } from "../../model/redux";

export const AddRoomMember: FC = () => {

  const { user } = useAppSelector(state => state.user);
  const { room } = useAppSelector(state => state.modalWindow);

  const [pMembers, setPMembers] = useState<OneUser[]>([]);
  const [addedUsers, setAddedUsers] = useState<OneUser[]>([]);

  const dispatch = useAppDispatch();

  function addDeleteUser(user: OneUser) {
    if (addedUsers.find(_user => _user.id === user.id)) {
      const newUsers = addedUsers.filter(_user => _user.id !== user.id);
      setAddedUsers(newUsers);
    }
    setAddedUsers([...addedUsers, user]);
  }

  const loadPMembersStatus = useQuery(
    ['loadPossibleMembers', user?.id, room?.id],
    () => {
      if (user && room) {
        return RoomApi.getAllPossibleMembers(room.id, user.id);
      }
    },
    {
      onSuccess(data) {
        if (data) {
          setPMembers(data);
        }
      },
    }
  )

  const addMembersStatus = useQuery(
    ['loadMember', room?.id, addedUsers],
    () => {
      if (user && room && addedUsers.length) {
        return RoomApi.addRoomMembers(addedUsers.map(addedUser => addedUser.id), room.id);
      }
    },
    {
      enabled: false,
      onSuccess: (data) => {
        dispatch(closeWindow({}));
      }
    }
  )

  function send() {
    addMembersStatus.refetch();
  }

  return (
    <div className="add-room-member-window regular-panel">
      <div className="head section">
        <h3>Add Room Member</h3>
        <p className="extra">{room?.name}</p>
      </div>
      <div className="main section">
        <SharedUi.Helpers.LoadErrorHandler 
          isError={loadPMembersStatus.isError}
          isLoading={loadPMembersStatus.isLoading}        
        >
          {pMembers && pMembers.length ? (
            <>
              {pMembers.map((pMember, index) => <UserUi.Cards.EmptyUserListCard 
                key={index}
                user={pMember}
                addDeleteUser={addDeleteUser}
              />)}
            </>
          ) : (
            <>
              No Possible Users
            </>
          )}
        </SharedUi.Helpers.LoadErrorHandler>
      </div>
      <div className="section">
      <button
        className="load-button white"
        onClick={send}
        disabled={addMembersStatus.isSuccess}
      >
        {addMembersStatus.isLoading ? (
          <SharedUi.Icons.Spinner size={35} />
        ) : addMembersStatus.isError ? (
          <SharedUi.Icons.Error size={35} />
        ) : (
          <IoMdSend size={35} />
        )}
      </button>
      </div>
    </div>
  )
}
import { FC } from "react";
import { MeUser } from "../../../entities/user";
import './styles.scss';
import { FaCalendarPlus } from "react-icons/fa";
import { useAppDispatch } from "../../../app/store";
import { setCreateGRoomWindow } from "../../../widgets/modalWindow/model/redux";

interface CRBProps {
  user: MeUser,
}
const CreateRoomButton: FC<CRBProps> = ({ user }) => {

  const dispatch = useAppDispatch();

  return (
    <button 
      className="white"
      onClick={() => dispatch(setCreateGRoomWindow({ user }))}
    >
      <FaCalendarPlus size={25} />
    </button>
  )
}

interface UpbarProps {
  user: MeUser,
}
export const RoomsUpbar: FC<UpbarProps> = ({ user }) => {

  return (
    <div className="rooms-upbar regular-panel">
      <CreateRoomButton user={user} />
    </div>
  )
}
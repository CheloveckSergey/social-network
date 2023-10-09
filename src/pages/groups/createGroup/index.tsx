import { FC } from "react";
import { useAppDispatch } from "../../../app/store";
import { WindowTypes, setWindow } from "../../../widgets/modalWindow/model/redux";
import { BiSolidGroup } from "react-icons/bi";

export const AddGroupPanel: FC = () => {
  const dispatch = useAppDispatch(); 

  return (
    <div className="add-group regular-panel">
      <button 
        className="green-to-pale"
        onClick={() => dispatch(setWindow({window: WindowTypes.ADD_GROUP}))}
      >
        <h3>Create Group</h3>
        <BiSolidGroup size={20} />
      </button>
    </div>
  )
}
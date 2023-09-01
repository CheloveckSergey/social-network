import { BsPencilSquare } from "react-icons/bs";
import { useAppDispatch } from "../../app/store";
import { WindowTypes, setWindow } from "../../widgets/modalWindow/model/redux";
import { FC } from "react";
import './styles.scss';

interface AddPostPanelProps {
  windowType: WindowTypes
}

const AddPostPanel: FC<AddPostPanelProps> = ({ windowType }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="add-post regular-panel">
      <button 
        className="green-to-pale"
        onClick={() => dispatch(setWindow({window: windowType}))}
      >
        <h3>Add Some Post</h3>
        <BsPencilSquare size={20} />
      </button>
    </div>
  )
}

export default AddPostPanel;
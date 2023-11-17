import { BsPencilSquare } from "react-icons/bs";
import { useAppDispatch } from "../../app/store";
import { WindowTypes, setAddPostWindow, setWindow } from "../modalWindow/model/redux";
import { FC } from "react";
import './styles.scss';
import { Author } from "../../entities/author";

interface AddPostPanelProps {
  author: Author,
}

const AddPostPanel: FC<AddPostPanelProps> = ({ author }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="add-post regular-panel">
      <button 
        className="green-to-pale"
        onClick={() => dispatch(setAddPostWindow({author}))}
      >
        <h3>Add Some Post</h3>
        <BsPencilSquare size={20} />
      </button>
    </div>
  )
}

export default AddPostPanel;
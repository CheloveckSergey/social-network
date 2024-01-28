import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import './styles.scss';
import { AnotherModalWindowActions } from "../model";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface AMWProps {
  onClose: () => void,
  children: React.ReactNode | React.ReactNode[],
}
export const AnotherModalWindow: FC<AMWProps> = ({ children, onClose }) => {

  return (
    <div className="blackout">
      {children}
      <button 
        className="close-button white"
        onClick={onClose}
      >
        <AiOutlineCloseCircle size={50} />
      </button>
    </div>
  )
}

export default AnotherModalWindow;
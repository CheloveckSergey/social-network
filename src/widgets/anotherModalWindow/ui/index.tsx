import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import './styles.scss';
import { AnotherModalWindowActions } from "../model";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { createPortal } from 'react-dom';

interface UMWProps {
  condition: boolean,
  onClose: () => void,
  children: React.ReactNode | React.ReactNode[],
}
export const UseModalWindow: FC<UMWProps> = ({ condition, onClose, children }) => {

  return (
    <>
      {condition && createPortal(<AnotherModalWindow 
        onClose={onClose} 
      >
        {children}
      </AnotherModalWindow>, document.getElementById('App')!)}
    </>
  )
}

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
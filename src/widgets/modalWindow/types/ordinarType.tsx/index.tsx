import { AiOutlineCloseCircle } from "react-icons/ai";
import { FC, ReactNode } from "react";
import { closeWindow } from "../../model/redux";
import { useAppDispatch } from "../../../../app/store";
import './styles.scss';

interface AddWindowTypeProps {
  children: ReactNode | ReactNode[],
  windowName: string,
  windowClass?: string | undefined;
}

const OrdinarPanel: FC<AddWindowTypeProps> = ({ children, windowName, windowClass }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={`ordinar-window ${windowClass}`}>
      <div className="header-section section">
        <button
          className="close"
          onClick={() => dispatch(closeWindow({}))}
        >
          <AiOutlineCloseCircle size={25} />
        </button>
        <p>{windowName}</p>
      </div>
      <hr/>
      <div className="window-main section">
        {children}
      </div>
    </div>
  )
}

export default OrdinarPanel;
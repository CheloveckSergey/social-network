import { FC } from "react"
import { OnePost } from "../../.."
import React from "react"
import './styles.scss';
import { PostEffects } from ".."
import { BiComment } from "react-icons/bi";
import { OneCreation } from "../../../../creation";

interface BSProps {
  commentNumber: number,
  commentsOpened: boolean,
  setCommentsOpened: React.Dispatch<React.SetStateAction<boolean>>,
  actions: React.ReactNode | React.ReactNode[];
}
export const BottomSection: FC<BSProps> = ({ commentNumber, commentsOpened, setCommentsOpened, actions }) => {

  return (
    <div className="bottom">
      <div className="left">
        {actions}
      </div>
      <div className="right">
        <button 
          className='comment-button'
          onClick={() => {
            setCommentsOpened(!commentsOpened);
          }}
        >
          <BiComment size={25} />
          <span>{commentNumber}</span>
        </button>
      </div>
    </div>
  )
}
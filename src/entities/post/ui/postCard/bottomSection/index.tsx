import { FC } from "react"
import { OnePost } from "../../.."
import React from "react"
import './styles.scss';
import { PostEffects } from ".."
import { BiComment } from "react-icons/bi";
import { OneCreation } from "../../../../creation";

interface BSProps {
  post: OnePost,
  effects: PostEffects,
  commentsOpened: boolean,
  setCommentsOpened: React.Dispatch<React.SetStateAction<boolean>>,
  actions: React.FC<{creation: OneCreation, effects: PostEffects}>[],
}
export const BottomSection: FC<BSProps> = ({ post, commentsOpened, setCommentsOpened, effects, actions }) => {

  return (
    <div className="bottom">
      <div className="left">
        {actions.map((Action, index) => (
          <Action 
            key={index} 
            creation={post.creation} 
            effects={effects}
          />
        ))}
      </div>
      <div className="right">
        <button 
          className='comment-button'
          onClick={() => {
            setCommentsOpened(!commentsOpened);
          }}
        >
          <BiComment size={25} />
          <span>{post.creation.commentNumber}</span>
        </button>
      </div>
    </div>
  )
}
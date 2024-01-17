import { FC } from "react"
import { OnePost } from "../../.."
import Favourites from "../../../../../fetures/favourites"
import React from "react"
import './styles.scss';
import { PostEffects } from ".."
import { useAppSelector } from "../../../../../app/store";
import { BiComment } from "react-icons/bi";
import { OneCreation } from "../../../../creation";

interface PCBProps {
  post: OnePost,
  opened: boolean,
  setOpened: React.Dispatch<React.SetStateAction<boolean>>,
  connected: boolean,
  connectComments: () => void,
}
export const PostCommentButton: FC<PCBProps> = ({ post, setOpened, opened, connectComments, connected }) => {

  const { user } = useAppSelector(state => state.user);  

  return (
    <button 
      className={`comment-button ${connected ? 'connected' : ''}`}
      onClick={() => {
        setOpened(!opened);
        connectComments();
      }}
    >
      <BiComment size={25} />
      <span>{post.creation.commentNumber}</span>
      {connected ? (<span>
        Online
      </span>) : (<span>
        Offline
      </span>)}
    </button>
  )
}

interface BSProps {
  post: OnePost,
  effects: PostEffects,
  commentsOpened: boolean,
  setCommentsOpened: React.Dispatch<React.SetStateAction<boolean>>,
  connected: boolean,
  connectComments: () => void,
  actions: React.FC<{creation: OneCreation, effects: PostEffects}>[],
}
export const BottomSection: FC<BSProps> = ({ post, commentsOpened, setCommentsOpened, effects, connectComments, connected, actions }) => {

  return (
    <div className="bottom">
      <div className="left">
        {actions.map((Action, index) => (
          <Action key={index} creation={post.creation} effects={effects}/>
        ))}
      </div>
      <div className="right">
        <PostCommentButton
          connected={connected}
          opened={commentsOpened} 
          setOpened={setCommentsOpened}
          post={post}
          connectComments={connectComments}
        />
      </div>
    </div>
  )
}
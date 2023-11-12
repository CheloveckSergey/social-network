import { FC } from "react"
import { OnePost, Post } from "../../model"
import Favourites from "../../../../fetures/favourites"
import { PostCommentButton } from "../../../comment"
import React from "react"
import './styles.scss';
import { Effects } from ".."

interface BSProps {
  post: OnePost,
  commentsOpened: boolean,
  setCommentsOpened: React.Dispatch<React.SetStateAction<boolean>>,
  effects: Effects,
}
export const BottomSection: FC<BSProps> = ({ post, commentsOpened, setCommentsOpened, effects }) => {

  return (
    <div className="bottom">
      <Favourites.Actions.LikeButton creation={post.creation} effects={effects} />
      <PostCommentButton 
        opened={commentsOpened} 
        setOpened={setCommentsOpened}
        post={post}
      />
    </div>
  )
}
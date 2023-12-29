import { FC } from "react"
import { OnePost, Post } from "../../model"
import Favourites from "../../../../fetures/favourites"
import React from "react"
import './styles.scss';
import { Effects } from ".."
import { useAppSelector } from "../../../../app/store";
import { BiComment } from "react-icons/bi";

interface PCBProps {
  post: OnePost,
  opened: boolean,
  setOpened: React.Dispatch<React.SetStateAction<boolean>>,
  connectComments: () => void,
  connected: boolean,
}
export const PostCommentButton: FC<PCBProps> = ({ post, setOpened, opened, connectComments, connected }) => {

  const { user } = useAppSelector(state => state.user);  
  // const { commented, setCommented } = useComments(post.creation.comments);

  //жопно работает, setCommented пока бесполезен
  // function useComments(comments: Comment[]) {
  //   let _isCommented: boolean;
  //   if (comments.find(comment => comment.ownCreation.author.id === user?.author.id)) {
  //     _isCommented = true;
  //   } else {
  //     _isCommented = false;
  //   }
  //   const [commented, setCommented] = useState<boolean>(_isCommented);
  //   return { commented, setCommented };
  // }

  return (
    <button 
      className={`comment-button ${connected ? 'connected' : ''}`}
      onClick={() => {
        setOpened(!opened);
        connectComments();
      }}
    >
      <BiComment size={25} />
      {connected ? (<span>
        Online
      </span>) : (<span>
        Offline
      </span>)}
      {/* <BiComment size={25} className={`${commented ? 'commented' : ''}`} /> */}
      <p className="extra">{post.creation.commentNumber}</p>
    </button>
  )
}

interface BSProps {
  post: OnePost,
  commentsOpened: boolean,
  setCommentsOpened: React.Dispatch<React.SetStateAction<boolean>>,
  effects: Effects,
  connectComments: () => void,
  connected: boolean,
}
export const BottomSection: FC<BSProps> = ({ post, commentsOpened, setCommentsOpened, effects, connectComments, connected }) => {

  return (
    <div className="bottom">
      <Favourites.Actions.LikeButton creation={post.creation} effects={effects} />
      <PostCommentButton
        connected={connected}
        opened={commentsOpened} 
        setOpened={setCommentsOpened}
        post={post}
        connectComments={connectComments}
      />
    </div>
  )
}
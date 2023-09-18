import { FC, useState } from "react";
import { Post } from "../model";
import { BsThreeDots } from 'react-icons/bs';
import "./styles.scss";
import Favourites from "../../../fetures/favourites";
import { useAppSelector } from "../../../app/store";
import { CommentSection } from "./commentSection";
import { PostCommentButton } from "../../comment";
import { getImageSrc } from "../../../shared/service/images";


interface PostProps {
  post: Post
}

export const PostCard: FC<PostProps> = ({ post }) => {

  const [commentsOpened, setCommentsOpened] = useState<boolean>(false);
  const { user } = useAppSelector(state => state.user);

  return (
    <div className="post regular-panel">
      <div className="post-main">
        <div className="up">
          <div className="group-info">
            <img src={getImageSrc(post.author.avatar)} alt="IMG" />
            <div>
              <h3 className="title">{post.author.name}</h3>
              <p className="extra">{post.createdAt}</p>
            </div>
          </div>
          <button className="white">
            <BsThreeDots size={25}/>
          </button>
        </div>
        <div className="body">
          <p className="description">{post.description}</p>
          {post.image && <img className="post-img" src={getImageSrc(post.image)} alt="PostIMG" />}
        </div>
        <div className="bottom">
          <Favourites.Actions.PostLike post={post} />
          <PostCommentButton 
            opened={commentsOpened} 
            setOpened={setCommentsOpened}
            post={post}
          />
        </div>
      </div>
      {commentsOpened && user && <CommentSection user={user} post={post} />}
    </div>
  )
}

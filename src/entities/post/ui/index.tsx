import { FC, useState } from "react";
import { Post } from "../model";
import "./styles.scss";
import Favourites from "../../../fetures/favourites";
import { useAppSelector } from "../../../app/store";
import { CommentSection } from "./commentSection";
import { PostCommentButton } from "../../comment";
import { getImageSrc } from "../../../shared/service/images";
import { ExtraSection } from "./extraSection";


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
            <img src={getImageSrc(post.creation.author.avatar)} alt="IMG" />
            <div>
              <h3 className="title">{post.creation.author.name}</h3>
              <p className="extra">{post.creation.createdAt}</p>
            </div>
          </div>
          <ExtraSection post={post} />
        </div>
        <div className="body">
          <p className="description">{post.description}</p>
          <div className="images">

            {post.postImages.length > 0 && <img className="post-img" src={getImageSrc(post.postImages[0].value)} alt="PostIMG" />}
          </div>
        </div>
        <div className="bottom">
          <Favourites.Actions.LikeButton creation={post.creation} />
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

import { FC, useState, MouseEvent } from "react";
import { Post } from "../model";
import "./styles.scss";
import Favourites from "../../../fetures/favourites";
import { useAppSelector } from "../../../app/store";
import { CommentSection } from "./commentSection";
import { PostCommentButton } from "../../comment";
import { getImageSrc } from "../../../shared/service/images";
import { ExtraSection } from "./extraSection";
import { Image } from "../../image";
import { BsFillCircleFill, BsFillRecordCircleFill } from "react-icons/bs";


interface PostProps {
  post: Post
}

export const PostCard: FC<PostProps> = ({ post }) => {

  const [commentsOpened, setCommentsOpened] = useState<boolean>(false);
  const { user } = useAppSelector(state => state.user);
  const [images, setImages] = useState<Image[]>(post.postImages);
  const [curImageIndex, setCurImageIndex] = useState<number>(0);

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
          <div className="post-images">
            {images && (images.length > 0) && <div className="images">
              {(images.length > 1) ? (<div>
                <img 
                  className="post-image"
                  // src={`${images[curImageIndex]}`} 
                  src={getImageSrc(images[curImageIndex].value)} 
                  alt="IMG" 
                />
                <div className="indexes">
                  {images.map((image, index) => <button
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      setCurImageIndex(index);
                    }}
                  >
                    {(index === curImageIndex) ? (
                      <BsFillCircleFill size={15} style={{color: 'green'}} />
                    ) : (
                      <BsFillRecordCircleFill size={15} style={{color: 'gray'}} />
                    )}
                  </button>)}
                </div>
              </div>) : (<div>
                <img 
                  className="post-image"
                  // src={`${images[0]}`} 
                  src={getImageSrc(images[curImageIndex].value)}
                  alt="IMG" 
                />
              </div>)}
            </div>}
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

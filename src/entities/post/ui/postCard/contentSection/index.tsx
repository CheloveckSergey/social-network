import { FC, useState, MouseEvent } from "react";
import { BsFillCircleFill, BsFillRecordCircleFill } from "react-icons/bs";
import './styles.scss';
import { ImageUi } from "../../../../image";
import { OnePost } from "../../..";

interface CSProps {
  post: OnePost,
  setImageLiked: (postImageId: number, isLiked: boolean) => void,
} 
export const ContentSection: FC<CSProps> = ({ post, setImageLiked }) => {

  const [curImageIndex, setCurImageIndex] = useState<number>(0);

  return (
    <div className="body">
      <p className="description">{post.description}</p>
      <div className="post-images">
        {post.postImages && (post.postImages.length > 0) && <div className="images">
          {(post.postImages.length > 1) ? (
            <div>
              <ImageUi.ImageCard 
                images={post.postImages}
                imageClass="post-image"
                curImageIndex={curImageIndex}
                setCurImageIndex={setCurImageIndex}
                setIsLiked={setImageLiked}
              />
              <div className="indexes">
                {post.postImages.map((image, index) => <button
                  key={index}
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
            </div>
          ) : (
            <div>
              <ImageUi.ImageCard 
                imageClass="post-image"
                curImageIndex={0}
                images={post.postImages}
                setCurImageIndex={setCurImageIndex}
                setIsLiked={setImageLiked}
              />
            </div>
          )}
        </div>}
      </div>
    </div>
  )
}
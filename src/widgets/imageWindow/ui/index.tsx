import { FC, useEffect, useRef, useState } from "react";
import { OneImage } from "../../../entities/image";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { Helpers } from "../../../shared/helpers";
import { CommentsLib, CommentsUi, OneComment } from "../../../entities/comment";
import { AuthorUi } from "../../../entities/author";
import { CommentsActionsUi } from "../../../fetures/comments";
import './styles.scss';
import Favourites from "../../../fetures/favourites";

interface ISProps {
  images: OneImage[],
  curImageIndex: number,
  setCurImageIndex: (index: number) => void,
}
const ImageSection: FC<ISProps> = ({ images, curImageIndex, setCurImageIndex }) => {

  const curImage: OneImage = images[curImageIndex];

  function previousImage() {
    if (curImageIndex === 0) {
      return;
    }
    setCurImageIndex(curImageIndex - 1);
  }

  function nextImage() {
    if (curImageIndex === images.length - 1) {
      return;
    }
    setCurImageIndex(curImageIndex + 1);
  }


  return (
    <div className="left">
      <button
        className="turn-button left-button white"
        onClick={() => previousImage()}
      >
        <AiOutlineDoubleLeft size={55} />
      </button>
      <img 
        src={Helpers.getImageSrc(curImage.value)} 
        alt="IMG"
        className="image-image"
      />
      <button
        className="turn-button right-button white"
        onClick={() => nextImage()}
      >
        <AiOutlineDoubleRight size={55} />
      </button>
    </div>
  )
}

interface IWProps {
  images: OneImage[],
  curImageIndex: number,
  setCurImageIndex: (index: number) => void,
}
export const ImageWindow: FC<IWProps> = ({ images, curImageIndex, setCurImageIndex }) => {
  const { user } = useAppSelector(state => state.user);

  const [image, setImage] = useState<OneImage>(images[curImageIndex]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    comments,
    isLoading,
    isError,
    connectComments,
    addComment,
    setIsLiked,
  } = CommentsLib.useComments(image.creationId);

  useEffect(() => {
    connectComments();
  }, [image]);

  useEffect(() => {
    setImage(images[curImageIndex]);
  }, [curImageIndex])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  }, [comments]);

  return (
    <div className="regular-panel image-window">
      <div className="main">
        <ImageSection 
          images={images}
          curImageIndex={curImageIndex}
          setCurImageIndex={setCurImageIndex} 
        />
        <div className="right">
          <div className="header">
            <AuthorUi.AuthorCard
              author={image.creation.author}
              createdAt={image.creation.createdAt}
            />
          </div>
          <div className="like-repost-section">
            {/* <Favourites.Actions.LikeButton creation={image.creation} /> */}
            asdfasdfasfsafsadf
          </div>
          <div className="comments-section">
            <div className="comments">
              <CommentsUi.ImageCommentFeed 
                comments={comments}
                addComment={addComment}
                renderComment={(comment: OneComment) => {

                  function _setIsLiked(isLiked: boolean) {
                    return setIsLiked(comment.id, isLiked);
                  }

                  return (
                    <CommentsUi.ImageCommentLine 
                      key={comment.id}
                      comment={comment}
                      addComment={addComment}
                      likeButton={<Favourites.Actions.SmallLikeButton 
                        creation={comment.ownCreation}
                        effects={{
                          setIsLiked: _setIsLiked,
                        }}
                      />}
                    />
                  )
                }} 
              />
              <div ref={scrollRef}></div>
            </div>
            
            {user && <CommentsActionsUi.ImageCommentCreator 
              user={user}
              creation={image.creation}
              addComment={addComment}
            />}
          </div>
        </div>
      </div>
      <div className="bottom">

      </div>
    </div>
  )
}
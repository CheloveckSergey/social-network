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
  image: OneImage,
  curImageIndex: number,
  setCurImageIndex: (index: number) => void,
  previousImage: () => void,
  nextImage: () => void,
}
const ImageSection: FC<ISProps> = ({ image, curImageIndex, setCurImageIndex, previousImage, nextImage }) => {

  const curImage: OneImage = image;

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
  previousImage: () => void,
  nextImage: () => void,
  actions: React.ReactNode | React.ReactNode[],
}
export const ImageWindow: FC<IWProps> = ({ images, curImageIndex, setCurImageIndex, nextImage, previousImage, actions }) => {
  const { user } = useAppSelector(state => state.user);

  const [responseToComment, setResponseToComment] = useState<OneComment>();

  const image = images[curImageIndex];

  function cancelResponse() {
    setResponseToComment(undefined);
  }

  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    comments,
    isLoading,
    isError,
    addComment,
    setIsLiked,
  } = CommentsLib.useComments(image.creationId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  }, [comments]);

  return (
    <div className="regular-panel image-window">
      <div className="main">
        <ImageSection 
          image={image}
          curImageIndex={curImageIndex}
          setCurImageIndex={setCurImageIndex} 
          nextImage={nextImage}
          previousImage={previousImage}
        />
        <div className="right">
          <div className="header">
            <AuthorUi.AuthorCard
              author={image.creation.author}
              createdAt={image.creation.createdAt}
            />
          </div>
          <div className="like-repost-section">
            {actions}
          </div>
          <div className="comments-section">
            <div className="comments">
              <CommentsUi.ImageCommentFeed 
                comments={comments}
                isLoading={isLoading}
                isError={isError}
                addComment={addComment}
                renderComment={(comment: OneComment) => {

                  function _setCommentLiked(isLiked: boolean) {
                    return setIsLiked(comment.id, isLiked);
                  }

                  return (
                    <CommentsUi.ImageCommentLine 
                      key={comment.id}
                      comment={comment}
                      addComment={addComment}
                      setResponseToComment={setResponseToComment}
                      likeButton={<Favourites.Actions.SmallLikeButton 
                        creation={comment.ownCreation}
                        effects={{
                          setIsLiked: _setCommentLiked,
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
              responseToComment={responseToComment}
              cancelResponse={cancelResponse}
            />}
          </div>
        </div>
      </div>
      <div className="bottom">

      </div>
    </div>
  )
}
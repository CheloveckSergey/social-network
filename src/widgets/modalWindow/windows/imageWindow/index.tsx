import { FC, useEffect, useRef, useState } from "react";
import './styles.scss';
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { nextImage, previousImage } from "../../model/redux";
import { Helpers } from "../../../../shared/helpers";
import { OneImage } from "../../../../entities/image";
import { AuthorUi } from "../../../../entities/author";
import { CommentsLib, CommentsUi } from "../../../../entities/comment";
import { CommentsActionsUi } from "../../../../fetures/comments";

interface ISProps {
  image: OneImage,
}
const ImageSection: FC<ISProps> = ({ image }) => {

  const dispatch = useAppDispatch();

  return (
    <div className="left">
      <button
        className="turn-button left-button white"
        onClick={() => dispatch(previousImage({}))}
      >
        <AiOutlineDoubleLeft size={55} />
      </button>
      <img 
        src={Helpers.getImageSrc(image.value)} 
        alt="IMG"
        className="image-image"
      />
      <button
        className="turn-button right-button white"
        onClick={() => dispatch(nextImage({}))}
      >
        <AiOutlineDoubleRight size={55} />
      </button>
    </div>
  )
}

const ImageWindow: FC = () => {
  const { user } = useAppSelector(state => state.user);
  const { images, curImageIndex } = useAppSelector(state => state.modalWindow);

  // const image = images[curImageIndex];

  const [image, setImage] = useState<OneImage>(images[curImageIndex]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    comments,
    isLoading,
    isError,
    connectComments,
    addComment,
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

  const dispatch = useAppDispatch();

  return (
    <div className="regular-panel image-window">
      <div className="main">
        <ImageSection image={image} />
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

export default ImageWindow;
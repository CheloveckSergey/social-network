import { FC } from "react";
import './styles.scss';
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { nextImage, previousImage } from "../../model/redux";
import { Helpers } from "../../../../shared/helpers";
import { OneImage } from "../../../../entities/image";
import { AuthorUi } from "../../../../entities/author";

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
  const { images, curImageIndex } = useAppSelector(state => state.modalWindow);

  const image = images[curImageIndex];

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
          </div>
        </div>
      </div>
      <div className="bottom">

      </div>
    </div>
  )
}

export default ImageWindow;
import { FC } from "react";
import './styles.scss';
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { getImgSrc } from "../../../../shared/service/images";
import { AuthorCreationCard } from "../../../../entities/author/ui";
import Favourites from "../../../../fetures/favourites";
import { nextImage, previousImage } from "../../model/redux";

const ImageWindow: FC = () => {
  const { images, curImageIndex } = useAppSelector(state => state.modalWindow);

  const image = images[curImageIndex];

  const dispatch = useAppDispatch();

  return (
    <div className="regular-panel image-window">
      {!images ? (
        <div>Holy shit</div>
      ) : (
        <>
          <div className="main">
            <div className="left">
              <button
                className="turn-button left-button white"
                onClick={() => dispatch(previousImage({}))}
              >
                <AiOutlineDoubleLeft size={55} />
              </button>
              <img 
                src={getImgSrc(image)} 
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
            <div className="right">
              <div className="header">
                <AuthorCreationCard
                  author={image.creation.author}
                  createdAt={image.creation.createdAt}
                />
              </div>
              <div className="like-repost-section">
                <Favourites.Actions.LikeButton creation={image.creation} />
              </div>
            </div>
          </div>
          <div className="bottom">

          </div>
        </>
      )}
    </div>
  )
}

export default ImageWindow;
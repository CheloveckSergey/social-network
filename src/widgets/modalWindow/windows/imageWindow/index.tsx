import { FC } from "react";
import './styles.scss';
import { useAppSelector } from "../../../../app/store";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { getImgSrc } from "../../../../shared/service/images";
import { AuthorCreationCard } from "../../../../entities/author/ui";
import Favourites from "../../../../fetures/favourites";

const ImageWindow: FC = () => {
  const { image } = useAppSelector(state => state.modalWindow);

  return (
    <div className="regular-panel image-window">
      {!image ? (
        <div>Holy shit</div>
      ) : (
        <>
          <div className="main">
            <div className="left">
              <button
                className="turn-button left-button white"
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
              >
                <AiOutlineDoubleRight size={55} />
              </button>
            </div>
            <div className="right">
              <div className="header">
                <AuthorCreationCard
                  author={image.author}
                  createdAt={image.createdAt}
                />
              </div>
              <div className="like-repost-section">
                <Favourites.Actions.ImageLike image={image} />
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
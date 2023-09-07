import { FC } from "react"
import { Image } from "../../entities/image/model"
import { AiOutlinePlus } from "react-icons/ai"
import LoadErrorHandler from "../../shared/loadErrorHandler";
import './styles.scss';
import { useAppDispatch, useAppSelector } from "../../app/store";
import { WindowTypes, setWindow } from "../modalWindow/model/redux";
import { BsEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";


interface ImagesFeedProps {
  images: Image[] | undefined,
  isLoading: boolean,
  isError: boolean,
}

const ImagesFeed: FC<ImagesFeedProps> = ({ images, isLoading, isError }) => {

  const { user } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getImgSrc = (image: Image) => {
    const backUrl = process.env.REACT_APP_BACK_URL;
    let imageSrc: string;
    if (backUrl) {
      imageSrc = backUrl + image.value;
    } else {
      imageSrc = 'https://i.pinimg.com/736x/b8/64/a5/b864a5224eccc107594cf2f5a84b6af8--peter-griffin-family-guy.jpg';
    }
    return imageSrc;
  }

  return (
    <div className="images-feed regular-panel">
      <LoadErrorHandler 
        isError={isError}
        isLoading={isLoading}
        data={images}
      >
        {!images?.length ? (
          <div className="no-images">
            <p>Here you can keep your images</p>
            <button
              className="add-image light-back"
              onClick={() => dispatch(setWindow({window: WindowTypes.ADD_USER_IMAGE}))}
            >
              <AiOutlinePlus size={25} />
            </button>
          </div>
        ) : (
          <div className="yes-images">
            <div className="images">
              {images.map((image, index) => (
                <img 
                  key={index}
                  src={getImgSrc(image)}
                  alt="IMG"
                  className="image"
                />
              ))}
            </div>
            <button
              className="light-back add-image"
              onClick={() => dispatch(setWindow({window: WindowTypes.ADD_USER_IMAGE}))}
            >
              Add Image
            </button>
            <div className="watch-button-container">
              <button 
                className="watch inherit-to-green"
                onClick={() => navigate('/userAlbum/' + user?.id)}
              >
                <BsEyeFill size={45} />
              </button>
            </div>
          </div>
        )}

      </LoadErrorHandler>
    </div>
  )
}

export default ImagesFeed;
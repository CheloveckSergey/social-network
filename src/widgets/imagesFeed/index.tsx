import { FC } from "react"
import { Image } from "../../entities/image/model"
import { AiOutlinePlus } from "react-icons/ai"
import LoadErrorHandler from "../../shared/loadErrorHandler";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { WindowTypes, setWindow } from "../modalWindow/model/redux";
import { BsEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import './styles.scss';
import { OneUser } from "../../entities/user";


interface ImagesFeedProps {
  images: Image[] | undefined,
  isLoading: boolean,
  isError: boolean,
  allowToAdd: boolean,
  userId: number,
}

const ImagesFeed: FC<ImagesFeedProps> = ({ images, isLoading, isError, allowToAdd, userId }) => {

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
            {allowToAdd && <button
              className="add-image light-back"
              onClick={() => dispatch(setWindow({window: WindowTypes.ADD_USER_IMAGE}))}
            >
              <AiOutlinePlus size={25} />
            </button>}
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
            <div className="black-out button-container">
              <button 
                className="inherit-to-green"
                onClick={() => navigate('/userAlbum/' + userId)}
              >
                <BsEyeFill size={40} />
              </button>
              {allowToAdd && <button
                className="inherit-to-green"
                onClick={() => dispatch(setWindow({window: WindowTypes.ADD_USER_IMAGE}))}
              >
                <AiOutlinePlus size={40} />
              </button>}
            </div>
          </div>
        )}
      </LoadErrorHandler>
    </div>
  )
}

export default ImagesFeed;
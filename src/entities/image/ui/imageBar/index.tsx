import { FC } from "react";
import { BsEyeFill } from "react-icons/bs";
import { OneImage } from "../../model";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { useNavigate } from "react-router-dom";
import { SharedUi } from "../../../../shared/sharedUi";
import { WindowTypes, setWindow } from "../../../../widgets/modalWindow/model/redux";
import { AiOutlinePlus } from "react-icons/ai";
import { Helpers } from "../../../../shared/helpers";
import './styles.scss';

interface IBProps {
  images: OneImage[],
  isLoading: boolean,
  isError: boolean,
}
export const ImageBar: FC<IBProps> = ({ images, isLoading, isError }) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="images-feed regular-panel">
      <SharedUi.Helpers.LoadErrorHandler 
        isError={isError}
        isLoading={isLoading}
      >
        {!images.length ? (
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
                  src={Helpers.getImageSrc(image.value)}
                  alt="IMG"
                  className="image"
                />
              ))}
            </div>
            <div className="black-out button-container">
              <button 
                className="inherit-to-green"
                // onClick={() => navigate('/userAlbum/' + userId)}
              >
                <BsEyeFill size={40} />
              </button>
              {<button
                className="inherit-to-green"
                onClick={() => dispatch(setWindow({window: WindowTypes.ADD_USER_IMAGE}))}
              >
                <AiOutlinePlus size={40} />
              </button>}
            </div>
          </div>
        )}
      </SharedUi.Helpers.LoadErrorHandler>
    </div>
  )
}
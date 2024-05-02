import { FC, useState } from "react";
import { ImagesLib, OneImage } from "../../entities/image";
import { useAppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { SharedUi } from "../../shared/sharedUi";
import { WindowTypes, setWindow } from "../modalWindow/model/redux";
import { AiOutlinePlus } from "react-icons/ai";
import { Helpers } from "../../shared/helpers";
import { BsEyeFill } from "react-icons/bs";
import './styles.scss';
import { ModalWindows, UseModalWindow } from "../anotherModalWindow/ui";
import { ImagesActionsLib } from "../../fetures/images";

interface IBProps {
  authorId: number;
  onNavigateClick: () => void,
  canEdit: boolean,
}
export const ImagesPreview: FC<IBProps> = ({ authorId, onNavigateClick, canEdit }) => {

  const [showWindow, setShowWindow] = useState<boolean>(false);

  const {
    images,
    isLoading,
    isError,
    addImage,
  } = ImagesLib.useAlbumImages(authorId);

  const addImageStatus = ImagesActionsLib.useCreateALbumImage(authorId, addImage);

  const dispatch = useAppDispatch();

  return (
    <div className="images-feed regular-panel">
      <SharedUi.Helpers.LoadErrorHandler 
        isError={isError}
        isLoading={isLoading}
      >
        {(images?.length > 0) ? (
          <div className="yes-images">
            <div className="images">
              {images.slice(0, 3).map((image, index) => (
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
                onClick={onNavigateClick}
              >
                <BsEyeFill size={40} />
              </button>
            </div>
          </div>
        ) : (
          <div className="no-images">
            <p>No images yet</p>
            {canEdit && <button
              className="add-image light-back"
              onClick={() => setShowWindow(true)}
            >
              <AiOutlinePlus size={25} />
            </button>}
          </div>
        )}
      </SharedUi.Helpers.LoadErrorHandler>
      {canEdit && <UseModalWindow
        onClose={() => setShowWindow(false)}
        condition={showWindow}
      >
        <ModalWindows.AddImageWindow 
          addImage={(imageFile: File) => {
            addImageStatus.mutate({file: imageFile}).then(() => {
              setShowWindow(false);
              onNavigateClick();
            })
          }}
        />
      </UseModalWindow>}
    </div>
  )
}
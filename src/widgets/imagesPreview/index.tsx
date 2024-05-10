import { FC, useState } from "react";
import { ImagesLib, OneImage } from "../../entities/image";
import { SharedUi } from "../../shared/sharedUi";
import { AiOutlinePlus } from "react-icons/ai";
import { Helpers } from "../../shared/helpers";
import { BsEyeFill } from "react-icons/bs";
import './styles.scss';
import { ModalWindows, UseModalWindow } from "../anotherModalWindow/ui";
import { ImagesActionsLib } from "../../fetures/images";

interface IPProps {
  authorId: number | undefined;
  isLoading: boolean,
  isError: boolean,
  accepted: boolean,
  rejectionReason: string,
  onNavigateClick: () => void,
  canEdit: boolean,
}
export const ImagesPreview: FC<IPProps> = ({ 
  authorId, 
  isLoading, 
  isError, 
  accepted, 
  rejectionReason,
  onNavigateClick, 
  canEdit 
}) => {

  return (
    <div className="images-preview regular-panel">
      <SharedUi.Helpers.LoadErrorHandler 
        isLoading={isLoading || !authorId}
        isError={isError}
      >
        {accepted ? (
          <ImagesPreviewBody
            authorId={authorId!}
            onNavigateClick={onNavigateClick}
            canEdit={canEdit}
          />
        ) : (
          <SharedUi.Divs.Empty
            body={rejectionReason}
          />
        )}
      </SharedUi.Helpers.LoadErrorHandler>
    </div>
  )
}

interface IPBProps {
  authorId: number;
  onNavigateClick: () => void,
  canEdit: boolean,
}
export const ImagesPreviewBody: FC<IPBProps> = ({ authorId, onNavigateClick, canEdit }) => {

  const [showWindow, setShowWindow] = useState<boolean>(false);

  const {
    images,
    isLoading,
    isError,
    addImage,
  } = ImagesLib.useAlbumImages(authorId);

  const addImageStatus = ImagesActionsLib.useCreateALbumImage(authorId, addImage);

  function close() {
    setShowWindow(false);
  }

  return (
    <div className="images-feed">
      <SharedUi.Helpers.LoadErrorHandler
        isError={isError}
        isLoading={isLoading || !images}
      >
        {(images?.length) ? (
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
          createImageObject={{
            submit: async (imageFile: File) => {
              await addImageStatus.mutateAsync({ file: imageFile });
            },
            isLoading: addImageStatus.isLoading,
            isError: addImageStatus.isError,
          }}
          close={close}
        />
      </UseModalWindow>}
    </div>
  )
}
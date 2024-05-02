import { FC, useState } from "react"
import { OneAlbumImage, OneImage } from "../../model"
import './styles.scss';
import { SharedUi } from "../../../../shared/sharedUi";
import { ImageUi } from "..";
import { ModalWindows, UseModalWindow } from "../../../../widgets/anotherModalWindow/ui";
import { OneCreation } from "../../../creation";

interface ILProps {
  images: OneImage[],
  isLoading: boolean,
  isError: boolean,
  albumId: number,
  renderCommentsWidget: (creation: OneCreation) => React.ReactNode | React.ReactNode[],
  createImageObject?: {
    create: (imageFile: File, albumId?: number) => Promise<any>,
    isLoading: boolean,
    isError: boolean,
  },
  renderImageActions: (image: OneImage) => React.ReactNode[],
  renderExtraActions: (image: OneImage) => {
    body: string,
    isLoading: boolean,
    isError: boolean,
    onClick: () => void,
  }[], 
}
export const ImagesList: FC<ILProps> = ({
  images, 
  isLoading, 
  isError, 
  albumId, 
  renderCommentsWidget,
  createImageObject,
  renderImageActions,
  renderExtraActions,
}) => {

  const [showAddImageWindow, setShowAddImageWindow] = useState<boolean>(false);
  const [curImageIndex, setCurImageIndex] = useState<number>(0);

  return (
    <div className="images-list">
      <SharedUi.Helpers.LoadErrorHandler 
        isLoading={isLoading}
        isError={isError}
      >
        {images ? (
          <>
            {images.map((image, index) => <ImageUi.ImageCard 
              key={index}
              image={image}
              images={images}
              index={index}
              curImageIndex={curImageIndex}
              setCurImageIndex={setCurImageIndex}
              renderActions={renderImageActions}
              imageClass="image-size"
              renderComments={renderCommentsWidget}
              extraActions={renderExtraActions(image)}
            />)}
            {createImageObject && <button
              className="image-size add-image-card gray-to-light-back"
              onClick={() => {
                setShowAddImageWindow(true);
              }}
            >
              +
            </button>}
          </>
        ) : (
          <SharedUi.Divs.Empty 
            body="There's no images cause something"
          />
        )}
      </SharedUi.Helpers.LoadErrorHandler>
      {createImageObject && <UseModalWindow
        condition={showAddImageWindow}
        onClose={() => {
          setShowAddImageWindow(false);
        }}
      >
        <ModalWindows.AddImageWindow
          addImage={(fileImage: File) => {
            createImageObject.create(fileImage, albumId)
            .then(() => setShowAddImageWindow(false));
          }}
        />
      </UseModalWindow>}
    </div>
  )
}
import { FC, useState } from "react"
import { OneAlbumImage, OneImage } from "../../model"
import './styles.scss';
import { SharedUi } from "../../../../shared/sharedUi";
import { ImageUi } from "..";
import { ModalWindows, UseModalWindow } from "../../../../widgets/anotherModalWindow/ui";
import { ImageWindow } from "../../../../widgets/imageWindow";

interface ILProps {
  images: OneImage[],
  isLoading: boolean,
  isError: boolean,
  albumId: number,
  addImage: (image: OneAlbumImage) => void,
  renderImage: (image: OneImage, index: number) => React.ReactNode | React.ReactNode[],
}
export const ImagesList: FC<ILProps> = ({images, isLoading, isError, albumId, addImage, renderImage }) => {

  // const [curImageIndex, setCurImageIndex] = useState<number>(0);
  const [showAddImageWindow, setShowAddImageWindow] = useState<boolean>(false);

  return (
    <div className="images-list">
      <SharedUi.Helpers.LoadErrorHandler 
        isLoading={isLoading}
        isError={isError}
      >
        {images ? (
          <>
            {images.map(renderImage)}
            <button
              className="image-class add-image-card gray-to-light-back"
              onClick={() => {
                setShowAddImageWindow(true);
              }}
            >
              +
            </button>
          </>
        ) : (
          <SharedUi.Divs.Empty 
            body="There's no images cause something"
          />
        )}
      </SharedUi.Helpers.LoadErrorHandler>
      <UseModalWindow
        condition={showAddImageWindow}
        onClose={() => {
          setShowAddImageWindow(false);
        }}
      >
        <ModalWindows.AddImageWindow
          albumId={albumId}
          addImage={addImage}
          onClose={() => {
            setShowAddImageWindow(false);
          }}
        />
      </UseModalWindow>
    </div>
  )
}
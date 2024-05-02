import { FC, useState } from "react"
import './styles.scss';
import { OneImage } from "../../model";
import { Helpers } from "../../../../shared/helpers";
import { UseModalWindow } from "../../../../widgets/anotherModalWindow/ui";
import { SharedUi } from "../../../../shared/sharedUi";
import { ImageUi } from "..";
import { OneCreation } from "../../../creation";

interface ImageCardProps {
  image: OneImage,
  images: OneImage[],
  index: number,
  curImageIndex: number,
  setCurImageIndex: (index: number) => void,
  imageClass: string,
  renderActions: (image: OneImage) => React.ReactNode[],
  renderComments: (creation: OneCreation) => React.ReactNode,
  extraActions: {
    body: string,
    isLoading: boolean,
    isError: boolean,
    onClick: () => void,
  }[],
}

export const ImageCard: FC<ImageCardProps> = ({ 
  image, 
  images, 
  index, 
  imageClass, 
  curImageIndex, 
  setCurImageIndex, 
  renderActions, 
  renderComments, 
  extraActions 
}) => {

  const [showImageWindow, setShowImageWindow] = useState<boolean>(false);

  function previousImage() {
    if (curImageIndex === 0) {
      return;
    }
    setCurImageIndex(curImageIndex - 1);
  }

  function nextImage() {
    if (curImageIndex === images.length - 1) {
      return;
    }
    console.log('lalala');
    setCurImageIndex(curImageIndex + 1);
  }

  //Модальное окно по-нормальному не работает, если поставить его в image-card-container
  return (
    <>
      <div 
        className="image-card-container"
      >
        <img
          src={Helpers.getImageSrc(image.value)} 
          alt="IMG"
          className={`image ${imageClass}`}
          onClick={() => {
            setCurImageIndex(index);
            setShowImageWindow(true);
          }}
        />
        <div className="right-up">
          <SharedUi.Buttons.ExtraActionsDotButton
            buttons={extraActions.map((action, index) => <SharedUi.Buttons.ExtraActionLine 
              body={action.body}
              isLoading={action.isLoading}
              isError={action.isError}
              onClick={action.onClick}
            />)}
          />
        </div>
      </div>
      <UseModalWindow 
        condition={showImageWindow}
        onClose={() => setShowImageWindow(false)}
      >
        <ImageUi.ImageWindow
          images={images}
          curImageIndex={curImageIndex}
          setCurImageIndex={setCurImageIndex}
          previousImage={previousImage}
          nextImage={nextImage}
          renderActions={renderActions}
          renderComments={renderComments}
        />
      </UseModalWindow>
    </>
  )
}
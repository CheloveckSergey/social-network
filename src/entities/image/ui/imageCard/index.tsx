import { FC, useState } from "react"
import './styles.scss';
import { OneImage } from "../../model";
import { Helpers } from "../../../../shared/helpers";
import { UseModalWindow } from "../../../../widgets/anotherModalWindow/ui";
import { ImageWindow } from "../../../../widgets/imageWindow";
import { SharedUi } from "../../../../shared/sharedUi";
import { FaCommentDots } from "react-icons/fa";
import { ImageUi } from "..";

interface ImageCardProps {
  image: OneImage,
  images: OneImage[],
  index: number,
  curImageIndex: number,
  setCurImageIndex: (index: number) => void,
  imageClass: string,
  actions: React.ReactNode[],
  renderComments: React.ReactNode,
}

export const ImageCard: FC<ImageCardProps> = ({ image, images, index, imageClass, curImageIndex, setCurImageIndex, actions, renderComments }) => {

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
        onClick={() => {
          setCurImageIndex(index);
          setShowImageWindow(true);
        }}
      >
        <img
          src={Helpers.getImageSrc(image.value)} 
          alt="IMG"
          className={`image ${imageClass}`}
        />
        <div className="cover">
          <div className="right-up">
            <SharedUi.Buttons.ExtraButton
              Icon={FaCommentDots}
            >

            </SharedUi.Buttons.ExtraButton>
          </div>
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
          actions={actions}
          renderComments={renderComments}
        />
      </UseModalWindow>
    </>
  )
}
import { FC, useState } from "react"
import './styles.scss';
import { OneImage } from "../../model";
import { Helpers } from "../../../../shared/helpers";
import { UseModalWindow } from "../../../../widgets/anotherModalWindow/ui";
import { ImageWindow } from "../../../../widgets/imageWindow";

interface ImageCardProps {
  image: OneImage,
  index: number,
  images: OneImage[],
  curImageIndex: number,
  setCurImageIndex: (index: number) => void,
  imageClass: string,
  setIsLiked: (imageCardId: number, isLiked: boolean) => void,
}

export const ImageCard: FC<ImageCardProps> = ({ image, index, images, imageClass, curImageIndex, setCurImageIndex, setIsLiked }) => {

  const [showImageWindow, setShowImageWindow] = useState<boolean>(false);

  // const image = images[curImageIndex];

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
    setCurImageIndex(curImageIndex + 1);
  }

  return (
    <>
      <img
        src={Helpers.getImageSrc(image.value)} 
        alt="IMG"
        className={`image ${imageClass}`}
        onClick={() => {
          setCurImageIndex(index);
          setShowImageWindow(true);
        }}
      />
      <UseModalWindow 
        condition={showImageWindow}
        onClose={() => setShowImageWindow(false)}
      >
        <ImageWindow 
          images={images}
          curImageIndex={curImageIndex}
          setCurImageIndex={setCurImageIndex}
          setImageLiked={setIsLiked}
          previousImage={previousImage}
          nextImage={nextImage}
        />
      </UseModalWindow>
    </>
  )
}
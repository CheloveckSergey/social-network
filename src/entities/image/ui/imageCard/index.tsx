import { FC, useState } from "react"
import './styles.scss';
import { OneImage } from "../../model";
import { Helpers } from "../../../../shared/helpers";
import { UseModalWindow } from "../../../../widgets/anotherModalWindow/ui";
import { ImageWindow } from "../../../../widgets/imageWindow";

interface ImageCardProps {
  images: OneImage[],
  curImageIndex: number,
  setCurImageIndex: (index: number) => void,
  imageClass: string,
}

export const ImageCard: FC<ImageCardProps> = ({ images, imageClass, curImageIndex, setCurImageIndex }) => {

  const [showImageWindow, setShowImageWindow] = useState<boolean>(false);

  return (
    <>
      <img
        src={Helpers.getImageSrc(images[curImageIndex].value)} 
        alt="IMG"
        className={`image ${imageClass}`}
        onClick={() => setShowImageWindow(true)}
      />
      <UseModalWindow 
        condition={showImageWindow}
        onClose={() => setShowImageWindow(false)}
      >
        <ImageWindow 
          images={images}
          curImageIndex={curImageIndex}
          setCurImageIndex={setCurImageIndex}
        />
      </UseModalWindow>
    </>
  )
}
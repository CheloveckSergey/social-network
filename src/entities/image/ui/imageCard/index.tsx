import { FC, useState } from "react"
import './styles.scss';
import { OneImage } from "../../model";
import { useAppDispatch } from "../../../../app/store";
import { setImageWindow } from "../../../../widgets/modalWindow/model/redux";
import { Helpers } from "../../../../shared/helpers";
import { createPortal } from "react-dom";
import AnotherModalWindow from "../../../../widgets/anotherModalWindow/ui";
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
      {showImageWindow && createPortal(<AnotherModalWindow 
        onClose={() => {setShowImageWindow(false)}} 
      >
        <ImageWindow 
          images={images}
          curImageIndex={curImageIndex}
          setCurImageIndex={setCurImageIndex}
        />
      </AnotherModalWindow>, document.getElementById('App')!)}
    </>
  )
}
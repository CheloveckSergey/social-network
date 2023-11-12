import { FC } from "react"
import './styles.scss';
import { OneImage } from "../model";
import { useAppDispatch } from "../../../app/store";
import { setImageWindow } from "../../../widgets/modalWindow/model/redux";
import { Helpers } from "../../../shared/helpers";

interface ImageCardProps {
  images: OneImage[],
  imageClass: string,
  index: number
}

const ImageCard: FC<ImageCardProps> = ({ images, imageClass, index }) => {

  const dispatch = useAppDispatch();

  return (
    <>
      <img
        src={Helpers.getImageSrc(images[index].value)} 
        alt="IMG"
        className={`image ${imageClass}`}
        onClick={() => dispatch(setImageWindow({images, curImageIndex: index}))}
      />
    </>
  )
}

export const ImageUi = {
  ImageCard,
}
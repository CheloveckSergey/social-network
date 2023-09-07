import { FC } from "react"
import './styles.scss';
import { Image } from "../model";
import { getImgSrc } from "../../../shared/service/images";
import { useAppDispatch } from "../../../app/store";
import { setImageWindow } from "../../../widgets/modalWindow/model/redux";

interface ImageCardProps {
  images: Image[],
  imageClass: string,
  index: number
}

export const ImageCard: FC<ImageCardProps> = ({ images, imageClass, index }) => {

  const dispatch = useAppDispatch();

  return (
    <>
      <img 
        src={getImgSrc(images[index])} 
        alt="IMG"
        className={`image ${imageClass}`}
        onClick={() => dispatch(setImageWindow({images, curImageIndex: index}))}
      />
    </>
  )
}
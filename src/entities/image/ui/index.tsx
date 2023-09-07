import { FC } from "react"
import './styles.scss';
import { Image } from "../model";
import { getImgSrc } from "../../../shared/service/images";
import { useAppDispatch } from "../../../app/store";
import { setImageWindow } from "../../../widgets/modalWindow/model/redux";

interface ImageCardProps {
  image: Image,
  imageClass: string,
}

export const ImageCard: FC<ImageCardProps> = ({ image, imageClass }) => {

  const dispatch = useAppDispatch();

  return (
    <>
      <img 
        src={getImgSrc(image)} 
        alt="IMG"
        className={`image ${imageClass}`}
        onClick={() => dispatch(setImageWindow({image}))}
      />
    </>
  )
}
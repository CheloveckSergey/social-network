import { FC, useState } from "react"
import { OneImage } from "../../model"
import './styles.scss';
import { SharedUi } from "../../../../shared/sharedUi";
import { ImageUi } from "..";

interface ILProps {
  images: OneImage[],
  isLoading: boolean,
  isError: boolean,
  setIsLiked: (imageId: number, isLiked: boolean) => void,
}
export const ImagesList: FC<ILProps> = ({images, isLoading, isError, setIsLiked }) => {

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
              index={index}
              imageClass="image-class"
              image={image}
              images={images}
              curImageIndex={curImageIndex}
              setCurImageIndex={setCurImageIndex}
              setIsLiked={setIsLiked}
            />)}
            <button
              className="image-class add-image-card gray-to-light-back"
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
    </div>
  )
}
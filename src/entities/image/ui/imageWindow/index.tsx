import { FC } from 'react';
import { OneImage } from '../..';
import './styles.scss';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { Helpers } from '../../../../shared/helpers';
import { AuthorUi } from '../../../author';
import { OneCreation } from '../../../creation';

interface ISProps {
  image: OneImage,
  curImageIndex: number,
  setCurImageIndex: (index: number) => void,
  previousImage: () => void,
  nextImage: () => void,
}
const ImageSection: FC<ISProps> = ({ image, curImageIndex, setCurImageIndex, previousImage, nextImage }) => {

  const curImage: OneImage = image;

  return (
    <div className="left">
      <button
        className="turn-button left-button white"
        onClick={() => previousImage()}
      >
        <AiOutlineDoubleLeft size={55} />
      </button>
      <img 
        src={Helpers.getImageSrc(curImage.value)} 
        alt="IMG"
        className="image-image"
      />
      <button
        className="turn-button right-button white"
        onClick={() => nextImage()}
      >
        <AiOutlineDoubleRight size={55} />
      </button>
    </div>
  )
}

interface IWProps {
  images: OneImage[],
  curImageIndex: number,
  setCurImageIndex: (index: number) => void,
  previousImage: () => void,
  nextImage: () => void,
  renderActions: (image: OneImage) => React.ReactNode | React.ReactNode[],
  renderComments: (creation: OneCreation) => React.ReactNode,
}
export const ImageWindow: FC<IWProps> = ({ 
  images, 
  curImageIndex, 
  setCurImageIndex, 
  nextImage, 
  previousImage, 
  renderActions, 
  renderComments 
}) => {

  const image = images[curImageIndex];

  return (
    <div className="regular-panel image-window">
      <div className="main">
        <ImageSection 
          image={image}
          curImageIndex={curImageIndex}
          setCurImageIndex={setCurImageIndex} 
          nextImage={nextImage}
          previousImage={previousImage}
        />
        <div className="right">
          <div className="header">
            <AuthorUi.AuthorCard
              author={image.creation.author}
              createdAt={image.creation.createdAt}
            />
          </div>
          <div className="like-repost-section">
            {renderActions(image)}
          </div>
          <div className="comments-section">
            {renderComments(image.creation)}
          </div>
        </div>
      </div>
      <div className="bottom">

      </div>
    </div>
  )
}
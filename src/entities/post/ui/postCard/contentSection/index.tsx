import { FC, useState, MouseEvent } from "react";
import { BsFillCircleFill, BsFillRecordCircleFill } from "react-icons/bs";
import './styles.scss';
import { OneImage } from "../../../../image";
import { MyMusic } from "../../../../music";
import { useAppSelector } from "../../../../../app/store";

interface CSProps {
  description: string | undefined,
  images: OneImage[],
  musics: MyMusic[],
  renderMusicList: React.ReactNode | React.ReactNode,
  renderPostImage: (
    image: OneImage, 
    images: OneImage[],
    curImageIndex: number,
    setCurIndex: (index: number) => void,
  ) => React.ReactNode | React.ReactNode[],
} 
export const ContentSection: FC<CSProps> = ({ description, images, musics, renderMusicList, renderPostImage }) => {

  const { user } = useAppSelector(state => state.user);

  const [curImageIndex, setCurImageIndex] = useState<number>(0);

  return (
    <div className="body">
      <p className="description">{description}</p>
      <div className="post-images">
        {images && (images.length > 0) && <div className="images">
          {(images.length > 1) ? (
            <div>
              {renderPostImage(
                images[curImageIndex],
                images,
                curImageIndex,
                setCurImageIndex
              )}
              <div className="indexes">
                {images.map((image, index) => <button
                  key={index}
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    setCurImageIndex(index);
                  }}
                >
                  {(index === curImageIndex) ? (
                    <BsFillCircleFill size={15} style={{color: 'green'}} />
                  ) : (
                    <BsFillRecordCircleFill size={15} style={{color: 'gray'}} />
                  )}
                </button>)}
              </div>
            </div>
          ) : (
            <div>
              {renderPostImage(
                images[0],
                images,
                curImageIndex,
                setCurImageIndex
              )}
            </div>
          )}
        </div>}
      </div>
      {musics?.length > 0 && <div className="post-music">
        {renderMusicList}
      </div>}
    </div>
  )
}
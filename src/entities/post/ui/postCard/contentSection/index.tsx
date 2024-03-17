import { FC, useState, MouseEvent } from "react";
import { BsFillCircleFill, BsFillRecordCircleFill } from "react-icons/bs";
import './styles.scss';
import { ImageUi, OneImage } from "../../../../image";
import { MusicUi } from "../../../../music/ui";
import { MyMusic } from "../../../../music";
import { MusicFeaturesUi } from "../../../../../fetures/music";
import { useAppSelector } from "../../../../../app/store";

interface CSProps {
  description: string | undefined,
  images: OneImage[],
  setImageLiked: (postImageId: number, isLiked: boolean) => void,
  musics: MyMusic[],
  renderAddMusicButton: (music: MyMusic) => React.ReactNode | React.ReactNode[],
} 
export const ContentSection: FC<CSProps> = ({ description, images, setImageLiked, musics, renderAddMusicButton }) => {

  const { user } = useAppSelector(state => state.user);

  const [curImageIndex, setCurImageIndex] = useState<number>(0);

  return (
    <div className="body">
      <p className="description">{description}</p>
      <div className="post-images">
        {images && (images.length > 0) && <div className="images">
          {(images.length > 1) ? (
            <div>
              <ImageUi.ImageCard 
                image={images[curImageIndex]}
                index={curImageIndex}
                images={images}
                imageClass="post-image"
                curImageIndex={curImageIndex}
                setCurImageIndex={setCurImageIndex}
                setIsLiked={setImageLiked}
              />
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
              <ImageUi.ImageCard 
                imageClass="post-image"
                curImageIndex={0}
                index={0}
                image={images[0]}
                images={images}
                setCurImageIndex={setCurImageIndex}
                setIsLiked={setImageLiked}
              />
            </div>
          )}
        </div>}
      </div>
      {musics?.length > 0 && <div className="post-music">
        <MusicUi.MusicList
          musics={musics}
          isError={false}
          isLoading={false}
          renderMusicLine={(music: MyMusic, index: number) => <MusicUi.MusicLine 
            music={music}
            playPauseButton={<MusicFeaturesUi.PlayPauseMusicButton 
              music={music}
              musics={musics}
              index={index}
            />}
            rightButtons={[
              (user ? (
                renderAddMusicButton(music)
              ) : (
                <></>
              ))
            ]}
          />}
        />
      </div>}
    </div>
  )
}
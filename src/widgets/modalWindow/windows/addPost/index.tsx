import { ChangeEvent, FC, FormEvent, ReactNode, useEffect, useRef, useState, MouseEvent } from "react";
import { PostApi } from "../../../../entities/post/api";
import './styles.scss';
import { useAppSelector } from "../../../../app/store";
import { BiImageAdd, BiSolidVideos } from "react-icons/bi";
import { BsFileEarmarkMusic, BsFillCircleFill, BsFillRecordCircleFill } from "react-icons/bs";
import { useQuery } from "react-query";
import { MusicsLib } from "../../../../entities/music/lib";
import { MusicUi } from "../../../../entities/music/ui";
import { Music } from "../../../../entities/music";
import { MusicFeaturesLib, MusicFeaturesUi } from "../../../../fetures/music";
import { IoIosAdd } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

interface MSProps {
  authorId: number,
  addMusic: (musicId: number) => void,
  isAdded: (musicId: number) => boolean,
  deleteMusic: (musicId: number) => void,
}
const MusicSection: FC<MSProps> = ({ authorId, addMusic, isAdded, deleteMusic }) => {

  const {
    musics,
    isLoading,
    isError,
  } = MusicsLib.useAddedMusic(authorId);

  return (
    <div
      className="musics-section"
    >
      <MusicUi.MusicList
        musics={musics}
        isLoading={isLoading}
        isError={isError}
        renderMusicLine={(music: Music, index: number) => <MusicUi.MusicLine 
          key={index}
          music={music}
          playPauseButton={<MusicFeaturesUi.PlayPauseMusicButton  
            music={music}
            musics={musics}
            index={index}
          />}
          rightButtons={[
            (isAdded(music.id) ? (
              <button
                className="delete-music-button white"
                onClick={() => {
                  deleteMusic(music.id);
                }}
              >
                <FaCheck size={15} />
              </button>
            ) : (
              <button
                className="add-music-button white"
                onClick={() => {
                  addMusic(music.id);
                }}
              >
                <IoIosAdd size={35} />
              </button>
            ))
            
          ]}
        />}
      />
    </div>
  )
}

export const AddPostWindow: FC = ({  }) => {

  const { author } = useAppSelector(state => state.modalWindow);

  const [images, setImages] = useState<File[]>([]);
  const [description, setDescription] = useState<string | undefined>('');

  const [curImageIndex, setCurImageIndex] = useState<number>(0);

  const [showMyMusics, setShowMyMusics] = useState<boolean>(false);
  const [toAddMusics, setToAddMusics] = useState<number[]>([]);

  function addMusic(musicId: number) {
    console.log('addMusic');
    setToAddMusics(prev => [...prev, musicId]);
  }

  function deleteMusic(musicId: number) {
    const newMusics: number[] = toAddMusics.filter(_musicId => {
      if (_musicId !== musicId) {
        return true;
      } else {
        return false;
      }
    });
    setToAddMusics(newMusics);
  }

  function isAdded(musicId: number): boolean {
    const music = toAddMusics.find(_musicId => _musicId === musicId);
    return music ? true : false;
  }

  const formRef= useRef<HTMLFormElement>(null);

  const { isLoading, refetch } = useQuery(
    ['addPost'],
    () => {
      if (author) {
        if (formRef.current) {
          const formData = new FormData(formRef.current);
          images.forEach((image, index) => formData.append('img', image))
          toAddMusics.forEach(musicId => formData.append('musicIds[]', String(musicId)));
          // formData.append('musicIds[]', JSON.stringify(toAddMusics));
          return PostApi.createPost(formData);
        }
      }
    },
    {
      enabled: false,
      onSuccess: () => {
        window.location.reload();
      },
    }
  )

  if (!author) {
    return (
      <div className="window">
        Сук, нет автора
      </div>
    )
  }

  return (
    <div className="window add-post-window">
      <div className="header section">
        <h3>Add Post</h3>
      </div>
      <hr/>
      <div className="main section">
        <form
          ref={formRef} 
          onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          <label className="description-label">
            <textarea
              className="description"
              name="description" 
              value={description} 
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            />
          </label>
          <div className="post-images">
            {images && (images.length > 0) && <div className="images">
              {(images.length > 1) ? (<div>
                <img 
                  className="post-image"
                  src={URL.createObjectURL(images[curImageIndex])} 
                  alt="IMG" 
                />
                <div className="indexes">
                  {images.map((image, index) => <button
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
              </div>) : (<div>
                <img 
                  className="post-image"
                  // src={`${images[0]}`} 
                  src={URL.createObjectURL(images[curImageIndex])}
                  alt="IMG" 
                />
              </div>)}
            </div>}
          </div>
          <label style={{display: "none"}}>
            <input 
              readOnly={true}
              type="text"
              name="authorId"
              value={author.id}
            />
          </label>
          {showMyMusics && <MusicSection 
            authorId={author.id}
            addMusic={addMusic}
            isAdded={isAdded}
            deleteMusic={deleteMusic}
          />}
        </form>
      </div>
      <div className="bottom section">
        <div className="options">
          <label>
            <input 
              className="img"
              type="file" 
              multiple={true}
              name={'img'} 
              style={{display: 'none'}}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (!e.target.files) {
                  return;
                }
                const files = e.target.files;
                setImages([...images, files[0]])
                console.log(files);
                const fileReader = new FileReader();
                fileReader.onload = function() {
                  // setImages([...images, fileReader.result]);
                  // console.log(fileReader.result);
                  //Из-за того, что images меняются после этого скрипта
                  //нужно ставить текущий индекс на единицу больше,
                  //чем последний существующий индекс
                  setCurImageIndex(images.length);
                  
                }
                if (e.target.files) {
                  fileReader.readAsDataURL(e.target.files[0]);
                }
              }}
            />
            <span 
              className="gray-to-white"
            >
              <BiImageAdd size={25} />
            </span>
          </label>
          <button className="white">
            <BiSolidVideos size={25} />
          </button>
          <button 
            className="white"
            onClick={() => {
              setShowMyMusics(!showMyMusics)
            }}
          >
            <BsFileEarmarkMusic size={25} />
          </button>
        </div>
        <button
          className="load-button white-back"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            refetch();
          }}
        >
          Load
        </button>
      </div>
    </div>
  )
}
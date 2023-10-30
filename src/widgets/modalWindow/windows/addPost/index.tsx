import { ChangeEvent, FC, FormEvent, ReactNode, useEffect, useRef, useState, MouseEvent } from "react";
import { PostApi } from "../../../../entities/post/api";
import './styles.scss';
import MyImgLabel from "../../../../shared/myImgLabel";
import AddWindowType from "../../types/addType";
import { useAppSelector } from "../../../../app/store";
import { BiImageAdd, BiSolidVideos } from "react-icons/bi";
import { BsCircle, BsFileEarmarkMusic, BsFillCircleFill, BsFillRecordCircleFill } from "react-icons/bs";
import { useQuery } from "react-query";


interface AddPostProps {

}

export const AddPostWindow: FC<AddPostProps> = ({  }) => {

  const { author } = useAppSelector(state => state.modalWindow);

  const [images, setImages] = useState<File[]>([]);
  const [description, setDescription] = useState<string | undefined>('');

  const [curImageIndex, setCurImageIndex] = useState<number>(0);

  const formRef= useRef<HTMLFormElement>(null);

  const { isLoading, refetch } = useQuery(
    ['addPost'],
    () => {
      if (author) {
        if (formRef.current) {
          const formData = new FormData(formRef.current);
          images.forEach((image, index) => formData.append('img', image))
          return PostApi.createPost(formData);
        }
      }
    },
    {
      enabled: false,
      onSuccess: () => {
        window.location.reload();
      },
      // onError: () => setMessage('Нихуя не загружено как же блять заебало'),
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
                  // src={`${images[curImageIndex]}`} 
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
              type="text"
              name="authorId"
              value={author.id}
            />
          </label>
        </form>
      </div>
      <div className="bottom section">
        <div className="options">
          <label>
            <input className="img"
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
          <button className="white">
            <BsFileEarmarkMusic size={25} />
          </button>
          {/* <label style={{display: "none"}}>
            <input 
              type="text"
              name="userId"
              value={author.id}
            />
          </label> */}
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
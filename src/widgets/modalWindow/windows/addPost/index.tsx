import { ChangeEvent, FC, FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { PostApi } from "../../../../entities/post/api";
import './styles.scss';
import MyImgLabel from "../../../../shared/myImgLabel";
import AddWindowType from "../../types/addType";
import { useAppSelector } from "../../../../app/store";


interface AddPostProps {

}

export const AddPostWindow: FC<AddPostProps> = ({  }) => {

  const { author } = useAppSelector(state => state.modalWindow);

  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [description, setDescription] = useState<string | undefined>('');

  if (!author) {
    return (
      <div className="window">
        Сук, нет автора
      </div>
    )
  }

  return (
    <AddWindowType
      header="Add Post"
      queryName="addGroup"
      apiFunction={PostApi.createPost}
      inputs={[image, description]}
      enabledCondition={description || image ? true : false}
      formClassName="add-post-window"
    >
      <MyImgLabel 
        image={image}
        setImage={setImage}
        name='img'
      />
      <label className="description-label">
        <p>Enter description</p>
        <textarea 
          name="description" 
          value={description} 
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
        />
      </label>
      <label style={{display: "none"}}>
        <input 
          type="text"
          name="authorId"
          value={author.id}
        />
      </label>
    </AddWindowType>
  )
}
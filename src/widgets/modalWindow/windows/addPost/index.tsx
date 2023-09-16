import { ChangeEvent, FC, FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { PostApi } from "../../../../entities/post/api";
import './styles.scss';
import MyImgLabel from "../../../../shared/myImgLabel";
import AddWindowType from "../../types/addType";
import { AxiosResponse } from "axios";


interface AddPostProps {
  apiFunction: (formData: FormData) => Promise<AxiosResponse<any, any>>,
  children: ReactNode | ReactNode[],
}

const AddPostWindow: FC<AddPostProps> = ({ apiFunction, children }) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [description, setDescription] = useState<string | undefined>('');

  return (
    <AddWindowType
      header="Add Post"
      queryName="addGroup"
      apiFunction={apiFunction}
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
      {children}
    </AddWindowType>
  )
}

export const AddUserPostWindow: FC = () => {

  return (
    <AddPostWindow
      apiFunction={PostApi.createPostUser}
    >

    </AddPostWindow>
  )
}

function getGroupNameFromUrl() {
  const tralala = window.location.href;
  const regexp = /\/groups\/\w+/;
  const lol = tralala.match(regexp);
  let groupName;
  if (lol) {
    groupName = lol[0].slice(8);
  }
  return groupName;
}

export const AddGroupPostWindow: FC = () => {
  const groupName = getGroupNameFromUrl();

  const [_groupName, setGroupName] = useState<string | undefined>(groupName);

  return (
    <AddPostWindow
      apiFunction={PostApi.createGroupPost}
    >
      <label style={{display: "none"}}>
        <input 
          type="text"
          name="groupName"
          value={_groupName}
        />
      </label>
    </AddPostWindow>
  )
}
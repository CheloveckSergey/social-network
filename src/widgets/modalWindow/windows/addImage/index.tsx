import { useState } from "react";
import MyImgLabel from "../../../../shared/myImgLabel"
import AddWindowType from "../../types/addType"
import ImageApi from "../../../../entities/image/api";

export const AddUserImageWindow = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  return (
    <AddWindowType
      queryName="loadGroupAvatar"
      inputs={[image]}
      apiFunction={ImageApi.createByUserId}
      enabledCondition={image ? true : false}
    >
      <MyImgLabel 
        image={image}
        setImage={setImage}
        name="img"
      />
    </AddWindowType>
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

export const AddGroupImageWindow = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const groupName = getGroupNameFromUrl();

  const [_groupName, setGroupName] = useState<string | undefined>(groupName);

  return (
    <AddWindowType
      queryName="loadGroupAvatar"
      inputs={[image]}
      apiFunction={ImageApi.createByUserId}
      enabledCondition={image ? true : false}
    >
      <MyImgLabel 
        image={image}
        setImage={setImage}
        name="img"
      />
      <label style={{display: "none"}}>
        <input 
          type="text"
          name="groupName"
          value={_groupName}
        />
      </label>
    </AddWindowType>
  )
}
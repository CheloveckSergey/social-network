import { ChangeEvent, useState } from "react";
import MyImgLabel from "../../../../shared/myImgLabel"
import AddWindowType from "../../types/addType"
import { ImageApi } from "../../../../entities/image";
import './styles.scss';
import { ImagesActions, ImagesActionsLib } from "../../../../fetures/images";
import { useAppSelector } from "../../../../app/store";

export const AddUserImageWindow = () => {
  const { user } = useAppSelector(state => state.user);

  const [image, setImage] = useState<File>();

  const {
    mutate
  } = ImagesActionsLib.useCreateALbumImage(user!.author.id);

  function getImageFromFile(image: File | undefined): string {
    if (image) {
      return URL.createObjectURL(image);
    } else {
      return 'https://sun9-71.userapi.com/c604520/u329319273/video/y_13590500.jpg';
    }
  }

  return (
    <div className="window add-image-window">
      <div className="header section">
        <h3>Add Image</h3>
      </div>
      <hr/>
      <div className="main section">
        <img 
          src={getImageFromFile(image)}
          alt="IMG" 
        />
        <label>
          <input
            type="file"
            name='img'
            style={{display: 'none'}}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (!e.target.files) {
                return;
              }
              const files = e.target.files;
              setImage(files[0]);
              const fileReader = new FileReader();
              if (e.target.files) {
                fileReader.readAsDataURL(e.target.files[0]);
              }
            }}
          />
          <span 
            className="gray-to-white green"
          >
            Добавить изображение
          </span>
        </label>
        <ImagesActions.CreateAlbumImageButton 
          file={image}
        />
      </div>
    </div>
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
      header="Add Image"
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
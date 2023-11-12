import { FC, useState } from "react";
import { UserApi } from "../../../../entities/user/api";
import './styles.scss';
import AddWindowType from "../../types/addType";
import MyImgLabel from "../../../../shared/myImgLabel";
import { GroupApi } from "../../../../entities/group/api";

export const LoadUserAvatarWindow: FC = () => {
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);

  return (
    <AddWindowType
      header="Set Avatar"
      queryName="loadGroupAvatar"
      inputs={[avatar]}
      apiFunction={UserApi.loadAvatar}
      enabledCondition={avatar ? true : false}
    >
      <MyImgLabel 
        image={avatar}
        setImage={setAvatar}
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

export const LoadGroupAvatarWindow: FC = () => {
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);

  const groupName = getGroupNameFromUrl();

  const [_groupName, setGroupName] = useState<string | undefined>(groupName);

  return (
    <AddWindowType
      header="Set Avatar"
      queryName="loadGroupAvatar"
      inputs={[avatar]}
      apiFunction={GroupApi.loadAvatar}
      enabledCondition={avatar ? true : false}
    >
      <MyImgLabel 
        image={avatar}
        setImage={setAvatar}
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

// export const ShowImages: FC = () => {
//   const { user } = useAppSelector(state => state.user);

//   const { data, isLoading, isError } = useQuery(
//     ['getUserImages', user?.id],
//     () => {
//       if (user) {
//         return ImageApi.getAllImagesByUserId(user.id);
//       }
//     }
//   );

//   return (
//     <OrdinarPanel 
//       windowName="Images"
//       windowClass="show-images-window"
//     >
//       <LoadErrorHandler
//         isError={isError}
//         isLoading={isLoading}
//         data={data}
//       >
//         <div>asdf</div>
//       </LoadErrorHandler>
//     </OrdinarPanel>
//   )
// }
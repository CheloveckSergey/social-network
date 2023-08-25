import { ChangeEvent, FC, useState } from "react";
import AddWindowType from "../../types/addType";
import { GroupApi } from "../../../../entities/group/api";
import MyImgLabel from "../../../../shared/myImgLabel";
import './styles.scss';

const AddGroupWindow: FC = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [name, setName] = useState<string>('');

  return (
    <AddWindowType
      queryName="addGroup"
      apiFunction={GroupApi.createGroup}
      inputs={[image, name]}
      enabledCondition={name ? true : false}
      formClassName="add-group-form"
    >
      <MyImgLabel
        image={image}
        setImage={setImage}
        name="img"
      />
      <label>
        <p>Inter the name of group</p>
        <input 
          type="text" 
          name="name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
      </label>
    </AddWindowType>
  )
}

export default AddGroupWindow;
import { FC } from "react";
import './styles.scss';

interface MyImgInputProps {
  image: string | ArrayBuffer | null,
  setImage: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>,
  name: string,
  className?: string,
}

const MyImgLabel: FC<MyImgInputProps> = ({ image, setImage, name, className }) => {

  return (
    <label className={`img-label ${className}`}>
      <img src={`${image ? image : 'https://yt3.googleusercontent.com/ytc/AGIKgqN-mCzwpbEqp84-_B9jzFKPvytC5zqTrqLMjac5=s900-c-k-c0x00ffffff-no-rj'}`} alt="IMAGE" />
      <span className="green">
        Load
      </span>
      <input className="img"
        type="file" 
        name={name} 
        onChange={(e) => {
          const fileReader = new FileReader();
          fileReader.onload = function() {
            setImage(fileReader.result);
          }
          if (e.target.files) {
            fileReader.readAsDataURL(e.target.files[0]);
          }
        }}
      />
    </label>
  )
}

export default MyImgLabel;
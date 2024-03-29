import { ChangeEvent, FC, ReactNode, useState } from "react"
import './styles.scss';

interface ILProps {
  setImage: React.Dispatch<React.SetStateAction<File | undefined>>,
  children: ReactNode | ReactNode[],
}
const ImageLabel: FC<ILProps> = ({ setImage, children }) => {

  return (
    <label>
      <input
        className="img"
        type="file" 
        name={'img'} 
        style={{display: 'none'}}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (!e.target.files) {
            return;
          }
          const files = e.target.files;
          setImage(files[0]);
          const fileReader = new FileReader();
          fileReader.onload = function() {

          }
          if (e.target.files) {
            fileReader.readAsDataURL(e.target.files[0]);
          }
        }}
      />
        {children}
    </label>
  )
}

interface PILProps {
  images: File[],
  setImages: React.Dispatch<React.SetStateAction<File[]>>,
  setCurImageIndex: React.Dispatch<React.SetStateAction<number>>,
}
const PluralImageLabel: FC<PILProps> = ({ images, setImages, setCurImageIndex }) => {

  return (
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
    </label>
  )
}

interface FLProps {
  text: string,
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>,
  labelClass?: string,
}
const FileLabel: FC<FLProps> = ({ text, setFile, labelClass }) => {

  return (
    <label 
      className={`file-label ${labelClass}`}
    >
      <input
        className="file-input"
        type="file" 
        name={'file'} 
        style={{display: 'none'}}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (!e.target.files) {
            return;
          }
          const files = e.target.files;
          setFile(files[0]);
          const fileReader = new FileReader();
          fileReader.onload = function() {

          }
          if (e.target.files) {
            fileReader.readAsDataURL(e.target.files[0]);
          }
        }}
      />
        <span 
          className="green file-input-span"
        >
          {text}
        </span>
    </label>
  )
}

export const Inputs = {
  ImageLabel,
  PluralImageLabel,
  FileLabel,
}
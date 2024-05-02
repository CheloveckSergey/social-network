import { ChangeEvent, FC, useState } from 'react';
import { useAppSelector } from '../../../../app/store';
import './styles.scss';
import { ImagesActions, ImagesActionsLib } from '../../../../fetures/images';
import { OneAlbumImage } from '../../../../entities/image';
import { WindowTypes } from '../../types';

interface AIWProps {
  addImage: (fileImage: File) => void,
}
export const AddImageWindow: FC<AIWProps> = ({ addImage }) => {
  

  return (
    <WindowTypes.AddImageWindowType
      header='Add Album Image'
      addImage={addImage}
    />
  )
}
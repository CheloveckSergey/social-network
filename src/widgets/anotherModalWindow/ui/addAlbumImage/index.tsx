import { ChangeEvent, FC, useState } from 'react';
import './styles.scss';
import { WindowTypes } from '../../types';

interface AIWProps {
  createImageObject: {
    submit: (imageFile: File) => Promise<any>,
    isLoading: boolean,
    isError: boolean,
  },
  close: () => void,
}
export const AddImageWindow: FC<AIWProps> = ({ createImageObject, close }) => {
  
  return (
    <WindowTypes.AddImageWindowType
      header='Add Album Image'
      createImageObject={createImageObject}
      close={close}
    />
  )
}
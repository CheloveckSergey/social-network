import { AiOutlineCloseCircle } from "react-icons/ai";
import { closeWindow } from "../model/redux";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { FC, FormEvent, ReactNode, useRef, useState } from "react";
import './styles.scss';
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

interface AddWindowTypeProps {
  children: ReactNode | ReactNode[],
  queryName: string,
  inputs: any[],
  apiFunction: (formData: FormData) => Promise<AxiosResponse<any, any>>,
  enabledCondition: boolean,
  formClassName?: string,
}

const AddWindowType: FC<AddWindowTypeProps> = ({ children, queryName, inputs, apiFunction, enabledCondition, formClassName }) => {
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState<string>('');

  const { user } = useAppSelector(state => state.user);

  const formRef= useRef<HTMLFormElement>(null);

  const { refetch } = useQuery(
    [queryName, ...inputs],
    () => {
      if (user) {
        if (formRef.current) {
          return apiFunction(new FormData(formRef.current))
        }
      }
    },
    {
      enabled: false,
      onSuccess: () => setMessage('Вроде как загружено'),
      onError: () => setMessage('Нихуя не загружено как же блять заебало'),
    }
  )

  return (
    <div className="window">
      <button
        className="close"
        onClick={() => dispatch(closeWindow({}))}
      >
        <AiOutlineCloseCircle size={25} />
      </button>
      <div className="header-section section">
        <p>Add Post</p>
      </div>
      <hr/>
      <div className="input-section section">
        <form
          ref={formRef} 
          onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
          className={formClassName}
        >
          {children}
        </form>
        <div className="button-div">
          <button 
            className={`add ${enabledCondition ? 'green' : 'blocked'}`} 
            onClick={() => refetch()}
            disabled={enabledCondition ? false : true}
          >
            Add Avatar
          </button>
          <p>{message}</p>

        </div>
      </div>
    </div>
  )
}

export default AddWindowType;
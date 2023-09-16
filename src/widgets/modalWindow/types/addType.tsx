import { AiOutlineCloseCircle } from "react-icons/ai";
import { closeWindow } from "../model/redux";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { FC, FormEvent, ReactNode, useRef, useState } from "react";
import './styles.scss';
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import Rotator from "../../../shared/rotator";

interface AddWindowTypeProps {
  children: ReactNode | ReactNode[],
  queryName: string,
  inputs: any[],
  apiFunction: (formData: FormData) => Promise<AxiosResponse<any, any>>,
  enabledCondition: boolean,
  formClassName?: string,
  header: string,
}

const AddWindowType: FC<AddWindowTypeProps> = ({ children, queryName, inputs, apiFunction, enabledCondition, formClassName, header }) => {
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState<string>('');

  const { user } = useAppSelector(state => state.user);

  const formRef= useRef<HTMLFormElement>(null);

  const { isLoading, refetch } = useQuery(
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
      onSuccess: () => {
        window.location.reload();
      },
      onError: () => setMessage('Нихуя не загружено как же блять заебало'),
    }
  )

  return (
    <div className="window">
      <div className="header-section section">
        <p>{header}</p>
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
            Add
          </button>
          <p className="message">
            {isLoading ? (
              <Rotator size={20} />
            ) : (
              message
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AddWindowType;
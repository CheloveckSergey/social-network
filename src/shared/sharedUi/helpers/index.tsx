import { FC, ReactNode } from "react"
import { AiOutlineLoading } from "react-icons/ai"
import './styles.scss';
import { SharedUi } from "..";

interface LEHandler {
  isLoading: boolean,
  isError: boolean,
  errorMessage?: string,
  size?: number,
  children: ReactNode | ReactNode[]
}

const LoadErrorHandler: FC<LEHandler> = ({ isLoading, isError, children, size = 25 }) => {

  return (
    <>
      {isLoading ? (
        <div className="le-class">
          <AiOutlineLoading size={size} className="load-icon" />
        </div>
      ) : isError ? (
        <div className="le-class">
          <div className="error">
            <SharedUi.Icons.Error size={30} />
            
          </div>
        </div>
      ) : (
        <>
          {children}
        </>
      )}
    </>
  )
}

export const Helpers = {
  LoadErrorHandler
}
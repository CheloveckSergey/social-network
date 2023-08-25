import { FC, ReactNode } from "react";
import './styles.scss';
import { AiOutlineLoading } from "react-icons/ai";

interface LEHandler {
  isLoading: boolean,
  isError: boolean,
  data: any,
  children: ReactNode | ReactNode[]
}

const LoadErrorHandler: FC<LEHandler> = ({ isLoading, isError, data, children }) => {

  return (
    <>
      {isLoading ? (
        <div className="le-class">
          <AiOutlineLoading size={35} className="load-icon" />
        </div>
      ) : isError ? (
        <div className="le-class">Error</div>
      ) : !data ? (
        <div className="le-class">Something went wrong...</div>
      ) : (
        <>
          {children}
        </>
      )}
    </>
  )
} 

export default LoadErrorHandler;
import { BsPencilSquare } from "react-icons/bs";
import { useAppDispatch } from "../../app/store";
import { WindowTypes, setAddPostWindow, setWindow } from "../modalWindow/model/redux";
import { FC, useState } from "react";
import './styles.scss';
import { Author } from "../../entities/author";
import { ModalWindows, UseModalWindow } from "../anotherModalWindow/ui";
import ModalWindow from "../modalWindow";
import { SharedUi } from "../../shared/sharedUi";
import { OnePost } from "../../entities/post";

interface AddPostPanelProps {
  author: Author,
  isLoading: boolean,
  isError: boolean,
  addPost?: (post: OnePost) => void,
}

const AddPostPanel: FC<AddPostPanelProps> = ({ author, isLoading, isError, addPost }) => {
  
  const [showWindow, setShowWindow] = useState<boolean>(false);

  function onClose() {
    setShowWindow(false);
  }

  return (
    <div className="add-post regular-panel">
      <SharedUi.Helpers.LoadErrorHandler
        isLoading={isLoading}
        isError={isError}
      >
        {author ? (
          <>
            <button 
              className="green-to-pale"
              onClick={() => setShowWindow(true)}
            >
              <h3>Add Some Post</h3>
              <BsPencilSquare size={20} />
            </button>
            <UseModalWindow
              condition={showWindow}
              onClose={onClose}
            >
              <ModalWindows.AddPostWindow 
                author={author}
                addPost={addPost}
                close={() => setShowWindow(false)}
              />
            </UseModalWindow>
          </>
        ) : (
          <SharedUi.Divs.Empty
            body="LAL"
          />
        )}
      </SharedUi.Helpers.LoadErrorHandler>
    </div>
  )
}

export default AddPostPanel;
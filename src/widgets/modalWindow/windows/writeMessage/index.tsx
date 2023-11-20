import { ChangeEvent, FC, useState } from "react";
import './styles.scss';
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { useNavigate } from "react-router-dom";
import { closeWindow } from "../../model/redux";
import { RoomApi } from "../../../../entities/room";

export const WriteMessageWindow: FC = () => {

  const { user } = useAppSelector(state => state.modalWindow);
  const { user: curUser } = useAppSelector(state => state.user);

  const [message, setMessage] = useState<string>('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function send() {
    if (!user || !curUser) {
      return
    }

    RoomApi.createPersonalRoom(curUser.id, user.id)
      .then(room => {
        dispatch(closeWindow({}));
        navigate('/room/' + room.id);
      })
      .catch(error => console.log('Fuck you'));
  }

  if (!user || !curUser) {
    return (
      <div>
        No User
      </div>
    )
  }

  return (
    <div className="write-message-window regular-panel">
      <div className="section head">
        <h3>New Message</h3>
        <h4
          onClick={() => {
            dispatch(closeWindow({}))
            navigate('/user/' + user.id);
          }}
          className="ref"
        >
          {user.login}
        </h4>
      </div>
      <hr/>
      <div className="main section">
        <textarea 
          value={message}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
        />
        <div className="below">
          <button
            className="send white-back"
            onClick={send}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
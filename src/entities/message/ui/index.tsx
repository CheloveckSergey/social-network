import { FC } from "react";
import { Message } from "../model";
import { MeUser, } from "../../user";
import { Helpers } from "../../../shared/helpers";
import { useNavigate } from "react-router-dom";
import './styles.scss';

interface MLProps {
  message: Message,
  user: MeUser, 
}
export const MessageLine: FC<MLProps> = ({ message, user }) => {

  const navigate = useNavigate();

  return (
    <div className="message-line">
      <img 
        className="user-avatar"
        src={Helpers.getImageSrc(message.user.avatar)} 
        alt="AVATAR_IMG" 
      />
      <div className="main">
        <h3 
          className="ref"
          onClick={() => navigate('/user/' + message.user.id)}
        >
          {message.user.login}
        </h3>
        <p>
          {message.text}
        </p>
      </div>
    </div>
  )
}
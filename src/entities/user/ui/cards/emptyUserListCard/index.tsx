import { FC } from "react";
import { OneUser } from "../../../model";
import './styles.scss';
import { useNavigate } from "react-router-dom";
import { Helpers } from "../../../../../shared/helpers";

interface EULCard {
  user: OneUser,
}
export const EmptyUserListCard: FC<EULCard> = ({ user }) => {

  const navigate = useNavigate();

  return (
    <div className="empty-user-list-card">
      <img src={Helpers.getImageSrc(user.avatar)} alt="IMG" />
      <div className="main-info">
        <h4 
          onClick={() => navigate('/user/' + user.id)}
          className="login"
        >
          {user.login}
        </h4>
      </div>
      
    </div>
  )
}
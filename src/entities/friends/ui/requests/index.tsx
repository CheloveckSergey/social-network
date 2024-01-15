import { FC, ReactNode } from "react";
import { FriendRequest } from "../../model";
import { Helpers } from "../../../../shared/helpers";
import './styles.scss';

interface Lala {
  request: FriendRequest,
}

interface RequestCardProps {
  request: FriendRequest,
  actionsSlot: ReactNode,
}
const IncomeRequestCard: FC<RequestCardProps> = ({ request, actionsSlot }) => {

  return (
    <div
      className="request-card"
    >
      <img 
        className="avatar"
        src={Helpers.getImageSrc(request.user1.avatar)} 
        alt="AVATAR" 
      />
      <div className="main">
        <h4 className="login">{request.user1.login}</h4>
        <div className="buttons">
          {actionsSlot}
        </div>
      </div>   
    </div>
  )
}

const OutcomeRequestCard: FC<RequestCardProps> = ({ request, actionsSlot }) => {

  return (
    <div
      className="request-card"
    >
      <img 
        className="avatar"
        src={Helpers.getImageSrc(request.user2.avatar)} 
        alt="AVATAR" 
      />
      <div className="main">
        <h4 className="login">{request.user2.login}</h4>
        <div className="buttons">
          {actionsSlot}
        </div>
      </div>   
    </div>
  )
}

export const RequestsUi = {
  IncomeRequestCard,
  OutcomeRequestCard,
}
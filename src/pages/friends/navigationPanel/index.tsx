import { FC } from "react";
import './styles.scss';
import { FriendsPanels } from "..";

interface NPProps {
  setCurPanel: React.Dispatch<React.SetStateAction<FriendsPanels>>,
  curPanel: FriendsPanels,
}
export const NavigationPanel: FC<NPProps> = ({ setCurPanel, curPanel }) => {

  return (
    <div className="regular-panel friends-navigation-panel">
      <h4 
        className={`navigation-link ${curPanel === FriendsPanels.ALL_FRIENDS ? 'active' : ''}`}
        onClick={() => setCurPanel(FriendsPanels.ALL_FRIENDS)}
      >
        Все друзья
      </h4>
      <h4 
        className={`navigation-link ${curPanel === FriendsPanels.POSSIBLE_FRIENDS ? 'active' : ''}`}
        onClick={() => setCurPanel(FriendsPanels.POSSIBLE_FRIENDS)}
      >
        Возможные друзья
      </h4>
      <h4 
        className={`navigation-link ${curPanel === FriendsPanels.INCOME_REQUESTS ? 'active' : ''}`}
        onClick={() => setCurPanel(FriendsPanels.INCOME_REQUESTS)}
      >
        Входящие заявки
      </h4>
      <h4 
        className={`navigation-link ${curPanel === FriendsPanels.OUTCOME_REQUESTS ? 'active' : ''}`}
        onClick={() => setCurPanel(FriendsPanels.OUTCOME_REQUESTS)}
      >
        Исходящие заявки
      </h4>
    </div>
  )
}
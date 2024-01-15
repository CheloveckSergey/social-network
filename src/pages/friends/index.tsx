import { FC, useState } from "react"
import Upbar from "../../widgets/upbar"
import LeftMenu from "../../widgets/leftMenu"
import './styles.scss';
import { PossibleFriendsPanel } from "./possibleFPanel";
import AllFriends from "./allFriends";
import { useAppSelector } from "../../app/store";
import { NavigationPanel } from "./navigationPanel";
import { IncomeRequests } from "./incomeRequests";
import { OutcomeRequests } from "./outcomeRequests";

export enum FriendsPanels {
  ALL_FRIENDS = 'allFriends',
  POSSIBLE_FRIENDS = 'possibleFriends',
  OUTCOME_REQUESTS = 'outcomeRequests',
  INCOME_REQUESTS = 'incomeRequests',
}

const FriendsPage: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const [curPanel, setCurPanel] = useState<FriendsPanels>(FriendsPanels.ALL_FRIENDS);

  if (!user) {
    return (
      <div>
        No fucking user!
      </div>
    )
  }

  return (
    <>
        <Upbar />
        <main>
          <LeftMenu />
          <div className="friends-page">
            <div className="main">
              {curPanel === FriendsPanels.ALL_FRIENDS && <AllFriends user={user} />}
              {curPanel === FriendsPanels.POSSIBLE_FRIENDS && <PossibleFriendsPanel user={user} />}
              {curPanel === FriendsPanels.INCOME_REQUESTS && <IncomeRequests user={user} />}
              {curPanel === FriendsPanels.OUTCOME_REQUESTS && <OutcomeRequests user={user} />}
            </div>
            <div className="right">
              <NavigationPanel
                curPanel={curPanel}
                setCurPanel={setCurPanel}
              />
            </div>
          </div>
        </main>
      </>
  )
}

export default FriendsPage;
import { FC } from "react"
import Upbar from "../../widgets/upbar"
import LeftMenu from "../../widgets/leftMenu"
import './styles.scss';
import { PossibleFriendsPanel } from "./possibleFPanel";
import AllFriends from "./allFriends";

const FriendsPage: FC = () => {

  return (
    <>
        <Upbar />
        <main>
          <LeftMenu />
          <div className="friends-page">
            <div className="main">
              <AllFriends />
            </div>
            <div className="right">
              <PossibleFriendsPanel />
            </div>
          </div>
        </main>
      </>
  )
}

export default FriendsPage;
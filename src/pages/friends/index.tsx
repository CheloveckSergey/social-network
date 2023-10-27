import { FC } from "react"
import Upbar from "../../widgets/upbar"
import LeftMenu from "../../widgets/leftMenu"
import './styles.scss';
import { PossibleFriendsPanel } from "./possibleFPanel";
import AllFriends from "./allFriends";
import { useAppSelector } from "../../app/store";

const FriendsPage: FC = () => {

  const { user } = useAppSelector(state => state.user);

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
              <AllFriends />
            </div>
            <div className="right">
              <PossibleFriendsPanel user={user} />
            </div>
          </div>
        </main>
      </>
  )
}

export default FriendsPage;
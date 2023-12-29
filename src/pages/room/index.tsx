import { useAppSelector } from "../../app/store";
import LeftMenu from "../../widgets/leftMenu"
import Upbar from "../../widgets/upbar"
import { RoomPanel } from "./roomPanel";
import './styles.scss';

export const RoomPage = () => {

  const { user } = useAppSelector(state => state.user);

  if (!user) {
    return (
      <div>
        No fucking user
      </div>
    )
  }
  
  return (
    <div className="room-page">
      <Upbar />
      <main>
        <LeftMenu />
        <div className="room">
          <div className="main">
            <RoomPanel 
              user={user}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
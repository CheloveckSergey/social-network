import { useAppSelector } from "../../app/store";
import LeftMenu from "../../widgets/leftMenu"
import Upbar from "../../widgets/upbar";
import { RoomsFeed } from "./roomsFeed";
import './styles.scss';
import { RoomsUpbar } from "./upbar";

export const RoomsPage = () => {

  const { user } = useAppSelector(state => state.user);

  if (!user) {
    return (
      <div>
        No fucking user
      </div>
    )
  }

  return (
    <>
      <Upbar />
      <main>
        <LeftMenu />
        <div className="rooms">
          <div className="main">
            <RoomsUpbar
              user={user}
            />
            <RoomsFeed 
              user={user}
            />
          </div>
          <div className="left">

          </div>
        </div>
      </main>
    </>
  )
}
import LeftMenu from "../../widgets/leftMenu"
import Upbar from "../../widgets/upbar"
import './styles.scss';

export const RoomPage = () => {

  return (
    <>
      <Upbar />
      <main>
        <LeftMenu />
        <div className="room">
          
        </div>
      </main>
    </>
  )
}
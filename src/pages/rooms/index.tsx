import LeftMenu from "../../widgets/leftMenu"
import Upbar from "../../widgets/upbar"
import './styles.scss';

export const RoomsPage = () => {

  return (
    <>
      <Upbar />
      <main>
        <LeftMenu />
        <div className="rooms">
          
        </div>
      </main>
    </>
  )
}
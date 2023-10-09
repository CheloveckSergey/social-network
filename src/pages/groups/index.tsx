import { FC } from 'react';
import LeftMenu from '../../widgets/leftMenu';
import Upbar from '../../widgets/upbar';
import './styles.scss';
import { GroupList } from './groupList';
import { AddGroupPanel } from './createGroup';

const GroupsPage: FC = () => {

  return (
    <>
      <Upbar />
      <main>
        <LeftMenu />
        <div className="groups-page">
          <div className='main'>
            <AddGroupPanel />
            <div className='groups-list-panel regular-panel'>
              <GroupList />
            </div>
          </div>
          <div className='right'>
            <div className='groups-list-panel regular-panel'>

            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default GroupsPage;
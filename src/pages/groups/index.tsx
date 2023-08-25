import { FC } from 'react';
import LeftMenu from '../../widgets/leftMenu';
import Upbar from '../../widgets/upbar';
import './styles.scss';
import { Group } from '../../entities/group';
import { BiSolidGroup } from 'react-icons/bi';
import { useAppDispatch } from '../../app/store';
import { WindowTypes, setWindow } from '../../widgets/modalWindow/model/redux';
import { useQuery } from 'react-query';
import { GroupApi } from '../../entities/group/api';
import { Link } from 'react-router-dom';

const AddGroupPanel: FC = () => {
  const dispatch = useAppDispatch(); 

  return (
    <div className="add-group regular-panel">
      <button 
        className="green-to-pale"
        onClick={() => dispatch(setWindow({window: WindowTypes.ADD_GROUP}))}
      >
        <h3>Create Group</h3>
        <BiSolidGroup size={20} />
      </button>
    </div>
  )
}

const GroupList: FC = ({  }) => {
  const { data, isLoading, isError } = useQuery(
    'getAllGroups',
    () => GroupApi.getAllGroups()
  )

  return (
    <div className='group-list'>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error</div>
      ) : !data ? (
        <div>Something went wrong...</div>
      ) : (
        <div>
          {data.map(group => (
            <div className='group-item'>
              <img 
                src={group.avatar && process.env.REACT_APP_BACK_URL 
                  ? process.env.REACT_APP_BACK_URL + group.avatar 
                  : 'https://assets.faceit-cdn.net/hubs/avatar/fcdb61a2-09e7-4fd4-a6c5-d5affccbd13b_1609434381537.jpg'} 
                alt="GROUP_IMG" 
              />
              <h3>
                <Link to={`${group.name}`} >
                  {group.name}
                </Link>
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const GroupsPage: FC = () => {

  const dispatch = useAppDispatch();

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
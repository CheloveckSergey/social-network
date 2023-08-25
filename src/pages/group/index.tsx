import { FC } from "react";
import LeftMenu from "../../widgets/leftMenu"
import Upbar from "../../widgets/upbar"
import './styles.scss';
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GroupApi } from "../../entities/group/api";
import LoadErrorHandler from "../../shared/loadErrorHandler";

interface GroupPanelProps {
  groupName: string | undefined,
}

const GroupHeader: FC<GroupPanelProps> = ({ groupName }) => {
  const { data, isLoading, isError } = useQuery(
    ['getGroup', groupName],
    () => {
      if (groupName) {
        return GroupApi.getGroupByName(groupName)
      }
    }
  )

  return (
    <div className="group-header regular-panel">
      <LoadErrorHandler 
        isLoading={isLoading}
        isError={isError}
        data={data}
      >
        <img src={process.env.REACT_APP_BACK_URL && data?.avatar 
          ? process.env.REACT_APP_BACK_URL + data.avatar 
          : 'https://i.ytimg.com/vi/QPVZdoZzXNQ/maxresdefault.jpg'} 
          alt="AVATAR_GROUP" 
        />
        <div className="header-right">
          <h3>{data?.name}</h3>
          <button 
            className="subscribe white-back"
          >
            Subscribe
          </button>
        </div>
      </LoadErrorHandler>
    </div>
  )
}

const GroupDesc: FC<GroupPanelProps> = ({ groupName }) => {

  return (
    <div className="regular-panel">
      Description
    </div>
  )
}

const GroupPage = () => {
  const {groupName} = useParams()

  return (
    <>
      <Upbar />
      <main>
        <LeftMenu />
        <div className="group-page">
          <GroupHeader groupName={groupName} />
          <div className="just-cause">
            <div className="group-main">
              <div className="images regular-panel">
                Images
              </div>
              <div className="feed regular-panel">
                Feed
              </div>
            </div>
            <div className="group-right">
              
              <div className="regular-panel">
                Subs
              </div>
              <div className="contacts regular-panel">
                Contacts
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default GroupPage;
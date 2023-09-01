import { FC } from "react";
import LeftMenu from "../../widgets/leftMenu"
import Upbar from "../../widgets/upbar"
import './styles.scss';
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GroupApi } from "../../entities/group/api";
import LoadErrorHandler from "../../shared/loadErrorHandler";
import AddPostPanel from "../../shared/addPost";
import { WindowTypes, setWindow } from "../../widgets/modalWindow/model/redux";
import { PostApi } from "../../entities/post/api";
import Feed from "../../widgets/feed";
import { useAppDispatch } from "../../app/store";

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

  const dispatch = useAppDispatch();
  

  return (
    <div className="group-header regular-panel">
      <LoadErrorHandler 
        isLoading={isLoading}
        isError={isError}
        data={data}
      >
        <div className="avatar">
          <img src={process.env.REACT_APP_BACK_URL && data?.avatar 
            ? process.env.REACT_APP_BACK_URL + data.avatar 
            : 'https://i.ytimg.com/vi/QPVZdoZzXNQ/maxresdefault.jpg'} 
            alt="AVATAR_GROUP" 
          />
          <button 
            className="green change-avatar"
            onClick={() => dispatch(setWindow({window: WindowTypes.LOAD_GROUP_AVATAR}))}
          >
            Change Avatar
          </button>
        </div>
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

interface GroupFeedProps {
  groupName: string | undefined,
}

const GroupFeed: FC<GroupFeedProps> = ({ groupName }) => {
  const { data, isLoading, isError } = useQuery(
    ['getGroupPosts', groupName],
    () => {
      if (groupName) {
        return PostApi.getAllPostsByGroupName(groupName);
      }
    }
  )

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error...</p>
      ) : !data ? (
        <p>Something went wrong...</p>
      ) : (
        <Feed posts={data} />
      )}
    </>
  )
}

const GroupPage = () => {
  const { groupName } = useParams();

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
              <AddPostPanel windowType={WindowTypes.ADD_GROUP_POST} />
              <GroupFeed groupName={groupName} />
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
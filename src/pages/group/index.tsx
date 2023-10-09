import { FC, useEffect, useState } from "react";
import LeftMenu from "../../widgets/leftMenu"
import Upbar from "../../widgets/upbar"
import './styles.scss';
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GroupApi } from "../../entities/group/api";
import AddPostPanel from "../../shared/addPost";
import { WindowTypes, setWindow } from "../../widgets/modalWindow/model/redux";
import { GroupFeed } from "./groupFeed";
import { Group } from "../../entities/group";
import { GroupHeader } from "./groupHeader";
import { GroupSubs } from "./groupSubs";


interface GroupDescProps {
  group: Group | undefined,
  isLoading: boolean,
  isError: boolean,
}

const GroupDesc: FC<GroupDescProps> = ({ group, isLoading, isError }) => {

  return (
    <div className="regular-panel">
      Description
    </div>
  )
}

const GroupPage = () => {
  
  const [group, setGroup] = useState<Group>();

  const { groupName } = useParams();

  const { data, isLoading, isError, refetch } = useQuery(
    ['getGroup', groupName],
    () => {
      if (groupName) {
        return GroupApi.getGroupByName(groupName)
      }
    },
    {
      onSuccess: (data) => {
        console.log(data);
        setGroup(data);
      },
    }
  );

  useEffect(() => {
    refetch();
  }, []);
  
  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        Error
      </div>
    )
  }

  if (data) {
    return (
      <>
        <Upbar />
        <main>
          <LeftMenu />
          <div className="group-page">
            <GroupHeader group={group} isError={isError} isLoading={isLoading} />
            <div className="just-cause">
              <div className="group-main">
                <div className="images regular-panel">
                  Images
                </div>
                <AddPostPanel windowType={WindowTypes.ADD_GROUP_POST} />
                <GroupFeed groupName={groupName} />
              </div>
              <div className="group-right">
                <GroupSubs group={group} />
                <div className="contacts regular-panel">
                  Contacts
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  } else {
    return (
      <div>
        Что-то пошло не так
      </div>
    )
  }
}

export default GroupPage;
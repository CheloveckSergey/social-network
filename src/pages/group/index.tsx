import { FC, useEffect, useState } from "react";
import LeftMenu from "../../widgets/leftMenu"
import Upbar from "../../widgets/upbar"
import './styles.scss';
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GroupApi } from "../../entities/group/api";
import AddPostPanel from "../../widgets/addPost";
import { WindowTypes, setWindow } from "../../widgets/modalWindow/model/redux";
import { GroupFeed } from "./groupFeed";
import { Group, GroupWithSubscribed } from "../../entities/group";
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
  
  const [group, setGroup] = useState<GroupWithSubscribed>();

  const { id } = useParams();

  const { data, isLoading, isError, refetch } = useQuery(
    ['getGroup', id],
    () => {
      if (id) {
        return GroupApi.getGroupById(Number(id))
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
                <AddPostPanel author={data.author} />
                <GroupFeed group={data} />
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
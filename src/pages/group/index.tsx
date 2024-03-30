import { FC, useEffect, useState } from "react";
import LeftMenu from "../../widgets/leftMenu"
import Upbar from "../../widgets/upbar"
import './styles.scss';
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GroupApi } from "../../entities/group/api";
import AddPostPanel from "../../widgets/addPost";
import { GroupFeed } from "./groupFeed";
import { Group, GroupsLib, OneGroup } from "../../entities/group";
import { GroupHeader } from "./groupHeader";
import { GroupSubs } from "./groupSubs";


interface GroupDescProps {
  group: Group | undefined,
  isLoading: boolean,
  isError: boolean,
}

const GroupPage = () => {
  
  const { id } = useParams();

  const {
    group,
    isLoading,
    isError,
  } = GroupsLib.useGroup(Number(id));

  if (isError) {
    return (
      <div>
        Error
      </div>
    )
  }

  return (
    <>
      <Upbar />
      <main>
        <LeftMenu />
        <div className="group-page">
          <GroupHeader 
            group={group}
            isLoading={isLoading}
            isError={isError}
          />
          <div className="just-cause">
            <div className="group-main">
              <div className="images regular-panel">
                Images
              </div>
              {group && <GroupFeed group={group} />}
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
}

export default GroupPage;
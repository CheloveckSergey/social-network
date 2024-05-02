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
import { useAppSelector } from "../../app/store";
import { SharedUi } from "../../shared/sharedUi";
import { ImagesPreview } from "../../widgets/imagesPreview";
import { GroupImages } from "./groupImages";


interface GroupDescProps {
  group: Group | undefined,
  isLoading: boolean,
  isError: boolean,
}

const GroupPage = () => {

  const { user } = useAppSelector(state => state.user);
  
  const { id } = useParams();

  const {
    group,
    isLoading,
    isError,
    setSubscribed,
    createRequest,
    deleteRequest,
  } = GroupsLib.useGroup(Number(id));

  if (!user) {
    return (
      <div>
        No user
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
            setSubscribed={setSubscribed}
            createRequest={createRequest}
            deleteRequest={deleteRequest}
          />
          <div className="just-cause">
            <div className="group-main">
              <SharedUi.Helpers.LoadErrorHandler 
                isLoading={isLoading}
                isError={isError}
              >
                {group?.membership ? (
                  <GroupImages
                    group={group}
                  />
                ) : (
                  <SharedUi.Divs.Empty
                    body="Forbidden Images"
                  />
                )}
              </SharedUi.Helpers.LoadErrorHandler>
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
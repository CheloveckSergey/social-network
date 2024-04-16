import { FC } from "react";
import './styles.scss';
import Upbar from "../../widgets/upbar";
import LeftMenu from "../../widgets/leftMenu";
import { GroupsLib } from "../../entities/group";
import { useParams } from "react-router-dom";
import { SharedUi } from "../../shared/sharedUi";
import { MainInfo } from "./mainInfo";
import { WaitingRequests } from "./waitingRequests";
import { MembersPanel } from "./members";

export const GroupEdit: FC = ({  }) => {

  const { groupId } = useParams();

  const {
    group,
    isLoading,
    isError,
    setName,
    setAvatar,
  } = GroupsLib.useGroup(Number(groupId))

  return (
    <>
      <Upbar />
      <main>
        <LeftMenu />
        <div className="group-edit-page">
          <SharedUi.Helpers.LoadErrorHandler
            isLoading={isLoading}
            isError={isError}
          >
            {group ? (
              <>
                <MainInfo
                  group={group}
                  setName={setName}
                  setAvatar={setAvatar}
                />
                <WaitingRequests
                  groupId={group.id}
                />
                <MembersPanel
                  groupId={group.id}
                />
              </>
            ) : (
              <SharedUi.Divs.Empty
                body="Что-то пошло не так"
              />
            )}
          </SharedUi.Helpers.LoadErrorHandler>
        </div>
      </main>
    </>
  )
}
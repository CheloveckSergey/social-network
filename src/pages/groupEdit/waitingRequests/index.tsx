import { FC } from "react";
import './styles.scss';
import { GroupMembershipStatuses, GroupsLib, GroupsUi, MembershipRequest } from "../../../entities/group";
import { SharedUi } from "../../../shared/sharedUi";
import { GroupFeaturesLib, GroupFeaturesUi } from "../../../fetures/group";

interface WRProps {
  groupId: number,
}
export const WaitingRequests: FC<WRProps> = ({ groupId }) => {
  
  const {
    requests,
    isLoading,
    isError,
    acceptRequest,
    cancelAcceptRequest,
  } = GroupsLib.useWaitingRequests(groupId);

  return (
    <div className="regular-panel waiting-requests">
      <SharedUi.Helpers.LoadErrorHandler
        isError={isError}
        isLoading={isLoading}
      >
        {requests?.length ? (
          requests.map((request, index) => <GroupsUi.RequestCard
            key={index}
            request={request}
            actions={[
              (request.status === GroupMembershipStatuses.ACCEPTED && <GroupFeaturesUi.CancelAcceptRequest
                userId={request.userId}
                groupId={request.groupId}
                requestId={request.id}
                cancelAcceptRequest={cancelAcceptRequest}
              />),
              <GroupFeaturesUi.AcceptRequestButton
                request={request}
                acceptRequest={acceptRequest}
              />
            ]}
          />)
        ) : (
          <SharedUi.Divs.Empty
            body="Нет ожидающих заявок"
          />
        )}
      </SharedUi.Helpers.LoadErrorHandler>
    </div>
  )
}
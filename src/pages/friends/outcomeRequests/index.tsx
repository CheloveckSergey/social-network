import { FC } from "react";
import { MeUser } from "../../../entities/user";
import { SharedUi } from "../../../shared/sharedUi";
import { FriendsLib } from "../../../entities/friends";
import { RequestsUi } from "../../../entities/friends/ui";
import { Friendship } from "../../../fetures/friendship";

interface ORProps {
  user: MeUser,
}
export const OutcomeRequests: FC<ORProps> = ({ user }) => {

  const {
    outcomeRequests,
    isLoading,
    isError,
  } = FriendsLib.useOutcomeRequests(user);

  return (
    <div className="regular-panel outcome-requests">
      <SharedUi.Helpers.LoadErrorHandler 
        isError={isError}
        isLoading={isLoading}
      >
        {outcomeRequests && outcomeRequests.length ? (
          outcomeRequests.map((request, index) => (
            <RequestsUi.OutcomeRequestCard 
              key={index}
              request={request}
              actionsSlot={(<>
                <Friendship.Ui.CancelRequestButton 
                  request={request}
                />
              </>)}
            />
          ))
        ) : (
          <div className="empty">
            No Income Requests
          </div>
        )}
      </SharedUi.Helpers.LoadErrorHandler>
    </div>
  )
}
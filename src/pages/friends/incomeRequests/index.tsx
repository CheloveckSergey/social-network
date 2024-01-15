import { FC } from "react"
import { MeUser } from "../../../entities/user"
import { FriendRequest, FriendsLib } from "../../../entities/friends"
import { SharedUi } from "../../../shared/sharedUi";
import './styles.scss';
import { Helpers } from "../../../shared/helpers";
import { Friendship } from "../../../fetures/friendship";
import { RequestsUi } from "../../../entities/friends/ui";

// interface RProps {
//   request: FriendRequest,
// }
// const Request: FC<RProps> = ({ request }) => {

//   const {
//     refetch,
//     success,
//     isLoading: isAcceptLoading,
//     isError: isAcceptError,
//   } = Friendship.Hooks.useAcceptRequest(request.id);

//   return (
//     // <div
//     //   className="income-request"
//     // >
//     //   <img 
//     //     className="avatar"
//     //     src={Helpers.getImageSrc(request.user1.avatar)} 
//     //     alt="AVATAR" 
//     //   />
//     //   <div className="main">
//     //     <h4 className="login">{request.user1.login}</h4>
//     //     <div className="buttons">
//     //       <button
//     //         className="accept white-back"
//     //         onClick={() => refetch()}
//     //         disabled={success}
//     //       >
//     //         Принять
//     //       </button>
//     //     </div>
        
//     //   </div>
//     //   {isAcceptLoading && <SharedUi.Icons.Spinner size={55} />}
      
//     // </div>
//   )
// }

interface IRProps {
  user: MeUser,
}
export const IncomeRequests: FC<IRProps> = ({ user }) => {

  const {
    incomeRequests,
    isLoading,
    isError,
  } = FriendsLib.useIncomeRequests(user);

  return (
    <div className="regular-panel income-requests">
      <SharedUi.Helpers.LoadErrorHandler 
        isError={isError}
        isLoading={isLoading}
      >
        {incomeRequests && incomeRequests.length ? (
          incomeRequests.map((request, index) => (
            <RequestsUi.IncomeRequestCard 
              key={index}
              request={request}
              actionsSlot={(<>
                <Friendship.Ui.AcceptRequestButton 
                  request={request}
                />
                <Friendship.Ui.RejectRequestButton 
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
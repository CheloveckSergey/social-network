import { FC } from "react"
import './styles.scss';
import { User, UserApi, UserUi } from "../../../entities/user";
import { useQuery } from "react-query";
import { SharedUi } from "../../../shared/sharedUi";
import { Friendship } from "../../../fetures/friendship";
import { FriendsApi, FriendsLib } from "../../../entities/friends";

interface PFPProps {
  user: User,
}
export const PossibleFriendsPanel: FC<PFPProps> = ({ user }) => {

  const {
    possibleFriends,
    isLoading,
    isError,
  } = FriendsLib.usePossibleFriends(user)

  return (
    <div className="regular-panel possible-friends-panel">
      <h3>Possible friends</h3>
      <div className="pfc-list">
        <SharedUi.Helpers.LoadErrorHandler 
          isError={isError}
          isLoading={isLoading}
        >
          {possibleFriends?.length ? (
            possibleFriends?.map((friend, index) => <UserUi.Cards.PossibleFriendCard
              key={index}
              friend={friend}
              AddFriendButton={Friendship.Ui.CreateRequestButton}
            />)
          ) : (
            <div className="no-friends">
              There's no possible friends
            </div>
          )}
        </SharedUi.Helpers.LoadErrorHandler>
      </div>
    </div>
  )
}
import { FC } from "react"
import './styles.scss';
import { User, UserApi, UserUi } from "../../../entities/user";
import { useQuery } from "react-query";
import { SharedUi } from "../../../shared/sharedUi";
import { Friendship } from "../../../fetures/friendship";
import { FriendsApi } from "../../../entities/friends";

interface PFPProps {
  user: User,
}
export const PossibleFriendsPanel: FC<PFPProps> = ({ user }) => {

  const { data, isLoading, isError } = useQuery(
    ['loadPossibleFriends'],
    () => {
      if (user) {
        return FriendsApi.getPossibleFriends(user.id);
      }
    }
  )

  return (
    <div className="regular-panel possible-friends-panel">
      <h3>Possible friends</h3>
      <div className="pfc-list">
        <SharedUi.Helpers.LoadErrorHandler 
          isError={isError}
          isLoading={isLoading}
        >
          {data?.length ? (
            data?.map((friend, index) => <UserUi.Cards.PossibleFriendCard
              key={index}
              friend={friend}
              AddFriendButton={Friendship.Ui.AddFriendButton}
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
import { FC } from "react";
import { MeUser, UserApi } from "../../../entities/user";
import { useQuery } from "react-query";
import { SharedUi } from "../../../shared/sharedUi";
import { Friendship } from "../../../fetures/friendship";
import { Subscription } from "../../../fetures/subscription";
import { UserUi } from "../../../entities/user/ui";

interface FBProps {
  user: MeUser,
}
export const FriendsBlock: FC<FBProps> = ({ user }) => {

  const { data, isLoading, isError } = useQuery(
    ['getFriends', user?.id],
    () => {
        return UserApi.getAllFriends(user.id);
    }
  )

  return (
    <div className="friend-list">
      <SharedUi.Helpers.LoadErrorHandler 
        isLoading={isLoading}
        isError={isError}
      >
        {data?.length ? (
          data.map((user, index) => <UserUi.Cards.UserListCard 
            user={user} 
            key={index} 
            hooks={[
             Friendship.Hooks.useFriendship,
             Subscription.Hooks.useSubscription,
            ]}
          />)
        ) : (
          <div>
           <p>There's no friends</p>
          </div>
        )}
      </SharedUi.Helpers.LoadErrorHandler>
    </div>
  )
}
import { FC } from "react";
import { useQuery } from "react-query";
import { PostApi, PostsLib, PostsUi } from "../../../entities/post";
import Feed from "../../../widgets/feed";
import { Group } from "../../../entities/group";
import { useAppSelector } from "../../../app/store";
import Favourites from "../../../fetures/favourites";

interface GroupFeedProps {
  group: Group,
}

export const GroupFeed: FC<GroupFeedProps> = ({ group }) => {
  
  const { user } = useAppSelector(state => state.user);

  const {
    feed,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = PostsLib.useFeedByAuthor(group.author.id, user!, { limit: 7, offset: 0 });

  return (
    <>
      <PostsUi.PostList
        posts={feed}
        isLoading={isLoading}
        isError={isError}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        actions={[
          Favourites.Actions.LikeButton,
        ]}
      />
    </>
  )
}
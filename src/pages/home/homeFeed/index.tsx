import { FC, useEffect } from "react";
import { MeUser, User } from "../../../entities/user";
import Feed from "../../../widgets/feed";
import { useQuery } from "react-query";
import { PostApi, PostsLib, PostsUi } from "../../../entities/post";
import './styles.scss';
import Favourites from "../../../fetures/favourites";
import { CommentsActionsUi } from "../../../fetures/comments";

interface HomeFeedProps {
  meUser: MeUser,
}

export const HomeFeed: FC<HomeFeedProps> = ({ meUser }) => {
  
  const {
    feed,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = PostsLib.useFeedByAuthor(meUser.author.id, meUser, { offset: 0, limit: 5 });

  return (
    <PostsUi.PostList 
      posts={feed}
      isLoading={isLoading}
      isError={isError}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      actions={[
        Favourites.Actions.LikeButton,
      ]}
    />
  )
}
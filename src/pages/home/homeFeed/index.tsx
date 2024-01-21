import { FC, useEffect } from "react";
import { MeUser, User } from "../../../entities/user";
import Feed from "../../../widgets/feed";
import { useQuery } from "react-query";
import { PostApi, PostsLib, PostsUi } from "../../../entities/post";
import './styles.scss';
import Favourites from "../../../fetures/favourites";

interface HomeFeedProps {
  meUser: MeUser,
}

export const HomeFeed: FC<HomeFeedProps> = ({ meUser }) => {
  
  const {
    feed,
    isLoading,
    isError,
  } = PostsLib.useFeedByAuthor(meUser.author.id, meUser);

  return (
    <PostsUi.PostList 
      posts={feed}
      isLoading={isLoading}
      isError={isError}
      actions={[
        Favourites.Actions.LikeButton,
      ]}
    />
  )
}
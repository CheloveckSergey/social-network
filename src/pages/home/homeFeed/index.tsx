import { FC, useEffect } from "react";
import { MeUser, User } from "../../../entities/user";
import Feed from "../../../widgets/feed";
import { useQuery } from "react-query";
import { PostApi, PostsLib } from "../../../entities/post";
import './styles.scss';

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
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>ErrorХуйня...</p>
      ) : !feed ? (
        <p>Something went wrong...</p>
      ) : (
        <Feed posts={feed} />
      )}
    </>
  )
}
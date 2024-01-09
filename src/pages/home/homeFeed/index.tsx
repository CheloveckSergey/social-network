import { FC, useEffect } from "react";
import { User } from "../../../entities/user";
import Feed from "../../../widgets/feed";
import { useQuery } from "react-query";
import { PostApi } from "../../../entities/post";
import './styles.scss';

interface HomeFeedProps {
  user: User | undefined,
}

export const HomeFeed: FC<HomeFeedProps> = ({ user }) => {
  const { data, isLoading, isError } = useQuery(
    ['loadQuery', user?.id],
    () => {
      if (user?.id) {
        return PostApi.getAllOnePostsByAuthorId(user.author.id);
      }
    }
  )

  useEffect(() => {
    console.log('hopePageRenderUseEffect');
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>ErrorХуйня...</p>
      ) : !data ? (
        <p>Something went wrong...</p>
      ) : (
        <Feed posts={data} />
      )}
    </>
  )
}
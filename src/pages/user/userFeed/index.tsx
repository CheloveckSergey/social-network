import { FC } from "react";
import { OneUser } from "../../../entities/user";
import './styles.scss';
import { useQuery } from "react-query";
import { PostApi } from "../../../entities/post";
import Feed from "../../../widgets/feed";

interface UserFeedProps {
  user: OneUser,
}

export const UserFeed: FC<UserFeedProps> = ({ user }) => {
  const { data, isLoading, isError } = useQuery(
    ['loadQuery', user?.id],
    () => {
      if (user?.id) {
        return PostApi.getAllPostsByAuthorId(user.author.id);
      }
    }
  )

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error...</p>
      ) : !data ? (
        <p>Something went wrong...</p>
      ) : (
        <Feed posts={data} />
      )}
    </>
  )
}
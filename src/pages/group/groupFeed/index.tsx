import { FC } from "react";
import { useQuery } from "react-query";
import { PostApi } from "../../../entities/post";
import Feed from "../../../widgets/feed";
import { Group } from "../../../entities/group";

interface GroupFeedProps {
  group: Group,
}

export const GroupFeed: FC<GroupFeedProps> = ({ group }) => {
  const { data, isLoading, isError } = useQuery(
    ['getGroupPosts', group.author.id],
    () => {
      if (group) {
        return PostApi.getAllPostsByAuthorId(group.author.id);
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
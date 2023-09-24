import { FC } from "react";
import { useQuery } from "react-query";
import { PostApi } from "../../../entities/post";
import Feed from "../../../widgets/feed";

interface GroupFeedProps {
  groupName: string | undefined,
}

export const GroupFeed: FC<GroupFeedProps> = ({ groupName }) => {
  const { data, isLoading, isError } = useQuery(
    ['getGroupPosts', groupName],
    () => {
      if (groupName) {
        return PostApi.getAllPostsByGroupName(groupName);
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
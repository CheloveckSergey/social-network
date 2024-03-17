import { FC } from "react";
import { useQuery } from "react-query";
import { PostApi, PostsLib, PostsUi } from "../../../entities/post";
import Feed from "../../../widgets/feed";
import { Group } from "../../../entities/group";
import { useAppSelector } from "../../../app/store";
import Favourites from "../../../fetures/favourites";
import { MusicFeaturesUi } from "../../../fetures/music";
import { Music, MyMusic } from "../../../entities/music";

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
    fetchNextPage,
    addMusic,
    deleteMusic,
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
        renderPost={(post, index) => (
          <PostsUi.PostCard 
            key={index}
            post={post}
            actions={<>
  
            </>}
            renderAddMusicButton={(music: MyMusic) => {
            if (user) {
              return (
                <MusicFeaturesUi.AddDeleteMusicToAddedButton
                  addMusicToAdded={(music: Music) => {
                    addMusic(music, post.id);
                  }}
                  deleteMusicFromAdded={(music: Music) => {
                    deleteMusic(music, post.id);
                  }}
                  musicId={music.id}
                  added={music.added}
                  authorId={user.author.id}
                />
              )
            } else {
              return <></>
            }
          }}
          />
        )}
      />
    </>
  )
}
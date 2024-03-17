import { FC, useEffect } from "react";
import { MeUser, User } from "../../../entities/user";
import Feed from "../../../widgets/feed";
import { useQuery } from "react-query";
import { PostApi, PostsLib, PostsUi } from "../../../entities/post";
import './styles.scss';
import Favourites from "../../../fetures/favourites";
import { CommentsActionsUi } from "../../../fetures/comments";
import { PostsFeaturesLib, PostsFeaturesUi } from "../../../fetures/post";
import { useAppSelector } from "../../../app/store";
import { MusicFeaturesUi } from "../../../fetures/music";
import { Music, MyMusic } from "../../../entities/music";

interface HomeFeedProps {
  meUser: MeUser,
}

export const HomeFeed: FC<HomeFeedProps> = ({ meUser }) => {

  const { user } = useAppSelector(state => state.user);
  
  const {
    feed,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    setIsLiked,
    addMusic,
    deleteMusic,
  } = PostsLib.useFeedByAuthor(meUser.author.id, meUser, { offset: 0, limit: 5 });

  return (
    <PostsUi.PostList 
      posts={feed}
      isLoading={isLoading}
      isError={isError}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      renderPost={(post, index) => (
        <PostsUi.PostCard
          key={index}
          post={post}
          // playPauseButton={<MusicFeaturesUi.PlayPauseMusicButton 
          //   music={post.mu}
          // />}
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
          actions={<>
            <Favourites.Actions.LikeButton
              creation={post.type === 'repost' && post.repost ? post.repost.creation : post.creation}
              effects={{
                setIsLiked: (isLiked: boolean) => {
                  if (post.type === 'repost' && post.repost) {
                    setIsLiked(isLiked, post.repost.id);
                  } else {
                    setIsLiked(isLiked, post.id);
                  }
                }
              }}
            />
            <PostsFeaturesUi.RepostButton 
              authorId={user!.author.id}
              postId={post.type === 'repost' && post.repost ? post.repost.id : post.id}
              repostsNumber={post.type === 'repost' && post.repost ? post.repost.repostsNumber : post.repostsNumber}
              activeCondition={post.type === 'repost' && post.repost ? post.repost.isReposted : post.isReposted}
            />
          </>}
        />
      )}
    />
  )
}
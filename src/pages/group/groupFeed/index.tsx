import { FC } from "react";
import { useQuery } from "react-query";
import { PostApi, PostsLib, PostsUi } from "../../../entities/post";
import Feed from "../../../widgets/feed";
import { Group } from "../../../entities/group";
import { useAppSelector } from "../../../app/store";
import Favourites from "../../../fetures/favourites";
import { MusicFeaturesUi } from "../../../fetures/music";
import { Music, MyMusic } from "../../../entities/music";
import { MusicUi } from "../../../entities/music/ui";
import { PostsFeaturesUi } from "../../../fetures/post";
import { ImageUi, OneImage } from "../../../entities/image";
import { ImageWindowComments } from "../../../widgets/commentsFeed";
import { PostCommentsWidget } from "../../../widgets/postComments";
import { OneCreation } from "../../../entities/creation";
import AddPostPanel from "../../../widgets/addPost";

interface GroupFeedProps {
  group: Group,
}

export const GroupFeed: FC<GroupFeedProps> = ({ group }) => {
  
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
    setImageLiked,
    addPost,
  } = PostsLib.useFeedByAuthor(group.author.id, user!, { limit: 7, offset: 0 });

  return (
    <>
      <AddPostPanel 
        isLoading={isLoading}
        isError={isError}
        author={group.author} 
        addPost={addPost}
      />
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
          renderMusicList={<MusicUi.MusicList
            isLoading={false}
            isError={false}
            musics={post.musics}
            renderMusicLine={(music: MyMusic, index: number) => <MusicUi.MusicLine
              music={music}
              playPauseButton={<MusicFeaturesUi.PlayPauseMusicButton 
                music={music}
                index={index}
                musics={post.musics}
              />}
              rightButtons={[
                (user ? (
                  <MusicFeaturesUi.AddDeleteMusicToAddedButton
                    musicId={music.id}
                    authorId={user.author.id}
                    added={music.added}
                    addMusicToAdded={(music: Music) => {
                      addMusic(music, post.id);
                    }}
                    deleteMusicFromAdded={(music: Music) => {
                      deleteMusic(music, post.id);
                    }}
                  />
                ) : (
                  <></>
                ))
              ]}
            />}
          />}
          actions={<>
            <Favourites.Actions.LikeButton
              creation={post.type === 'repost' && post.repost ? post.repost.creation : post.creation}
              effects={{
                setIsLiked: (isLiked: boolean) => {
                  setIsLiked(isLiked, post.id);
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
          renderPostImage={(
            image: OneImage, 
            images: OneImage[],
            curImageIndex: number,
            setCurIndex: (index: number) => void,
          ) => <ImageUi.ImageCard 
            image={image}
            index={curImageIndex}
            images={images}
            imageClass="post-image"
            curImageIndex={curImageIndex}
            setCurImageIndex={setCurIndex}
            actions={[
              <Favourites.Actions.LikeButton
                creation={images[curImageIndex].creation}
                effects={{
                  setIsLiked: (isLiked: boolean) => {
                    setImageLiked(isLiked, image.id, post.id);
                  }
                }}
              />
            ]}
            renderComments={<ImageWindowComments creation={image.creation} />}
          />}
          renderCommentsWidget={(creation: OneCreation) => <PostCommentsWidget 
            creation={creation}
          />}
        />
      )}
    />
    </>
  )
}
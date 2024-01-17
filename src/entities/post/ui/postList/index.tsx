import { FC } from "react";
import { OnePost } from "../../model";
import { PostUi } from "..";
import Favourites from "../../../../fetures/favourites";
import { SharedUi } from "../../../../shared/sharedUi";

interface PLProps {
  posts: OnePost[],
  isLoading: boolean,
  isError: boolean,
  actions: React.FC<{post: OnePost, }>
}
export const PostList: FC<PLProps> = ({ posts, isLoading, isError }) => {

  return (
    <div className="post-list">
      <SharedUi.Helpers.LoadErrorHandler 
        isLoading={isLoading}
        isError={isError}
      >
        {posts && posts.length ? (
          posts.map((post, index) => <PostUi.PostCard 
            key={index}
            post={post}
            actions={[
              Favourites.Actions.LikeButton
            ]}
        />)
        ) : (
          <SharedUi.Divs.Empty
            body="There's no posts yet"
          />
        )}
      </SharedUi.Helpers.LoadErrorHandler>
    </div>
  )
}
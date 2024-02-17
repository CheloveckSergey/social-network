import { FC } from "react";
import { OnePost } from "../../model";
import { PostsUi } from "..";
import { SharedUi } from "../../../../shared/sharedUi";
import { PostEffects } from "../postCard";
import { OneCreation } from "../../../creation";
import './styles.scss';

interface PLProps {
  posts: OnePost[],
  isLoading: boolean,
  isError: boolean,
  fetchNextPage: () => void,
  hasNextPage: boolean | undefined,
  isFetchingNextPage: boolean,
  actions: React.FC<{creation: OneCreation, effects: PostEffects}>[],
}
export const PostList: FC<PLProps> = ({ posts, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, actions }) => {

  return (
    <div className="post-list">
      <SharedUi.Helpers.LoadErrorHandler 
        isLoading={isLoading}
        isError={isError}
      >
        {posts && posts.length ? (
          posts.map((post, index) => <PostsUi.PostCard 
            key={index}
            post={post}
            actions={actions}
        />)
        ) : (
          <SharedUi.Divs.Empty
            body="There's no posts yet"
          />
        )}
      </SharedUi.Helpers.LoadErrorHandler>
      {hasNextPage && (
        <div 
          className="load-more regular-panel"
        >
          {!isFetchingNextPage ? (
            <p 
              className="ref"
              onClick={() => fetchNextPage()}
            >
              Load more
            </p>
          ) : (
            <SharedUi.Icons.Spinner size={40} />
          )}
        </div>
      )}
      
    </div>
  )
}
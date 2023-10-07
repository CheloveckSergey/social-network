import { FC } from "react";
import { Post } from "../../entities/post";
import { PostUi } from "../../entities/post";
import './styles.scss';

interface FeedProps {
  posts: Post[]
}

const Feed: FC<FeedProps> = ({ posts }) => {
  let revercedPosts: Post[] = [];
  for (let post of posts) {
    revercedPosts.unshift(post)
  }

  return (
    <div className="feed-widget">
      {(posts.length > 0) ? revercedPosts.map((post, index) => (
        <PostUi.PostCard key={index} post={post} />
      )) : (
        <div className="regular-panel no-posts">
          <p>There's no any post here yet</p>
        </div>
      )}
    </div>
  )
}

export default Feed;
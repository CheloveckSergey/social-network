import { FC } from "react";
import { OnePost, Post } from "../../entities/post";
import { PostsUi } from "../../entities/post";
import './styles.scss';
import Favourites from "../../fetures/favourites";

interface FeedProps {
  posts: OnePost[]
}

const Feed: FC<FeedProps> = ({ posts }) => {
  let revercedPosts: OnePost[] = [];
  for (let post of posts) {
    revercedPosts.unshift(post)
  }

  return (
    <div className="feed-widget">
      {(posts.length > 0) ? revercedPosts.map((post, index) => (
        <PostsUi.PostCard key={index} post={post} actions={[Favourites.Actions.LikeButton]}/>
      )) : (
        <div className="regular-panel no-posts">
          <p>There's no any post here yet</p>
        </div>
      )}
    </div>
  )
}

export default Feed;
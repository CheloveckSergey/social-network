import { FC } from "react";
import { Post } from "../../entities/post";
import { PostUi } from "../../entities/post";

interface FeedProps {
  posts: Post[]
}

const Feed: FC<FeedProps> = ({ posts }) => {
  let revercedPosts: Post[] = [];
  for (let post of posts) {
    revercedPosts.unshift(post)
  }
  console.log(revercedPosts);

  return (
    <div>
      {revercedPosts.map((post, index) => (
        <PostUi.PostCard post={post} />
      ))}
    </div>
  )
}

export default Feed;
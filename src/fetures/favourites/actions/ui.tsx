import { FC, useState } from "react";
import { Post } from "../../../entities/post";

import { AiOutlineHeart } from 'react-icons/ai';
import "./styles.scss";
import { useAppSelector } from "../../../app/store";
import { PostApi } from "../../../entities/post/api";

const useToggleLike = (post: Post) => {
  const { user } = useAppSelector(state => state.user);
  let _isLiked = false;
  if (post.likes.find(like => like.userId === user?.id)) {
    _isLiked = true;
  }
  const [isLiked, setIsLiked] = useState<boolean>(_isLiked);
  const [likesNumber, setLikesNumber] = useState<number>(post.likes.length);
  const toggleLike = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikesNumber(likesNumber - 1);
      PostApi.deletePostLike(user?.id, post.id)
    } else {
      setLikesNumber(likesNumber + 1);
      PostApi.createPostLike(user?.id, post.id)
    }
  }
  return { isLiked, likesNumber, toggleLike };
}

interface PostLikeProps {
  post: Post
}

export const PostLike: FC<PostLikeProps> = ({ post }) => {

  const { isLiked, likesNumber, toggleLike } = useToggleLike(post)

  return (
    <button 
      className='post-like'
      onClick={() => toggleLike()}
    >
      <AiOutlineHeart size={25} className={`${isLiked ? 'liked' : ''}`} />
      <p className="extra">{likesNumber}</p>
    </button>
  )
}
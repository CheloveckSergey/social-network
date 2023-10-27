import { FC, useState } from "react";
import { AiOutlineHeart } from 'react-icons/ai';
import "./styles.scss";
import { useAppSelector } from "../../../app/store";
import { Like, LikesApi } from "../../../entities/like";
import { Creation } from "../../../entities/creation";

const useToggleLike = (creation: Creation) => {
  const { user } = useAppSelector(state => state.user);

  let _isLiked = false;
  if (creation.likes.find(like => like.userId === user?.id)) {
    _isLiked = true;
  }
  const [isLiked, setIsLiked] = useState<boolean>(_isLiked);
  const [likesNumber, setLikesNumber] = useState<number>(creation.likes.length);
  const toggleLike = () => {
    if (!user) {
      return;
    }
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikesNumber(likesNumber - 1);
      LikesApi.deleteLike(user.id, creation.id);
    } else {
      setLikesNumber(likesNumber + 1);
      LikesApi.createLike(user.id, creation.id);
    }
  }
  return { isLiked, likesNumber, toggleLike };
}

interface LikeButtonProps {
  creation: Creation,
}

export const LikeButton: FC<LikeButtonProps> = ({ creation }) => {

  const { isLiked, likesNumber, toggleLike } = useToggleLike(creation);

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
// interface PostLikeProps {
//   post: Post
// }

// export const PostLike: FC<PostLikeProps> = ({ post }) => {

//   const { isLiked, likesNumber, toggleLike } = useToggleLike(post)

//   return (
//     <button 
//       className='post-like'
//       onClick={() => toggleLike()}
//     >
//       <AiOutlineHeart size={25} className={`${isLiked ? 'liked' : ''}`} />
//       <p className="extra">{likesNumber}</p>
//     </button>
//   )
// }

// interface ImageLikeProps {
//   image: Image,
// }

// export const ImageLike: FC<ImageLikeProps> = ({ image }) => {

//   const { isLiked, likesNumber, toggleLike } = useToggleImageLike(image)

//   function useToggleImageLike(image: Image) {
//     const { user } = useAppSelector(state => state.user);
//     let _isLiked = false;
//     if (image.likes.find(like => like.userId === user?.id)) {
//       _isLiked = true;
//     }
//     const [isLiked, setIsLiked] = useState<boolean>(_isLiked);
//     const [likesNumber, setLikesNumber] = useState<number>(image.likes.length);
//     const toggleLike = () => {
//       setIsLiked(!isLiked);
//       if (isLiked) {
//         setLikesNumber(likesNumber - 1);
//         ImageLikeApi.deleteImageLike(user?.id, image.id);
//       } else {
//         setLikesNumber(likesNumber + 1);
//         ImageLikeApi.createImageLike(user?.id, image.id)
//       }
//     }
//     return { isLiked, likesNumber, toggleLike };
//   }

//   return (
//     <button 
//       className='post-like'
//       onClick={() => toggleLike()}
//     >
//       <AiOutlineHeart size={25} className={`${isLiked ? 'liked' : ''}`} />
//       <p className="extra">{likesNumber}</p>
//     </button>
//   )
// }
import { useQuery } from "react-query"
import { MeUser } from "../../user"
import { PostApi } from "../api"
import { OnePost } from "../model"
import { useState } from "react"

const feedKeys = {
  root: 'feed',
  slug: (authorId: number) => [feedKeys.root, authorId],
}

const useFeedByAuthor = (authorId: number, meUser: MeUser) => {

  const [feed, setFeed] = useState<OnePost[]>([]);

  const feedStatus = useQuery({
    queryKey: feedKeys.slug(authorId),
    queryFn: () => {
      return PostApi.getFeedByAuthorId(authorId)
    },
    onSuccess: (data) => {
      setFeed(data);
    }
  });

  return {
    feed,
    isLoading: feedStatus.isLoading,
    isError: feedStatus.isError,
  }
}

const usePostInterface = (inputPost: OnePost) => {
  const [post, setPost] = useState<OnePost>(inputPost);

  function setIsLiked(isLiked: boolean): void {
    setPost({
      ...post,
      creation: {
        ...post.creation,
        isLiked,
        likeNumber: isLiked ? post.creation.likeNumber + 1 : post.creation.likeNumber - 1,
      }
    });
  }

  return {
    post,
    setIsLiked,
  }
}

export const PostsLib = {
  useFeedByAuthor,
  usePostInterface,
}
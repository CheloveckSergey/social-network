import { useMutation } from "react-query"
import { OnePost, PostApi } from "../../../entities/post"

interface CreateRepostParams {
  repostId: number,
  authorId: number,
}

export const useMakeRepost = () => {

  const status = useMutation({
    mutationFn: ({repostId, authorId} : CreateRepostParams) => {
      return PostApi.createRepost(repostId, authorId);
    },
  })

  return status;
}

interface CreatePostParams {
  description: string,
  images: File[],
  musicIds: number[],
}
export const useAddPost = (authorId: number, addPost?: (post: OnePost) => void) => {

  const status = useMutation({
    mutationFn: ({ description, images, musicIds } : CreatePostParams) => {
      return PostApi.createPost(authorId, description, images, musicIds);
    },
    onSuccess: (data) => {
      if (addPost) {
        addPost(data)
      }
    }
  });

  return status;
}

export const PostsFeaturesLib = {
  useMakeRepost,
  useAddPost,
}
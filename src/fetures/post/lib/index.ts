import { useMutation } from "react-query"
import { PostApi } from "../../../entities/post"

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

export const PostsFeaturesLib = {
  useMakeRepost,
}
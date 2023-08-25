import api from "../../../shared/http";
import { Post } from "../model";

type PULikeReqDto = {
  userId: number | undefined,
  postUserId: number,
}

export class PostApi {
  static async getAllPostsByUserId(id: number) {
    const response = await api.get<Post[]>(`/postUser/getAllPostByUserId/${id}`);
    console.log(response);
    return response.data;
  }

  static async createPostUser(formData: FormData) {
    const response = await api.post(
      '/postUser/createPostUser',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return response;
  }

  static async createPostLike(userId: number | undefined, postUserId: number) {
    const response = await api.post(
      '/postLikes/createPostLike',
      {userId, postUserId}
    );
    return response
  }

  static async deletePostLike(userId: number | undefined, postUserId: number) {
    const response = await api.post(
      '/postLikes/deletePostLike',
      {userId, postUserId}
    );
    return response
  }
}
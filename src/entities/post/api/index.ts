import api from "../../../shared/http";
import { Post } from "../model";

type PULikeReqDto = {
  userId: number | undefined,
  postUserId: number,
}

const initialUrl = '/post';

export class PostApi {
  static async getAllPostsByUserId(id: number) {
    const response = await api.get<Post[]>(initialUrl + `/getAllPostByUserId/${id}`);
    return response.data;
  }

  static async getAllPostsByGroupName(name: string) {
    const response = await api.get<Post[]>(initialUrl + `/getAllPostByGroupName/${name}`);
    return response.data;
  }

  static async createPostUser(formData: FormData) {
    console.log(formData);
    const response = await api.post(
      initialUrl+ '/createPostUser',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return response;
  }

  static async createGroupPost(formData: FormData) {
    const response = await api.post(
      initialUrl+ '/createGroupPost',
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
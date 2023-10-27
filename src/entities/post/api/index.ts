import api from "../../../shared/http";
import { Post } from "../model";

const INITIAL_URL = '/posts';

export class PostApi {
  static async getAllPostsByAuthorId(authorId: number) {
    console.log('Траляля');
    const response = await api.get<Post[]>(INITIAL_URL + '/getAllPostByAuthorId/' + authorId);
    return response.data;
  }

  static async createPost(formData: FormData) {
    const response = await api.post(
      INITIAL_URL + '/createPost',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return response;
  }
}
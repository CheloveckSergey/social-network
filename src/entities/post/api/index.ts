import api from "../../../shared/http";
import { OnePost, Post } from "../model";

interface FeedQuery {
  offset?: number,
  limit?: number,
}

const INITIAL_URL = '/posts';

export class PostApi {
  static async getAllPostsByAuthorId(authorId: number) {
    const response = await api.get<Post[]>(INITIAL_URL + '/getAllPostByAuthorId/' + authorId);
    return response.data;
  }

  static async getAllOnePostsByAuthorId(authorId: number) {
    const response = await api.get<OnePost[]>(INITIAL_URL + '/getAllOnePostsByAuthorId/' + authorId);
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

  ////////////////////////////////////////////////////////

  static async getFeedByAuthorId(authorId: number, query?: FeedQuery) {
    const response = await api.get<OnePost[]>(
      INITIAL_URL + '/getFeedByAuthorId/' + authorId,
      {
        params: query,
      }
    );
    return response.data;
  }
}
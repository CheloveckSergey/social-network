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

  static async createPost(authorId: number, description: string, images: File[], musicIds: number[]) {
    const formData = new FormData();
    formData.append('authorId', String(authorId));
    formData.append('description', description);
    images.forEach(image => formData.append('img', image));
    musicIds.forEach(musicId => formData.append('musicIds[]', String(musicId)));
    const response = await api.post<OnePost>(
      INITIAL_URL + '/createPost',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return response.data;
  }

  static async createRepost(repostId: number, authorId: number) {
    const response = await api.post(
      INITIAL_URL + '/createRepost',
      {
        repostId, 
        authorId,
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
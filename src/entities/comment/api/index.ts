import api from "../../../shared/http";
import { Comment } from "../model";

const initialUrl = '/comments';

class CommentApi {
  static async getCommentsByImageId(imageId: number) {
    const response = await api.get<Comment[]>(initialUrl + '/getCommentsByImageId/' + imageId);
    return response.data;
  }

  static async getCommentsByPostId(postId: number) {
    const response = await api.get<Comment[]>(initialUrl + '/getCommentsByPostId/' + postId);
    return response.data;
  }

  static async createImageComment(formData: FormData) {
    const response = await api.post(
      initialUrl + '/createImageComment',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return response; 
  }

  static async createPostComment(formData: FormData) {
    const response = await api.post(
      '/comments/createPostComment',
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

export default CommentApi;
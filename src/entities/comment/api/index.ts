import api from "../../../shared/http";
import { Comment, OneComment } from "../model";

const INITIAL_URL = '/comments';

export class CommentApi {
  static async getAllCommentsByCreationId(creationId: number) {
    const response = await api.get<OneComment[]>(INITIAL_URL + '/getCommentsToCreationId/' + creationId);
    return response.data;
  }

  static async createComment(authorId: number, creationId: number, text: string, responseToCommentId?: number) {
    const response = await api.post<OneComment>(
      INITIAL_URL + '/createComment',
      {
        authorId, 
        creationId, 
        text,
        responseToCommentId
      }
    );
    return response.data; 
  }
}

export default CommentApi;
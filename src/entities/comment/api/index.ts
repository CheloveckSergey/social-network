import api from "../../../shared/http";
import { Comment } from "../model";

const INITIAL_URL = '/comments';

class CommentApi {
  static async getAllCommentsByCreationId(creationId: number) {
    const response = await api.get<Comment[]>(INITIAL_URL + '/getCommentsToCreationId/' + creationId);
    return response.data;
  }

  static async createComment(authorId: number, creationId: number, text: string) {
    const response = await api.post(
      INITIAL_URL + '/createComment',
      {
        authorId, 
        creationId, 
        text,
      }
    );
    return response; 
  }
}

export default CommentApi;
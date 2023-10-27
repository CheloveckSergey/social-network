import api from "../../../shared/http";
import { Like } from "../model";

const INITIAL_URL = '/likes';

export class LikesApi {
  static async getLikesByCreationId(creationId: number) {
    const response = await api.get<Like[]>(INITIAL_URL + '/getByCreationId/' + creationId);
    return response.data;
  }

  static async createLike(userId: number, creationId: number) {
    const response = await api.post(
      INITIAL_URL + '/createLike',
      {
        userId, 
        creationId,
      }
    );
    return response;
  }

  static async deleteLike(userId: number, creationId: number) {
    const response = await api.post(
      INITIAL_URL + '/deleteLike',
      {
        userId, 
        creationId,
      }
    );
    return response;
  }
}
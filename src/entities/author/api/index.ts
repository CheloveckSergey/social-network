import api from "../../../shared/http";
import { OneUser } from "../../user";

export class AuthorApi {
  static async subscribe(userId: number, authorId: number) {
    const response = await api.post(
      '/author/subscribe',
      { userId, authorId }
    );
    return response.data;
  }

  static async unsubscribe(userId: number, authorId: number) {
    const response = await api.post(
      '/author/unsubscribe',
      { userId, authorId }
    );
    return response.data;
  }

  static async getSubsByAuthorId(authorId: number) {
    const response = await api.get<OneUser[]>('/author/getSubsByAuthorId/' + authorId);
    return response.data;
  }

  static async getSubsByGroupId(groupId: number) {
    const response = await api.get<OneUser[]>('/group/getSubsByGroupId/' + groupId);
    return response.data;
  }
}
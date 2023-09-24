import api from "../../../shared/http";

export class AuthorApi {
  static async subscribe(authorId: number) {
    const response = await api.post('/author/subscribe/' + authorId);
    return response.data;
  }

  static async unsubscribe(authorId: number) {
    const response = await api.post('/author/unsubscribe/' + authorId);
    return response.data;
  }
}
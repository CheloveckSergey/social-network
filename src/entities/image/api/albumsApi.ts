import api from "../../../shared/http";
import { OneAlbum } from "../model";

const INITIAL_URL = '/albums';

export class AlbumsApi {
  static async getAllAlbumsWithOneImagesByAuthorId(authorId: number) {
    const response = await api.get<OneAlbum[]>(
      INITIAL_URL + '/getAllAlbumsWithOneImagesByAuthorId/' + authorId,
    );
    return response.data;
  }
}
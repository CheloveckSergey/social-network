import api from "../../../shared/http";
import { OneAlbum } from "../model";

const INITIAL_URL = '/albums';

export class AlbumsApi {
  static async getAllOneAlbumsByAuthorId(authorId: number) {
    const response = await api.get<OneAlbum[]>(
      INITIAL_URL + '/getAllOneAlbumsByAuthorId/' + authorId,
    );
    return response.data;
  }

  static async getAllAlbumsWithOneImagesByAuthorId(authorId: number) {
    const response = await api.get<OneAlbum[]>(
      INITIAL_URL + '/getAllAlbumsWithOneImagesByAuthorId/' + authorId,
    );
    return response.data;
  }

  static async createAlbum(authorId: number, name: string) {
    const response = await api.post<OneAlbum>(
      INITIAL_URL + '/createAlbum',
      {
        authorId,
        name,
      }
    );
    return response.data;
  }
}
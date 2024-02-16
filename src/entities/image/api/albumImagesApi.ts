import api from "../../../shared/http";
import { OneAlbumImage } from "../model";

const INITIAL_URL = '/album-images'

export class AlbumImagesApi {
  static async getAllAlbumImagesByAuthor(authorId: number) {
    const response = await api.get<OneAlbumImage[]>(INITIAL_URL + '/getAllAlbumImagesByAuthor/' + authorId);
    return response.data
  }

  static async createImageByAuthor(authorId: number, value: File, albumId?: number) {
    const form = new FormData();
    form.append('authorId', String(authorId));
    form.append('img', value);
    if (albumId) {
      form.append('albumId', String(albumId));
    }
    const response = await api.post<OneAlbumImage>(
      INITIAL_URL + '/create',
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return response.data;
  }
}
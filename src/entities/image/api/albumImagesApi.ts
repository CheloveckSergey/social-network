import api from "../../../shared/http";
import { Album, OneAlbumImage, OneImage } from "../model";

const INITIAL_URL = '/album-images'

export class AlbumImagesApi {
  static async getAllAlbumImagesByAuthor(authorId: number) {
    const response = await api.get<OneAlbumImage[]>(INITIAL_URL + '/getAllAlbumImagesByAuthor/' + authorId);
    return response.data
  }

  static async getAllImagesByAlbum(albumId: number) {
    const response = await api.get<OneAlbumImage[]>(INITIAL_URL + '/getAllImagesByAlbum/' + albumId);
    return response.data;
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

  static async deleteImage(imageId: number) {
    const response = await api.post<OneImage>(
      INITIAL_URL + '/delete',
      {
        imageId,
      }
    );
    return response.data;
  }

  static async deleteAlbum(albumId: number) {
    const response = await api.post<Album>(
      INITIAL_URL + '/deleteAlbum',
      {
        albumId,
      }
    );
    return response.data;
  }
}
import api from "../../../shared/http"
import { Musician } from "../model";

const INITIAL_URL = '/musicians';

export class MusicianApi {
  static async getById(musicianId: number) {
    const response = await api.get<Musician>(INITIAL_URL + '/getById/' + musicianId);
    return response.data;
  }

  static async updateAvatar(musicianId: number, imageFile: File) {
    const form = new FormData();
    form.append('musicianId', String(musicianId));
    form.append('imageFile', imageFile);
    const response = await api.post<Musician>(
      INITIAL_URL + '/updateAvatar',
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
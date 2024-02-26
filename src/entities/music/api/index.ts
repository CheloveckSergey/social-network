import api from "../../../shared/http";
import { Music } from "../model";

const INITIAL_URL = '/musics';

export class MusicApi {
  static async getAll() {
    const response = await api.get<Music[]>(INITIAL_URL + '/getAll');
    return response.data;
  }

  static async create(musicName: string, musicianName: string, musicFile: File, imageFile?: File) {
    const form = new FormData();
    form.append('musicName', musicName);
    form.append('musicianName', musicianName);
    form.append('img', musicFile);
    const response = await api.post<Music>(
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
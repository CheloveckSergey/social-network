import api from "../../../shared/http";
import { Music, MyMusic } from "../model";

const INITIAL_URL = '/musics';

export class MusicApi {
  static async getAll(authorId: number) {
    const response = await api.get<MyMusic[]>(INITIAL_URL + '/getAll?authorId=' + authorId);
    return response.data;
  }

  static async getAllByMusician(musicianId: number) {
    const response = await api.get<Music[]>(INITIAL_URL + '/getAllByMusician/' + musicianId);
    return response.data;
  }

  static async getAllAddedMusic(authorId: number) {
    const response = await api.get<MyMusic[]>(INITIAL_URL + '/getAllAddedMusic/' + authorId);
    return response.data;
  }

  static async create(musicName: string, musicianName: string, musicFile: File, imageFile?: File, albumId?: number) {
    const form = new FormData();
    form.append('musicName', musicName);
    form.append('musicianName', musicianName);
    form.append('music', musicFile);
    if (imageFile) {
      form.append('image', imageFile);
    }
    if (albumId) {
      form.append('albumId', String(albumId));
    }
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

  static async addMusicToAdded(musicId: number, authorId: number) {
    const response = await api.post<Music>(
      INITIAL_URL + '/addMusicToAdded',
      { musicId, authorId },
    );
    return response.data;
  }

  static async deleteMusicFromAdded(musicId: number, authorId: number) {
    const response = await api.post<Music>(
      INITIAL_URL + '/deleteMusicFromAdded',
      { musicId, authorId },
    );
    return response.data;
  }

  static async delete(id: number) {
    const response = await api.delete<Music>(INITIAL_URL + '/delete/' + id);
    return response.data;
  }
}
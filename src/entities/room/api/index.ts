import api from "../../../shared/http";
import { Room, RoomMember, RoomType } from "../model";

const INITIAL_URL = '/rooms';

export class RoomApi {
  static async getAllRoomsByUserId(userId: number) {
    const response = await api.get<Room[]>(INITIAL_URL + '/getAllRoomsByUserId/' + userId);
    return response.data;
  }

  static async getPersonalRoom(userId1: number, userId2: number) {
    const response = await api.post<Room>(
      INITIAL_URL + '/getPersonalRoom',
      {
        userId1, userId2,
      }
    );
    return response.data;
  }

  static async createRoom(userId: number, type: RoomType) {
    const response = await api.post<Room>(
      INITIAL_URL + '/createRoom',
      {
        userId,
        type,
      }
    );
    return response.data;
  }

  static async createPersonalRoom(userId1: number,  userId2: number) {
    const response = await api.post<Room>(
      INITIAL_URL + '/createPersonalRoom',
      {
        userId1,
        userId2
      }
    );
    return response.data;
  }

  static async addRoomMember(userId: number, roomId: number) {
    const response = await api.post<RoomMember>(
      INITIAL_URL + '/addRoomMember',
      {
        userId,
        roomId,
      }
    );
    return response.data;
  }

  static async deleteRoomMember(userId: number, roomId: number) {
    const response = await api.post(
      INITIAL_URL + '/deleteRoomMember',
      {
        userId,
        roomId,
      }
    );
    return response;
  }
}
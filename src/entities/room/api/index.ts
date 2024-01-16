import api from "../../../shared/http";
import { Message } from "../../message";
import { OneUser } from "../../user";
import { Room, RoomMember, RoomType, RoomWithMembers, RoomWithMembersAndLastMessage } from "../model";

const INITIAL_URL = '/rooms';

export class RoomApi {
  static async getRoomById(id: number) {
    const response = await api.get<RoomWithMembers>(INITIAL_URL + '/getRoomById/' + id);
    return response.data;
  }

  static async getAllRoomsByUserId(userId: number) {
    const response = await api.get<RoomWithMembersAndLastMessage[]>(INITIAL_URL + '/getAllRoomsByUserId/' + userId);
    return response.data;
  }

  static async getPersonalRoom(userId1: number, userId2: number) {
    const response = await api.post<RoomWithMembers>(
      INITIAL_URL + '/getPersonalRoom',
      {
        userId1, userId2,
      }
    );
    return response.data;
  }

  static async getAllPossibleMembers(roomId: number, userId: number) {
    const response = await api.post<OneUser[]>(
      INITIAL_URL + '/getAllPossibleMembers',
      {
        userId,
        roomId,
      }
    );
    return response.data;
  }

  static async getAllMembersByRoom(roomId: number) {
    const response = await api.get<RoomMember[]>(
      INITIAL_URL + '/getAllMembersByRoom/' + roomId,
    );
    return response.data;
  }

  static async createRoom(userId: number, type: RoomType) {
    const response = await api.post<RoomWithMembers>(
      INITIAL_URL + '/createRoom',
      {
        userId,
        type,
      }
    );
    return response.data;
  }

  static async createGeneralRoom(adminId: number, name: string, userIds: number[], roomAvatar?: File) {
    const form = new FormData();
    form.append('adminId', String(adminId));
    form.append('name', name);
    if (roomAvatar) {
      form.append('img', roomAvatar);
    }
    userIds.forEach(userId => form.append('userIds[]', String(userId)));
    const response = await api.post<RoomWithMembers>(
      INITIAL_URL + '/createGeneralRoom',
      form,
    );
    return response.data;
  }

  static async createPersonalRoom(userId1: number,  userId2: number) {
    const response = await api.post<RoomWithMembers>(
      INITIAL_URL + '/createPersonalRoom',
      {
        userId1,
        userId2
      }
    );
    return response.data;
  }

  static async createPRoomAndWMessage(userId1: number, userId2: number, text: string) {
    const response = await api.post<RoomWithMembers>(
      INITIAL_URL + '/createPRoomAndWMessage',
      {
        userId1,
        userId2,
        text
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

  static async addRoomMembers(userIds: number[], roomId: number) {
    const response = await api.post<RoomMember[]>(
      INITIAL_URL + '/addRoomMembers',
      {
        userIds,
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
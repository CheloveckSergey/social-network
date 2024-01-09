import api from "../../../shared/http";
import { OneUser } from "../../user";

export class FriendsApi {
  static async getPossibleFriends(userId: number) {
    const response = await api.get<OneUser[]>('/users/getPossibleFriends/' + userId);
    return response.data;
  }

  static async getAllFriends(userId: number) {
    const response = await api.get<OneUser[]>('/users/getAllFriends/' + userId);
    return response.data;
  }

  static async addFriend(userId1: number, userId2: number) {
    const response = await api.post(
      '/users/createFriendship',
      { userId1, userId2 }
    );
    return response.data;
  } 

  static async deleteFriend(friendId: number) {
    const response = await api.post('/users/deleteFriendship/' + friendId);
    return response.data;
  }
}
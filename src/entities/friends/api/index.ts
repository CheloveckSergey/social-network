import api from "../../../shared/http";
import { OneUser } from "../../user";

const INITIAL_URL = '/friends';

export class FriendsApi {
  static async getPossibleFriends(userId: number) {
    const response = await api.get<OneUser[]>(INITIAL_URL + '/getPossibleFriends/' + userId);
    return response.data;
  }

  static async getAllFriends(userId: number) {
    const response = await api.get<OneUser[]>(INITIAL_URL + '/getAllFriends/' + userId);
    return response.data;
  }

  // static async addFriend(userId1: number, userId2: number) {
  //   const response = await api.post(
  //     INITIAL_URL + '/createFriendship',
  //     { userId1, userId2 }
  //   );
  //   return response.data;
  // } 

  static async deleteFriend(friendId: number) {
    const response = await api.post(INITIAL_URL + '/deleteFriendship/' + friendId);
    return response.data;
  }

  static async cancelDeleteFriend(userId1: number, userId2: number) {
    const response = await api.post(
      INITIAL_URL + '/cancelDeleteFriend',
      {
        userId1,
        userId2, 
      }
    );
    return response;
  }

  static async getAllActiveOutcomeRequestsByUser(userId: number) {
    const response = await api.get(INITIAL_URL + '/getAllActiveOutcomeRequestsByUser/' + userId);
    return response;
  }

  static async getAllActiveIncomeRequestsByUser(userId: number) {
    const response = await api.get(INITIAL_URL + '/getAllActiveIncomeRequestsByUser/' + userId);
    return response;
  }

  static async createRequest(userId1: number, userId2: number) {
    const response = await api.post(
      INITIAL_URL + '/createRequest',
      {
        userId1,
        userId2, 
      }
    );
    return response;
  }

  static async rejectRequest(requestId: number) {
    const response = await api.post(
      INITIAL_URL + '/rejectRequest',
      {
        requestId, 
      }
    );
    return response;
  }

  static async acceptRequest(requestId: number) {
    const response = await api.post(
      INITIAL_URL + '/acceptRequest',
      {
        requestId, 
      }
    );
    return response;
  }
}
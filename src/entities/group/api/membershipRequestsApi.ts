import api from "../../../shared/http"
import { MembershipRequest } from "../model";

const INITIAL_URL = '/membershipRequests'

export class MembershipRequestsApi {
  static async getAllWaitingRequests(groupId: number) {
    const response = await api.get<MembershipRequest[]>(INITIAL_URL + '/getAllWaitingRequests/' + groupId);
    return response.data;
  }

  static async getAllRejectedRequests(groupId: number) {
    const response = await api.get<MembershipRequest[]>(INITIAL_URL + '/getAllRejectedRequests/' + groupId);
    return response.data;
  }

  static async createRequest(groupId: number) {
    const response = await api.post<MembershipRequest>(
      INITIAL_URL + '/createRequest',
      { groupId }
    );
    return response.data;
  }

  
  static async acceptRequest(requestId: number) {
    const response = await api.post<MembershipRequest>(
      INITIAL_URL + '/acceptRequest',
      { requestId }
      );
      return response.data;
    }
    
  static async rejectRequest(requestId: number) {
    const response = await api.post<MembershipRequest>(
      INITIAL_URL + '/rejectRequest',
      { requestId }
      );
    return response.data;
  }
  
  static async deleteRequest(userId: number, groupId: number) {
    const response = await api.post(
      INITIAL_URL + '/deleteRequest',
      {
        userId,
        groupId,
      }
    );
    return response;
  }
}
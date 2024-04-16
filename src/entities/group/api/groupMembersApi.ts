import api from "../../../shared/http";
import { GMTypes, GroupMember } from "../model";

const INITIAL_URL = '/groupMembers'

export class GroupMembersApi {
  static async getAllMembers(groupId: number) {
    const response = await api.get<GroupMember[]>(INITIAL_URL + '/getAllMembers/' + groupId);
    return response.data;
  }

  static async changeMemberType(memberId: number, type: GMTypes) {
    const response = await api.post<GroupMember>(
      INITIAL_URL + '/changeMemberType',
      {
        memberId, 
        type,
      }
    );
    return response.data;
  }

  static async deleteMember(memberId: number) {
    const response = await api.post(
      INITIAL_URL + '/deleteMember',
      { memberId },
    );
    return response.data;
  }

  static async cancelAcceptRequest(userId: number, groupId: number) {
    const response = await api.post(
      INITIAL_URL + '/cancelAcceptRequest',
      { userId, groupId }
    );
    return response.data;
  }
}
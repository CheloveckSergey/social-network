import api from "../../../shared/http";
import { Group, OneGroup, OneGroupWithMembership } from "../model";

const INITIAL_URL = '/groups';

export class GroupApi {
  static async getAllGroups() {
    const groups = await api.get<OneGroup[]>(INITIAL_URL + '/getAllGroups');
    return groups.data;
  }

  static async getGroupById(id: number) {
    const groups = await api.get<OneGroup>(INITIAL_URL + '/getGroupById/' + id);
    return groups.data;
  }

  static async getOneGroupWithMembershipById(id: number) {
    const groups = await api.get<OneGroupWithMembership>(INITIAL_URL + '/getOneGroupWithMembershipById/' + id);
    return groups.data;
  }

  static async createGroup(formData: FormData) {
    const response = await api.post(
      INITIAL_URL + '/createGroup',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return response;
  }

  static async updateName(name: string, groupId: number) {
    const response = await api.post<Group>(
      INITIAL_URL + '/updateName',
      { name, groupId },
    );
    return response.data;
  }

  static async updateAvatar(imageFile: File, groupId: number) {
    const formData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('groupId', String(groupId));
    const response = await api.post<Group>(
      INITIAL_URL + '/updateAvatar',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return response.data;
  }

  static async deleteGroup(groupId: number) {
    const response = await api.post(
      INITIAL_URL + '/deleteGroup',
      {
        groupId,
      }
    );
    return response.data;
  }
  
  static async loadAvatar(formData: FormData) {
    const response = await api.post(
      INITIAL_URL + '/createAvatar',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return response;
  }
}

export * from './groupMembersApi'
export * from './membershipRequestsApi'
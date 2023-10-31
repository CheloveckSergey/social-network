import api from "../../../shared/http";
import { Group, GroupWithSubscribed } from "../model";

const INITIAL_URL = '/groups';

export class GroupApi {
  static async getAllGroups() {
    const groups = await api.get<Group[]>(INITIAL_URL + '/getAllGroups');
    return groups.data;
  }

  static async getGroupById(id: number) {
    const groups = await api.get<GroupWithSubscribed>(INITIAL_URL + '/getGroupById/' + id);
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
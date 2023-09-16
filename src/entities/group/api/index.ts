import api from "../../../shared/http";
import { User } from "../../user/model/types";
import { CreateGroupDto, DeleteGrouDto, Group } from "../model";

export class GroupApi {
  static async getAllGroups() {
    const groups = await api.get<Group[]>('/group/getAllGroups');
    return groups.data;
  }

  static async getGroupByName(name: string) {
    const groups = await api.get<Group>('/group/getGroupByName/' + name);
    return groups.data;
  }

  static async getGroupById(id: number) {
    const groups = await api.get<Group>('/group/getGroupById/' + id);
    return groups.data;
  }

  static async getAdminGroupsByUserId(id: number) {
    const groups = await api.get<Group[]>('/group/getAdminGroupsByUserId/' + id);
    return groups.data;
  }

  static async createGroup(formData: FormData) {
    const response = await api.post(
      '/group/createGroup',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return response;
  }

  static async deleteGroupById(dto: DeleteGrouDto) {
    const groups = await api.post(
      '/group/deleteGroupById',
      { groupId: dto.groupId }
    );
    return groups.data;
  }

  static async getAllSubsByGroupId(id: number) {
    const groups = await api.get<User[]>('/group/getAllSubsByGroupId/' + id);
    return groups.data;
  }

  static async subscribe(groupId: number) {
    const groups = await api.post('/group/subscribe/' + groupId);
    return groups.data;
  }

  static async unsubscribe(groupId: number) {
    const groups = await api.post('/group/unsubscribe/' + groupId);
    return groups.data;
  }
  
  static async loadAvatar(formData: FormData) {
    const response = await api.post(
      '/group/createAvatar',
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
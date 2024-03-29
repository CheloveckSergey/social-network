import api from "../../../shared/http";
import { Author } from "../../author/model";
import { OneUser } from "../model";

type UserDesc = {
  data: string | undefined,
  city: string | undefined,
  familyStatus: string | undefined,
  work:string | undefined,
  telephone: string | undefined,
  quote:string | undefined,
}

export class UserApi {
  static async getAllUsers() {
    const response = await api.get<OneUser[]>('/users/getAll');
    return response.data;
  }

  static async getUserById(userId: number) {
    const response = await api.get<OneUser>('/users/getUserById/' + userId);
    return response.data;
  }

  static async getOneUserById(userId: number) {
    const response = await api.get<OneUser>('/users/getOneUserById/' + userId);
    return response.data;
  }

  static async loadAvatar(formData: FormData) {
    const response = await api.post(
      '/users/createAvatar',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return response;
  }

  static async getUserDesc(userId: number) {
    const response = await api.get<UserDesc>('/user-desc/getDesc/' + userId);
    return response.data;
  }

  static async getAuthorByUserId(userId: number) {
    const response = await api.get<Author>('/users/getAuthorByUserId/' + userId);
    return response;
  }

  static async getAllSubsByAuthorId(authorId: number) {
    const response = await api.get<OneUser[]>('/users/getAllSubsByAuthorId/' + authorId);
    return response.data;
  }
}
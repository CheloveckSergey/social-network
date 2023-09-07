import api from "../../../shared/http";
import { Image } from "../model";

const initialUrl = '/images';

class ImageApi {
  static async createByUserId(formData: FormData) {
    const response = await api.post(
      initialUrl + '/createByUserId',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return response; 
  }

  static async createByGroupId(formData: FormData) {
    const response = await api.post(
      initialUrl + '/createByGroupId',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return response; 
  }

  static async getAllImagesByUserId(userId: number) {
    const response = await api.get<Image[]>(initialUrl + '/getAllImagesByUserId/' + userId);
    return response.data;
  }

  static async getAllImagesByGroupId(groupId: number) {
    const response = await api.get<Image[]>(initialUrl + '/getAllImagesByGroupId/' + groupId);
    return response.data;
  }
}

export default ImageApi;
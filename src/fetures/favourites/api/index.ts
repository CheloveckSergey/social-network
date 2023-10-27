import api from "../../../shared/http";
import { ILike } from "../model";

const initialUrl = '/images-likes';

export class ImageLikeApi {
  // static async getByImageId(imageId: number) {
  //   const likes = await api.get<ILike[]>(initialUrl + '/getByImageId/' + imageId);
  //   return likes;
  // }

  // static async getByUserId(userId: number) {
  //   const likes = await api.get<ILike[]>(initialUrl + '/getByUserId/' + userId);
  //   return likes;
  // }

  // static async createImageLike(userId: number | undefined, imageId: number) {
  //   const response = await api.post(
  //     initialUrl + '/createImageLike',
  //     {userId, imageId}
  //   );
  //   return response;
  // }

  // static async deleteImageLike(userId: number | undefined, imageId: number) {
  //   const response = await api.post(
  //     initialUrl + '/deleteImageLike',
  //     {userId, imageId}
  //   );
  //   return response;
  // }
}

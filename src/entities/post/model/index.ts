import { Creation, OneCreation } from "../../creation";
import { Image, OneImage } from "../../image";

export interface Post {
  id: number,
  description: string | undefined,
  creation: Creation,
  postImages: Image[],
}

export interface OnePost {
  [x: string]: any;
  post: any;
  id: number,
  description: string | undefined,
  creationId: number,
  creation: OneCreation,
  postImages: OneImage[],
}
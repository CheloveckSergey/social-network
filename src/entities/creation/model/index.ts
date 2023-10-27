import { Author } from "../../author";
import { Like } from "../../like";
import { Comment } from "../../comment";

export enum CrTypeCodes {
  POST = 10,
  ALBUM_IMAGE = 20,
  POST_IMAGE = 21,
  COMMENT = 30,
  ALBUM = 40,
}

export enum CrTypesNames {
  POST = 'post',
  ALBUM_IMAGE = 'album-image',
  POST_IMAGE = 'post-image',
  COMMENT = 'comment',
  ALBUM = 'album',
}

export type CreationType = {
  id: number,
  code: CrTypeCodes,
  name: CrTypesNames,
}

export interface Creation {
  id: number,
  author: Author,
  type: CreationType,
  createdAt: string,
  likes: Like[],
  comments: Comment[],
}
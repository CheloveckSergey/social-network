import { Author } from "../../author/model";
import { Group } from "../../group/model";
import { User } from "../../user/model";

export interface Post {
  id: number,
  description: string | undefined,
  image: string | undefined,
  createdAt: string,
  author: Author,
  postLikes: Like[],
}

export type Like = {
  id: number,
  userId: number | undefined,
  postUserId: number,
}
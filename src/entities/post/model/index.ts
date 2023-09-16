import { Author } from "../../author/model";
import { Comment } from "../../comment/model";
import { Group } from "../../group/model";
import { User } from "../../user/model/types";

export interface Post {
  id: number,
  description: string | undefined,
  image: string | undefined,
  createdAt: string,
  author: Author,
  postLikes: Like[],
  comments: Comment[],
}

export type Like = {
  id: number,
  userId: number | undefined,
  postUserId: number,
}
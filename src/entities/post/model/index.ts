import { Group } from "../../group/model";
import { User } from "../../user/model";

export type Author = {
  login: string,
  avatar: string,
}

export interface Post {
  id: number,
  description: string | undefined,
  image: string | undefined,
  createdAt: string,
  author: {
    name: string,
    avatar: string | undefined,
  },
  postLikes: Like[],
}

export type Like = {
  id: number,
  userId: number | undefined,
  postUserId: number,
}
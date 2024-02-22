import { Creation, OneCreation } from "../../creation";
import { Image, OneImage } from "../../image";

export interface Post {
  id: number,
  description: string | undefined,
  creation: Creation,
  postImages: Image[],
}

export type PostType = 'ownPost' | 'repost';

export interface OnePost {
  id: number,
  description: string | undefined,
  creationId: number,
  creation: OneCreation,
  postImages: OneImage[],
  type: PostType,
  repostId: number | null,
  isReposted: boolean,
  repostsNumber: number,
  repost: {
    id: number,
    description: string | undefined,
    creationId: number,
    creation: OneCreation,
    postImages: OneImage[],
    isReposted: boolean,
    repostsNumber: number,
  } | null,
}
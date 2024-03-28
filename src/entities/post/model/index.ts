import { Creation, OneCreation } from "../../creation";
import { Image, OneImage } from "../../image";
import { MyMusic } from "../../music";

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
  musics: MyMusic[],
  type: PostType,
  repostId: number | null,
  isReposted: boolean,
  repostsNumber: number,
  repost: OnePost,
}
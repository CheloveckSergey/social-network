import { Author } from "../../author/model";
import { Comment } from "../../comment/model";
import { Creation } from "../../creation";
import { Group } from "../../group/model";
import { Image } from "../../image";
import { User } from "../../user/model/types";

// export interface Post {
//   id: number,
//   description: string | undefined,
//   image: string | undefined,
//   createdAt: string,
//   author: Author,
//   postLikes: Like[],
//   comments: Comment[],
// }

// export type Like = {
//   id: number,
//   userId: number | undefined,
//   postUserId: number,
// }

// export interface Post {
//   id: number,
//   description: string | undefined,
//   creationId: number,
//   creation: {
//     id: number,
//     authorId: number,
//     author: {
//       id: number,
//       name: string,
//       typeId: number,
//       type: {
//         id: number,
//         code: number,
//         name: string,
//       }
//     },
//     typeId: number,
//     type: {
//       id: number,
//       code: number,
//       name: string,
//     },
//     comments: {
//       id: number,
//       text: string,
//       creationId: number,
//       creation
//     }[],
//     likes: {

//     }
//   }
// }

export interface Post {
  id: number,
  description: string | undefined,
  creation: Creation,
  postImages: Image[],
}
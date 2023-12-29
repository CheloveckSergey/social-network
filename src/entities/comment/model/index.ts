// export type Comment = {
//   id: number,
//   text: string,
//   userId: number,
//   imageId?: number | undefined,
//   postId?: number | undefined,
//   user: {
//     login: string,
//     avatar: string,
//   },
//   createdAt: string,
// }

import { Creation } from "../../creation"

export type Comment = {
  id: number,
  text: string,
  ownCreation: Creation,
  ownCreationId: number,
  creationId: number,
  creation: Creation,
}
import { Author } from "../../author/model"

// export type Group = {
//   id: number,
//   name: string,
//   avatar: string | undefined,
//   adminId: number,
//   author: Author
// }

// export type Description = {
//   quote: string,
//   subject: string,
// }

// export type CreateGroupDto = {
//   name: string,
// }

// export type DeleteGrouDto = {
//   groupId: number,
// }

export interface Group {
  id: number,
  name: string,
  avatar: string | undefined,
  author: Author,
}

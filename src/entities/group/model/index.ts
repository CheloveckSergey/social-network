import { Author, OneAuthor } from "../../author";

export interface Group {
  id: number,
  name: string,
  avatar: string | undefined,
  membersNumber: number,
  authorId: number,
  author: Author,
}

export interface OneGroup extends Group {
  author: OneAuthor,
}
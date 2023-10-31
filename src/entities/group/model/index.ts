import { Author, AuthorWithSubscribed } from "../../author";

export interface Group {
  id: number,
  name: string,
  avatar: string | undefined,
  author: Author,
}

export interface GroupWithSubscribed {
  id: number,
  name: string,
  avatar: string | undefined,
  author: AuthorWithSubscribed,
} 

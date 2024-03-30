// export type Author = {
//   id: number,
//   name: string,
//   avatar: string | undefined,
//   authorType: string,
//   subscribedFor: boolean,
// }

export enum AuthorTypeCodes {
  USER = 10,
  GROUP = 20,
}

export enum AuthorTypeNames {
  USER = 'user',
  GROUP = 'group',
}

export type AuthorType = {
  id: number,
  code: AuthorTypeCodes,
  name: AuthorTypeNames,
}

export type Author = {
  id: number,
  name: string,
  avatar: string | undefined,
  type: AuthorType,
}

export interface OneAuthor {
  id: number,
  name: string,
  avatar: string | undefined,
  type: AuthorType,
  subscribed: boolean,
  subsNumber: number,
}

export interface AuthorWithSubscribed {
  id: number,
  name: string,
  avatar: string | undefined,
  type: AuthorType,
  subscribed: boolean,
}
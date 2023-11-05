import { Author, AuthorWithSubscribed } from "../../author"

export type User = {
  id: number,
  login: string,
  avatar: string,
  roles: number[],
  author: Author,
}

export type MeUser = {
  id: number,
  login: string,
  avatar: string,
  roles: number[],
  accessToken: string,
  author: Author,
}

export type OneUser = {
  id: number,
  login: string,
  avatar: string,
  isFriend: boolean,
  author: AuthorWithSubscribed,
}

export type Hook<T> = (user: OneUser, effects: T) => {
  headline: string,
  refetch: () => any,
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
}
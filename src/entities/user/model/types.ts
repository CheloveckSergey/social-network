import { Author, AuthorWithSubscribed } from "../../author"

export interface User {
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

type FriendStatus = 'friend' | 'not-friend' | 'request';

export interface OneUser {
  id: number,
  login: string,
  avatar: string,
  author: AuthorWithSubscribed,
  friendStatus: FriendStatus;
}

export type UserHook<T> = (user: OneUser, effects: T) => {
  headline: string,
  refetch: () => any,
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
}
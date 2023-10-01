export type User = {
  id: number,
  login: string,
  avatar: string,
  roles: number[],
}

export type MeUser = {
  id: number,
  login: string,
  avatar: string,
  roles: number[],
  accessToken: string,
}

export type OneUser = {
  id: number,
  login: string,
  avatar: string,
}
export type Group = {
  id: number
  name: string,
  avatar: string | undefined,
  description: Description,

}

export type Description = {
  quote: string,
  subject: string,
}

export type CreateGroupDto = {
  name: string,
}

export type DeleteGrouDto = {
  groupId: number,
}

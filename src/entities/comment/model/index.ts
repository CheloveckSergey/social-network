export type Comment = {
  id: number,
  text: string,
  userId: number,
  imageId?: number | undefined,
  postId?: number | undefined,
  user: {
    login: string,
    avatar: string,
  },
  createdAt: string,
}
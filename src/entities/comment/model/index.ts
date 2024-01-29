import { Creation, OneCommentCreation } from "../../creation"

export type Comment = {
  id: number,
  text: string,
  ownCreation: Creation,
  ownCreationId: number,
  creationId: number,
  creation: Creation,
  responseToCommentId: number | null,
  responseToComment: Comment | null,
}

export type OneComment = {
  id: number,
  text: string,
  ownCreationId: number,
  ownCreation: OneCommentCreation,
  creationId: number,
  creation: Creation,
  responseToCommentId: number,
  responseToComment: Comment,
}

export interface CommentsBlock extends OneComment {
  innerComments: OneComment[],
}

export type CommentsStructure = CommentsBlock[];
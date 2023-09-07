import { ILike } from "../../../fetures/favourites/model";
import { Author } from "../../author/model";

export type Image = {
  id: number,
  value: string,
  authorId: number,
  author: Author,
  createdAt: string,
  likes: ILike[],
}
import { ILike } from "../../../fetures/favourites/model";
import { Author } from "../../author/model";
import { Creation } from "../../creation";

// export type Image = {
//   id: number,
//   value: string,
//   authorId: number,
//   author: Author,
//   createdAt: string,
//   likes: ILike[],
// }

export interface Image {
  id: number,
  value: string,
  creation: Creation,
}
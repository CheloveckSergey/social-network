import { ILike } from "../../../fetures/favourites/model";
import { Author } from "../../author/model";
import { Creation, OneCreation } from "../../creation";

export interface Image {
  id: number,
  value: string,
  creation: Creation,
}

export interface OneImage {
  id: number,
  value: string,
  creationId: number,
  creation: OneCreation,
}
import { ILike } from "../../../fetures/favourites/model";
import { Author } from "../../author/model";
import { Creation, OneCreation } from "../../creation";

export interface Album {
  id: number,
  name: string,
  creationId: number,
  creation: Creation,
}

export interface Image {
  id: number,
  value: string,
  creation: Creation,
  creationId: number,
}

export interface OneImage {
  id: number,
  value: string,
  creationId: number,
  creation: OneCreation,
}

export interface OneAlbumImage {
  id: number,
  value: string,
  creationId: number,
  creation: OneCreation,
  albumId: number,
  album: Album,
}


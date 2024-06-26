import { Creation, OneCreation } from "../../creation";

export interface Album {
  id: number,
  name: string,
  creationId: number,
  creation: Creation,
}

export interface OneAlbum {
  id: number,
  name: string,
  creationId: number,
  creation: OneCreation,
}

export interface OneAlbumWithImages {
  id: number,
  name: string,
  creationId: number,
  creation: Creation,
  images: OneAlbumImage[],
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
  albumId: number,
  creationId: number,
  creation: OneCreation,
}


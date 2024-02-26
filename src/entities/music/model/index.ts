export type Music = {
  id: number,
  name: number,
  value: string,
  image?: string,
  musicianId: number,
  musician: Musician,
}

export type Musician = {
  id: number,
  name: string,
  image?: string,
}

export interface MusicListInterface {
  musics: Music[],
  isLoading: boolean,
  isError: boolean,
}
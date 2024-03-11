export interface Music {
  id: number,
  name: number,
  value: string,
  image?: string,
  musicianId: number,
  musician: Musician,
}

export interface MyMusic extends Music {
  added: boolean,
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
  addMusic: (music: Music) => void,
  deleteMusic: (musicId: number) => void,
}
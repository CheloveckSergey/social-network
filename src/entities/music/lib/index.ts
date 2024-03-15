import { useQuery } from "react-query"
import { MusicApi, MusicianApi } from "../api"
import { useState } from "react"
import { Music, MusicListInterface, Musician, MyMusic } from "../model"

const musicKeys = {
  musicByMusician: {
    root: 'musicByMusician',
    slug: (musicianId: number) => [musicKeys.musicByMusician.root, musicianId],
  },
  allMusic: {
    root: 'allMusic',
  },
  musician: {
    root: 'musician',
    slug: (musicianId: number) => [musicKeys.musician.root, musicianId],
  },
  addedMusic: {
    root: 'addedMusic',
    slug: (authorId: number) => [musicKeys.addedMusic.root, authorId],
  },
}

const useAllMusic = (authorId: number) => {

  const [musics, setMusics] = useState<MyMusic[]>([]);

  const status = useQuery({
    queryKey: musicKeys.allMusic.root,
    queryFn: () => {
      return MusicApi.getAll(authorId);
    },
    onSuccess: (data) => {
      setMusics(data);
    }
  });

  function addMusic(music: Music) {
    setMusics(prev => {
      const newMusic: MyMusic = {
        ...music,
        added: false,
      }
      return [...prev, newMusic];
    })
  }

  function deleteMusic(musicId: number) {
    setMusics(prev => {
      return prev.filter(music => music.id !== musicId);
    })
  }

  function addMusicToAdded(music: Music) {
    setMusics(prev => {
      return prev.map(_music => {
        if (_music.id === music.id) {
          return {
            ..._music,
            added: true,
          }
        } else {
          return _music;
        }
      })
    });
  }

  function deleteMusicFromAdded(music: Music) {
    setMusics(prev => {
      return prev.map(_music => {
        if (_music.id === music.id) {
          return {
            ..._music,
            added: false,
          }
        } else {
          return _music;
        }
      })
    });
  }

  const musicList = {
    musics,
    isLoading: status.isLoading,
    isError: status.isError,

    addMusic,
    deleteMusic,
    addMusicToAdded,
    deleteMusicFromAdded,
  }

  return musicList;
}

const useMusicByMusician = (musicianId: number) => {

  const [musics, setMusics] = useState<Music[]>([]);

  const status = useQuery({
    queryKey: musicKeys.musicByMusician.slug(musicianId),
    queryFn: () => {
      return MusicApi.getAllByMusician(musicianId);
    },
    onSuccess: (data) => {
      setMusics(data);
    }
  });

  function addMusic(music: Music) {
    setMusics(prev => {
      return [...prev, music];
    })
  }

  function deleteMusic(musicId: number) {
    console.log('deleteMusic');
    setMusics(prev => {
      return prev.filter(music => music.id !== musicId);
    })
  }

  const musicList = {
    musics,
    isLoading: status.isLoading,
    isError: status.isError,

    addMusic,
    deleteMusic
  }

  return musicList;
}

const useMusician = (musicianId: number) => {

  const [musician, setMusician] = useState<Musician>();

  const status = useQuery({
    queryKey: musicKeys.musician.slug(musicianId),
    queryFn: () => {
      return MusicianApi.getById(musicianId);
    },
    onSuccess: (data) => {
      setMusician(data);
    }
  });

  function updateAvatar(image: string) {
    setMusician(prev => {
      if (prev) {
        const musician: Musician = {
          ...prev,
          image
        }
        return musician;
      } else {
        return undefined;
      }
    })
  }

  return {
    musician,
    isLoading: status.isLoading,
    isError: status.isError,
    updateAvatar,
  }
}

const useAddedMusic = (authorId: number) => {
  const [musics, setMusics] = useState<MyMusic[]>([]);

  const status = useQuery({
    queryKey: musicKeys.addedMusic.slug(authorId),
    queryFn: () => {
      return MusicApi.getAllAddedMusic(authorId);
    },
    onSuccess: (data) => {
      setMusics(data);
    }
  });

  function addMusic(music: Music) {
    setMusics(prev => {
      return prev.map(_music => {
        if (_music.id === music.id) {
          return {
            ..._music,
            added: true,
          }
        } else {
          return _music;
        }
      });
    })
  }

  function deleteMusic(music: Music) {
    setMusics(prev => {
      return prev.map(_music => {
        if (_music.id === music.id) {
          return {
            ..._music,
            added: false,
          }
        } else {
          return _music;
        }
      });
    })
  }

  return {
    musics,
    isLoading: status.isLoading,
    isError: status.isError,

    addMusic,
    deleteMusic,
  }
}

export const MusicsLib = {
  useAllMusic,
  useMusician,
  useMusicByMusician,
  useAddedMusic,
}
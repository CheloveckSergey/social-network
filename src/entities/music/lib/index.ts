import { useQuery } from "react-query"
import { MusicApi } from "../api"
import { useState } from "react"
import { Music, MusicListInterface } from "../model"

const useAllMusic = () => {

  const [musics, setMusics] = useState<Music[]>([]);

  const status = useQuery({
    queryFn: () => {
      return MusicApi.getAll();
    },
    onSuccess: (data) => {
      setMusics(data);
    }
  });

  const musicList: MusicListInterface = {
    musics,
    isLoading: status.isLoading,
    isError: status.isError,
  }

  return musicList;
}

export const MusicsLib = {
  useAllMusic,
}
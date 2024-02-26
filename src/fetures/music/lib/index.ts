import { useMutation } from "react-query"
import { MusicApi } from "../../../entities/music"

interface CreateMusicProps {
  musicName: string,
  musicianName: string,
  musicFile: File,
}

const useCreateMusic = () => {

  const status = useMutation({
    mutationFn: ({musicName, musicianName, musicFile} : CreateMusicProps) => {
      return MusicApi.create(musicName, musicianName, musicFile);
    }
  })

  return status;
}

export const MusicFeaturesLib = {
  useCreateMusic,
}
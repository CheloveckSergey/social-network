import { useMutation } from "react-query"
import { Music, MusicApi, MusicianApi } from "../../../entities/music"

interface CreateMusicProps {
  musicName: string,
  musicianName: string,
  musicFile: File,
  imageFile?: File,
  albumId?: number,
}

const useCreateMusic = (addMusic?: (music: Music) => void) => {

  const status = useMutation({
    mutationFn: ({musicName, musicianName, musicFile, imageFile, albumId} : CreateMusicProps) => {
      return MusicApi.create(musicName, musicianName, musicFile, imageFile, albumId);
    },
    onSuccess: (data) => {
      if (addMusic) {
        addMusic(data);
      }
    }
  })

  return status;
}

interface DeleteMusicProps {
  id: number,
}

const useDeleteMusic = (deleteMusic?: (musicId: number) => void) => {

  const status = useMutation({
    mutationFn: ({ id } : DeleteMusicProps) => {
      return MusicApi.delete(id);
    },
    onSuccess: (data) => {
      if (deleteMusic) {
        deleteMusic(data.id)
      }
    }
  })

  return status;
}

interface UpdateMusicianAvatarProps {
  musicianId: number,
  imageFile: File,
}
const useUpdateMusicianAvatar = (updateAvatar?: (image: string) => void) => {

  const status = useMutation({
    mutationFn: ({musicianId, imageFile} : UpdateMusicianAvatarProps) => {
      return MusicianApi.updateAvatar(musicianId, imageFile);
    },
    onSuccess: (data) => {
      if (updateAvatar && data.image) {
        updateAvatar(data.image)
      }
    }
  });

  return status;
}

interface AddDeleteMusicToAddedProps {
  authorId: number,
  musicId: number,
}
const useAddDeleteMusicToAdded = (
  added: boolean, 
  addMusicToAdded?: (music: Music) => void,
  deleteMusicFromAdded?: (music: Music) => void,
) => {

  const addStatus = useMutation({
    mutationFn: ({ authorId, musicId } : AddDeleteMusicToAddedProps) => {
      return MusicApi.addMusicToAdded(musicId, authorId);
    },
    onSuccess: (data) => {
      console.log(data);
      if (addMusicToAdded) {
        addMusicToAdded(data);
      }
    }
  });

  const deleteStatus = useMutation({
    mutationFn: ({ authorId, musicId } : AddDeleteMusicToAddedProps) => {
      return MusicApi.deleteMusicFromAdded(musicId, authorId);
    },
    onSuccess: (data) => {
      console.log(data);
      if (deleteMusicFromAdded) {
        deleteMusicFromAdded(data);
      }
    }
  });

  if (added) {
    return deleteStatus;
  } else {
    return addStatus;
  }
}

export const MusicFeaturesLib = {
  useCreateMusic,
  useDeleteMusic,
  useUpdateMusicianAvatar,
  useAddDeleteMusicToAdded,
}
import { useMutation } from "react-query"
import { AlbumsApi, OneAlbum } from "../../../entities/image"

interface CreateAlbumDto {
  name: string,
}

const useCreateAlbum = (authorId: number, addAlbum: (album: OneAlbum) => void) => {

  const createAlbumStatus = useMutation(
    ({ name } : CreateAlbumDto) => {
      return AlbumsApi.createAlbum(authorId, name);
    },
    {
      onSuccess: (data) => {
        addAlbum(data);
      }
    }
  );

  return {
    create: createAlbumStatus.mutateAsync,
    isLoading: createAlbumStatus.isLoading,
    isError: createAlbumStatus.isError,
  }
}

export const AlbumFeaturesLib = {
  useCreateAlbum,
}
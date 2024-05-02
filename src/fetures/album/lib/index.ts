import { useMutation } from "react-query"
import { AlbumImagesApi, AlbumsApi, OneAlbum } from "../../../entities/image"

interface CreateAlbumDto {
  name: string,
}

const useCreateAlbum = (authorId: number, addAlbum?: (album: OneAlbum) => void) => {

  const createAlbumStatus = useMutation(
    ({ name } : CreateAlbumDto) => {
      return AlbumsApi.createAlbum(authorId, name);
    },
    {
      onSuccess: (data) => {
        if (addAlbum) {
          addAlbum(data);
        }
      }
    }
  );

  return createAlbumStatus;
}

interface DeleteAlbumProps {
  albumId: number,
}
const useDeleteAlbum = (deleteAlbum?: (albumId: number) => void) => {

  const deleteAlbumStatus = useMutation(
    ({ albumId } : DeleteAlbumProps) => {
      return AlbumImagesApi.deleteAlbum(albumId);
    },
    {
      onSuccess: (data) => {
        if (deleteAlbum) {
          deleteAlbum(data.id);
        }
      }
    }
  );

  return deleteAlbumStatus;
}

export const AlbumFeaturesLib = {
  useCreateAlbum,
  useDeleteAlbum,
}
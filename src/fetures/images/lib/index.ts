import { useMutation } from "react-query"
import { AlbumImagesApi, OneAlbumImage } from "../../../entities/image"

interface UseCreateImageProps {
  file: File,
  albumId?: number,
}

const useCreateALbumImage = (authorId: number, addImage?: (image: OneAlbumImage) => void) => {
  const createImageStatus = useMutation(
    async (props: UseCreateImageProps) => {
      return AlbumImagesApi.createImageByAuthor(authorId, props.file, props.albumId);
    },
    {
      onSuccess: (data) => {
        if (addImage) {
          addImage(data);
        }
      }
    }
  );

  return {
    mutate: createImageStatus.mutateAsync,
    isLoading: createImageStatus.isLoading,
    isError: createImageStatus.isError,
  }
}

export const ImagesActionsLib = {
  useCreateALbumImage,
}
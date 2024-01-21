import { useMutation } from "react-query"
import { AlbumImagesApi } from "../../../entities/image"

interface UseCreateImageProps {
  file: File,
  albumId?: number,
}

const useCreateALbumImage = (authorId: number) => {
  const createImageStatus = useMutation(
    async (props: UseCreateImageProps) => {
      return AlbumImagesApi.createImageByAuthor(authorId, props.file, props.albumId);
    }
  );

  return {
    mutate: createImageStatus.mutate,
    isLoading: createImageStatus.isLoading,
    isError: createImageStatus.isError,
  }
}

export const ImagesActionsLib = {
  useCreateALbumImage,
}
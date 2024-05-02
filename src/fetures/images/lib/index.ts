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

interface UseDeleteImageProps {
  imageId: number,
}
const useDeleteAlbumImage = (deleteImage?: (imageId: number) => void) => {
  const deleteImageStatus = useMutation(
    async (props: UseDeleteImageProps) => {
      return AlbumImagesApi.deleteImage(props.imageId);
    },
    {
      onSuccess: (data) => {
        if (deleteImage) {
          deleteImage(data.id);
        }
      },
    }
  );

  return deleteImageStatus;
}

export const ImagesActionsLib = {
  useCreateALbumImage,
  useDeleteAlbumImage,
}
import { useState } from "react"
import { OneAlbumImage } from "../model"
import { useQuery } from "react-query";
import { AlbumImagesApi } from "../api";

const imagesKeys = {
  albumImages: {
    root: 'albumImages',
    slug: (authorId: number) => [imagesKeys.albumImages.root, authorId],
  }
}

const useAlbumImages = (authorId: number) => {
  const [images, setImages] = useState<OneAlbumImage[]>([]);

  const imagesStatus = useQuery({
    queryKey: imagesKeys.albumImages.slug(authorId),
    queryFn: () => {
      return AlbumImagesApi.getAllAlbumImagesByAuthor(authorId);
    },
    onSuccess: (data) => {
      setImages(data);
    }
  });

  return {
    images,
    isLoading: imagesStatus.isLoading,
    isError: imagesStatus.isError,
  }
}

export const ImagesLib = {
  useAlbumImages,
}
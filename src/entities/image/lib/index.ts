import { useState } from "react"
import { OneAlbum, OneAlbumImage } from "../model"
import { useQuery } from "react-query";
import { AlbumImagesApi, AlbumsApi } from "../api";

const imagesKeys = {
  albumImages: {
    root: 'albumImages',
    slug: (authorId: number) => [imagesKeys.albumImages.root, authorId],
  },
  albums: {
    root: 'albums',
    slug: (authorId: number) => [imagesKeys.albums.root, authorId],
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

  // function setIsLiked(imageId: number, isLiked: boolean) {
  //   const newImages: OneAlbumImage[] = images.map(image => {
  //     if (image.id === imageId) {
  //       const newImage: OneAlbumImage = {
  //         ...image,
  //         creation: {
  //           ...image.creation,
  //           isLiked,
  //         }
  //       }
  //       return image;
  //     } else {
  //       return image;
  //     }
  //   });
  //   setImages(newImages);
  // }

  return {
    images,
    isLoading: imagesStatus.isLoading,
    isError: imagesStatus.isError,
    // setIsLiked,
  }
}

const useAlbums = (authorId: number) => {

  const [albums, setAlbums] = useState<OneAlbum[]>([]);

  const albumsStatus = useQuery({
    queryKey: imagesKeys.albums.slug(authorId),
    queryFn: () => {
      return AlbumsApi.getAllAlbumsWithOneImagesByAuthorId(authorId);
    },
    onSuccess: (data) => {
      setAlbums(data);
    }
  });

  function setIsLiked(imageId: number, isLiked: boolean) {
    const newAlbums: OneAlbum[] = albums.map(album => {
      return {
        ...album,
        images: album.images.map(image => {
          if (image.id === imageId) {
            const newImage: OneAlbumImage = {
              ...image,
              creation: {
                ...image.creation,
                isLiked,
                likeNumber: isLiked ? image.creation.likeNumber + 1 : image.creation.likeNumber - 1,
              }
            }
            return newImage;
          } else {
            return image;
          }
        }),
      }
    })
    setAlbums(newAlbums);
  }

  function addAlbum(album: OneAlbum) {
    const newAlbums: OneAlbum[] = [...albums, album];
    setAlbums(newAlbums);
  }

  return {
    albums,
    isLoading: albumsStatus.isLoading,
    isError: albumsStatus.isError,
    setIsLiked,
    addAlbum,
  }
}

export const ImagesLib = {
  useAlbumImages,
  useAlbums,
}
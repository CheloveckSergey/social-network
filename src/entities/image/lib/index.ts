import { useState } from "react"
import { OneAlbum, OneAlbumImage, OneImage } from "../model"
import { useQuery } from "react-query";
import { AlbumImagesApi, AlbumsApi } from "../api";

const imagesKeys = {
  albumImages: {
    root: 'albumImages',
    slug: (authorId: number) => [imagesKeys.albumImages.root, authorId],
  },
  albumImagesByAlbum: {
    root: 'albumImagesByAlbum',
    slug: (albumId: number) => [imagesKeys.albumImagesByAlbum.root, albumId],
  },
  albums: {
    root: 'albums',
    slug: (authorId: number) => [imagesKeys.albums.root, authorId],
  },
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

  function addImage(image: OneAlbumImage) {
    const newImages = [...images, image];
    setImages(images);
  }

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
    addImage,
  }
}

const useAlbumImagesByAlbum = (albumId: number) => {

  const [images, setImages] = useState<OneAlbumImage[]>([]);

  const status = useQuery({
    queryKey: imagesKeys.albumImagesByAlbum.slug(albumId),
    queryFn: () => {
      return AlbumImagesApi.getAllImagesByAlbum(albumId);
    },
    onSuccess: (data) => {
      setImages(data);
    }
  });

  function addImage(image: OneAlbumImage) {
    setImages(prev => [...prev, image]);
  }

  function deleteImage(imageId: number) {
    const newImages = images.filter(image => {
      if (image.id === imageId) {
        return false;
      } else {
        return true;
      }
    });
    setImages(newImages);
  }

  function setLiked(isLiked: boolean, imageId: number) {
    setImages(prev => prev.map(image => {
      if (image.id === imageId) {
        return {
          ...image,
          creation: {
            ...image.creation,
            isLiked,
            likeNumber: isLiked ? image.creation.likeNumber + 1 : image.creation.likeNumber - 1,
          }
        }
      } else {
        return image;
      }
    }))
  }

  return {
    images,
    isLoading: status.isLoading,
    isError: status.isError,
    addImage,
    setLiked,
    deleteImage,
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

  // function setIsLiked(imageId: number, isLiked: boolean) {
  //   const newAlbums: OneAlbum[] = albums.map(album => {
  //     return {
  //       ...album,
  //       images: album.images.map(image => {
  //         if (image.id === imageId) {
  //           const newImage: OneAlbumImage = {
  //             ...image,
  //             creation: {
  //               ...image.creation,
  //               isLiked,
  //               likeNumber: isLiked ? image.creation.likeNumber + 1 : image.creation.likeNumber - 1,
  //             }
  //           }
  //           return newImage;
  //         } else {
  //           return image;
  //         }
  //       }),
  //     }
  //   })
  //   setAlbums(newAlbums);
  // }

  function addAlbum(album: OneAlbum) {
    const newAlbums: OneAlbum[] = [...albums, album];
    setAlbums(newAlbums);
  }

  function deleteAlbum(albumId: number) {
    const newAlbums: OneAlbum[] = albums.filter(album => album.id !== albumId);
    setAlbums(newAlbums);
  }

  // function addImage(image: OneAlbumImage) {
  //   const newAlbums = albums.map(album => {
  //     if (album.id === image.albumId) {
  //       const newAlbum: OneAlbum = {
  //         ...album,
  //         images: [...album.images, image],
  //       };
  //       return newAlbum;
  //     } else {
  //       return album;
  //     }
  //   });
  //   setAlbums(newAlbums);
  // }

  return {
    albums,
    isLoading: albumsStatus.isLoading,
    isError: albumsStatus.isError,
    addAlbum,
    deleteAlbum,
  }
}

export const ImagesLib = {
  useAlbumImages,
  useAlbums,
  useAlbumImagesByAlbum,
}
import { FC, useRef, useState } from "react";
import Upbar from "../../widgets/upbar";
import LeftMenu from "../../widgets/leftMenu";
import './styles.scss';
import { useNavigate, useParams } from "react-router-dom";
import { ImageUi, ImagesLib, OneAlbum, OneImage } from "../../entities/image";
import { BiArrowBack } from "react-icons/bi";
import { useAppSelector } from "../../app/store";
import { CommentsWidgets } from "../../widgets/comments";
import { AlbumFeaturesLib } from "../../fetures/album";
import { OneCreation } from "../../entities/creation";
import { ImagesActionsLib } from "../../fetures/images";
import Favourites from "../../fetures/favourites";

function useCanEdit(authorId: number): boolean {
  const { user } = useAppSelector(state => state.user);

  if (user?.author.id === authorId) {
    return true;
  } else {
    return false;
  }
}

interface IPProps {
  authorId: number,
}
const ImagesPanel: FC<IPProps> = ({ authorId }) => {

  const canEdit = useCanEdit(authorId);

  const navigate = useNavigate();

  return (
    <div className="regular-panel images-panel">
      <h3>Images</h3>
      <button
        className="back-button white"
        onClick={() => navigate(-1)}
      >
        <BiArrowBack size={20} />
      </button>
      <hr/>
      <AlbumsList
        authorId={authorId}
        canEdit={canEdit}
      />
    </div>
  )
}

interface ALProps {
  authorId: number,
  canEdit: boolean,
}
const AlbumsList: FC<ALProps> = ({ authorId, canEdit }) => {

  const {
    albums,
    isLoading,
    isError,
    addAlbum,
    deleteAlbum
  } = ImagesLib.useAlbums(authorId);

  const addAlbumStatus = AlbumFeaturesLib.useCreateAlbum(authorId, addAlbum);
  const deleteAlbumStatus = AlbumFeaturesLib.useDeleteAlbum(deleteAlbum);

  return (
    <ImageUi.AlbumsList
      albums={albums}
      isLoading={isLoading}
      isError={isError}
      addAlbumObject={canEdit ? {
        submit: async (name: string) => {
          addAlbumStatus.mutateAsync({name});
        },
        isLoading: addAlbumStatus.isLoading,
        isError: addAlbumStatus.isError,
      } : undefined}
      renderExtraActions={(album: OneAlbum) => [
        {
          body: 'Удалить альбом',
          submit: async () => {
            await deleteAlbumStatus.mutateAsync({albumId: album.id});
          },
          isLoading: deleteAlbumStatus.isLoading,
          isError: deleteAlbumStatus.isError,
        }
      ]}
      renderImagesList={(albumId: number) => <ImagesList 
        albumId={albumId}
        canEdit={canEdit}
        authorId={authorId}
      />}
    />
  )
}

interface ILProps {
  albumId: number,
  authorId: number,
  canEdit: boolean,
}
const ImagesList: FC<ILProps> = ({ albumId, authorId, canEdit }) => {

  const {
    images,
    isLoading,
    isError,
    addImage,
    setLiked,
    deleteImage,
  } = ImagesLib.useAlbumImagesByAlbum(albumId);

  const createImageStatus = ImagesActionsLib.useCreateALbumImage(authorId, addImage);
  const deleteImageStatus = ImagesActionsLib.useDeleteAlbumImage(deleteImage);

  return (
    <ImageUi.ImagesList
      images={images}
      isLoading={isLoading}
      isError={isError}
      albumId={albumId}
      renderCommentsWidget={(creation: OneCreation) => <CommentsWidgets.ImageWindowComments 
        creation={creation}
      />}
      renderImageActions={(image: OneImage) => [
        <Favourites.Actions.LikeButton 
          creation={image.creation}
          effects={{
            setIsLiked: (isLiked: boolean) => setLiked(isLiked, image.id)
          }}
        />
      ]}
      createImageObject={canEdit ? {
        submit: async (imageFile: File, albumId?: number) => {
          await createImageStatus.mutateAsync({file: imageFile, albumId: albumId})
        },
        isLoading: createImageStatus.isLoading,
        isError: createImageStatus.isError,
      } : undefined}
      renderExtraActions={(image: OneImage) => [
        {
          body: 'Удоли',
          submit: async () => {
            await deleteImageStatus.mutateAsync({imageId: image.id})
          },
          isLoading: deleteImageStatus.isLoading,
          isError: deleteImageStatus.isSuccess,
        }
      ]}
    />
  )
}

const Album: FC = () => {
  const { authorId: _authorId } = useParams();
  const authorId = Number(_authorId);

  const { user } = useAppSelector(state => state.user);

  if (!user) {
    return (
      <div>
        There's no user
      </div>
    )
  }

  return (
    <>
      <Upbar />
      <main>
        <LeftMenu />
        <div className="images-page">
          <ImagesPanel authorId={authorId} />
        </div>
      </main>
    </>
  )
}

export default Album;
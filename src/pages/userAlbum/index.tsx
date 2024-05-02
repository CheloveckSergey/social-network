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

interface IPProps {
  authorId: number,
}
const ImagesPanel: FC<IPProps> = ({ authorId }) => {

  const {
    albums,
    isLoading,
    isError,
    addAlbum,
    deleteAlbum,
  } = ImagesLib.useAlbums(authorId);

  const createAlbumStatus = AlbumFeaturesLib.useCreateAlbum(authorId, addAlbum);
  const deleteAlbumStatus = AlbumFeaturesLib.useDeleteAlbum(deleteAlbum);

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
      <ImageUi.AlbumsList
        albums={albums}
        isLoading={isLoading}
        isError={isError}
        addAlbumObject={{
          submit: async (name: string) => {
            createAlbumStatus.mutateAsync({name});
          },
          isLoading: createAlbumStatus.isLoading,
          isError: createAlbumStatus.isError,
        }}
        renderExtraActions={(album: OneAlbum) => [
          {
            body: 'Удалить альбом',
            isLoading: deleteAlbumStatus.isLoading,
            isError: deleteAlbumStatus.isError,
            submit: async () => {
              await deleteAlbumStatus.mutateAsync({albumId: album.id});
            }
          }
        ]}
        renderImagesList={(albumId: number) => <ImagesList
          albumId={albumId}
        />}
      />
    </div>
  )
}

interface ILProps {
  albumId: number,
}
const ImagesList: FC<ILProps> = ({ albumId }) => {

  const { user } = useAppSelector(state => state.user);

  const {
    images,
    isLoading,
    isError,
    addImage,
    deleteImage,
    setLiked,
  } = ImagesLib.useAlbumImagesByAlbum(albumId);

  const createImageStatus = ImagesActionsLib.useCreateALbumImage(user!.author.id, addImage);
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
            setIsLiked: (isLiked: boolean) => setLiked(isLiked, image.id),
          }}
        />
      ]}
      createImageObject={{
        create: async (imageFile: File, albumId?: number) => {
          createImageStatus.mutate({file: imageFile, albumId});
        },
        isLoading: createImageStatus.isLoading,
        isError: createImageStatus.isError,
      }}
      renderExtraActions={(image: OneImage) => [
        {
          body: 'Удоли',
          isLoading: deleteImageStatus.isLoading,
          isError: deleteImageStatus.isSuccess,
          onClick: () => {
            deleteImageStatus.mutateAsync({imageId: image.id})
          }
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
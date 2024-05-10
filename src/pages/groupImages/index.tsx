import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Upbar from "../../widgets/upbar";
import LeftMenu from "../../widgets/leftMenu";
import { ImageUi, ImagesLib, OneAlbum, OneImage } from "../../entities/image";
import Favourites from "../../fetures/favourites";
import { CommentsWidgets } from "../../widgets/comments";
import { GMTypes, GroupsLib, OneGroup, OneGroupWithMembership } from "../../entities/group";
import { SharedUi } from "../../shared/sharedUi";
import { AlbumFeaturesLib } from "../../fetures/album";
import { ImagesActionsLib } from "../../fetures/images";
import { OneCreation } from "../../entities/creation";
import './styles.scss';

function getCanEdit(group: OneGroupWithMembership): boolean {
  if (group.membership === GMTypes.ADMIN || group.membership === GMTypes.MODERATOR) {
    return true;
  } else {
    return false;
  }
}

interface IPProps {
  group: OneGroupWithMembership,
}
const ImagesPanel: FC<IPProps> = ({ group }) => {

  const canEdit = getCanEdit(group)

  const navigate = useNavigate();

  return (
    <div className="regular-panel group-images-panel">
      <div className="head">
        <h2>{group.author.name} / Images</h2>
        <button
          className="back-button white"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      <hr/>
      <AlbumsList
        authorId={group.authorId}
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

export const GroupImages: FC = () => {

  const { groupId: _groupId } = useParams();
  const groupId = Number(_groupId);

  const {
    group,
    isLoading,
    isError,
  } = GroupsLib.useGroup(groupId);

  return (
    <>
      <Upbar />
      <main>
        <LeftMenu />
        <div className="images-page">
          <SharedUi.Helpers.LoadErrorHandler
            isLoading={isLoading}
            isError={isError}
          >
            {group?.membership ? (
              <ImagesPanel group={group} />
            ) : (
              <SharedUi.Divs.Empty
                body="Forbidden"
              />
            )}
          </SharedUi.Helpers.LoadErrorHandler>
        </div>
      </main>
    </>
  )
}
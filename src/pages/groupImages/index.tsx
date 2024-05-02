import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Upbar from "../../widgets/upbar";
import LeftMenu from "../../widgets/leftMenu";
import { ImageUi, ImagesLib, OneAlbum, OneImage } from "../../entities/image";
import { BiArrowBack } from "react-icons/bi";
import Favourites from "../../fetures/favourites";
import { CommentsWidgets } from "../../widgets/comments";
import { GMTypes, GroupsLib, OneGroup, OneGroupWithMembership } from "../../entities/group";
import { SharedUi } from "../../shared/sharedUi";
import { AlbumFeaturesLib } from "../../fetures/album";
import { ImagesActionsLib } from "../../fetures/images";
import { OneCreation } from "../../entities/creation";
import './styles.scss';

interface IPProps {
  group: OneGroupWithMembership,
}
const ImagesPanel: FC<IPProps> = ({ group }) => {

  const [curImageIndex, setCurImageIndex] = useState<number>(0);

  let canEdit: boolean;

  if (group.membership === GMTypes.ADMIN || group.membership === GMTypes.MODERATOR) {
    canEdit = true;
  } else {
    canEdit = false;
  }

  const {
    albums,
    isLoading,
    isError,
    addAlbum,
  } = ImagesLib.useAlbums(group.authorId);

  const addAlbumStatus = AlbumFeaturesLib.useCreateAlbum(group.authorId, addAlbum);
  const deleteAlbumStatus = AlbumFeaturesLib.useDeleteAlbum();

  const navigate = useNavigate();

  return (
    <div className="regular-panel group-images-panel">
      <h2>Images</h2>
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
              isLoading: deleteAlbumStatus.isLoading,
              isError: deleteAlbumStatus.isError,
              submit: async () => {
                await deleteAlbumStatus.mutateAsync({albumId: album.id});
              }
            }
          ]}
          renderImagesList={(albumId: number) => <ImagesList 
            albumId={albumId}
            canEdit={canEdit}
            authorId={group.authorId}
          />}
        />
    </div>
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
        create: async (imageFile: File, albumId?: number) => {
          createImageStatus.mutate({file: imageFile, albumId: albumId})
        },
        isLoading: createImageStatus.isLoading,
        isError: createImageStatus.isError,
      } : undefined}
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
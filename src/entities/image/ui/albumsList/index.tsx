import { FC, useState } from "react";
import { OneAlbum, OneAlbumImage } from "../../model";
import { SharedUi } from "../../../../shared/sharedUi";
import { ImageUi } from "..";
import './styles.scss';
import { ModalWindows, UseModalWindow } from "../../../../widgets/anotherModalWindow/ui";
import { useAppSelector } from "../../../../app/store";

interface ALProps {
  albums: OneAlbum[],
  isLoading: boolean,
  isError: boolean,
  setIsLiked: (imageId: number, isLiked: boolean) => void,
  addAlbum: (album: OneAlbum) => void,
  addImage: (image: OneAlbumImage) => void,
  renderAlbum: (album: OneAlbum, index: number) => React.ReactNode | React.ReactNode[],
}
export const AlbumsList: FC<ALProps> = ({ albums, isLoading, isError, setIsLiked, addAlbum, addImage, renderAlbum }) => {

  const { user } = useAppSelector(state => state.user);

  const [showAddAlbumWindow, setShowAddAlbumWindow] = useState<boolean>(false);

  return (
    <div className="album-list">
      <SharedUi.Helpers.LoadErrorHandler
        isError={isError}
        isLoading={isLoading}
      >
        {albums && albums.length > 0 ? (
          <>
            {albums.map(renderAlbum)}
            <button className="add-album-panel light-back"
              onClick={() => setShowAddAlbumWindow(true)}
            >
              Add Album
            </button>
          </>
        ) : (
          <SharedUi.Divs.Empty
            body="There's no any albums yet"
          />
        )}
      </SharedUi.Helpers.LoadErrorHandler>
      <UseModalWindow 
        condition={showAddAlbumWindow}
        onClose={() => {
          setShowAddAlbumWindow(false);
        }}
      >
        <ModalWindows.AddAlbumWindow 
          authorId={user!.author.id}
          addAlbum={addAlbum}
          onClose={() => {
            setShowAddAlbumWindow(false);
          }}
        />
      </UseModalWindow>
    </div>
  )
}
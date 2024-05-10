import { FC, useState } from "react";
import { OneAlbum } from "../../model";
import { SharedUi } from "../../../../shared/sharedUi";
import { ImageUi } from "..";
import './styles.scss';
import { ModalWindows, UseModalWindow } from "../../../../widgets/anotherModalWindow/ui";

interface ALProps {
  albums: OneAlbum[],
  isLoading: boolean,
  isError: boolean,
  addAlbumObject?: {
    submit: (name: string) => Promise<any>,
    isLoading: boolean,
    isError: boolean,
  },
  renderExtraActions: (album: OneAlbum) => {
    submit: () => Promise<any>,
    isLoading: boolean,
    isError: boolean,
    body: string | React.ReactNode | React.ReactNode[],
  }[],
  renderImagesList: (albumId: number) => React.ReactNode | React.ReactNode[],
}
export const AlbumsList: FC<ALProps> = ({ 
  albums, 
  isLoading, 
  isError, 
  addAlbumObject, 
  renderExtraActions,
  renderImagesList 
}) => {

  const [showAddAlbumWindow, setShowAddAlbumWindow] = useState<boolean>(false);

  function close() {
    setShowAddAlbumWindow(false);
  }

  return (
    <div className="album-list">
      <SharedUi.Helpers.LoadErrorHandler
        isError={isError}
        isLoading={isLoading}
      >
        {(albums?.length) ? (
          <>
            <div className="head">
              <div className="left">
                <h3>All albums</h3>
              </div>
              <div className="right">
                {addAlbumObject && <button 
                  className="white-back add-album-button"
                  onClick={() => setShowAddAlbumWindow(true)}
                >
                  Add album
                </button>}
              </div>
            </div>
            {albums.map((album, index) => <ImageUi.Album 
              key={index}
              album={album}
              renderExtraActions={renderExtraActions}
              renderImagesList={renderImagesList}
            />)}
          </>
        ) : (
          <SharedUi.Divs.Empty
            body="There's no any albums yet"
          />
        )}
      </SharedUi.Helpers.LoadErrorHandler>
      {addAlbumObject && <UseModalWindow 
        condition={showAddAlbumWindow}
        onClose={close}
      >
        <ModalWindows.AddAlbumWindow 
          submit={(name: string) => {
            addAlbumObject.submit(name)
            .then(() => {
              close();
            })
          }}
          isLoading={addAlbumObject.isLoading}
          isError={addAlbumObject.isError}
        />
      </UseModalWindow>}
    </div>
  )
}
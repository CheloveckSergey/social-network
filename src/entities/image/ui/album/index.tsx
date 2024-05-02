import { FC, useState } from "react";
import { OneAlbum, OneAlbumImage, OneImage } from "../../model";
import './styles.scss';
import { ImageUi } from "..";
import { CommentsWidgets } from "../../../../widgets/comments";
import { SharedUi } from "../../../../shared/sharedUi";

interface AProps {
  album: OneAlbum,
  renderImagesList: (albumId: number) => React.ReactNode | React.ReactNode[],
  renderExtraActions: (album: OneAlbum) => {
    submit: () => Promise<any>,
    isLoading: boolean,
    isError: boolean,
    body: string | React.ReactNode | React.ReactNode[],
  }[],
}
export const Album: FC<AProps> = ({ album, renderImagesList, renderExtraActions }) => {

  return (
    <div className="album">
      <div className="head">
        <h3>{album.name}</h3>
        <SharedUi.Buttons.ExtraActionsDotButton 
          buttons={renderExtraActions(album).map((action, index) => <SharedUi.Buttons.ExtraActionLine 
            key={index}
            body={action.body}
            isLoading={action.isLoading}
            isError={action.isError}
            onClick={() => action.submit()}
          />)}
        />
      </div>
      {renderImagesList(album.id)}
    </div>
  )
}
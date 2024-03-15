import { FC } from "react";
import { Music, MusicListInterface, MyMusic } from "../../model";
import { SharedUi } from "../../../../shared/sharedUi";

interface MLProps<T> {
  renderMusicLine: (music: T, index: number) => React.ReactNode | React.ReactNode[],
  musics: T[],
  isLoading: boolean,
  isError: boolean,
}
export const MusicList = <T,>({ musics, isLoading, isError, renderMusicLine } : MLProps<T>) => {

  return (
    <div className="music-list">
      <SharedUi.Helpers.LoadErrorHandler
        isLoading={isLoading}
        isError={isError}
      >
        {musics?.length ? (
          musics.map(renderMusicLine)
        ) : (
          <SharedUi.Divs.Empty 
            body="Here's no music yet"
          />
        )}
      </SharedUi.Helpers.LoadErrorHandler>
    </div>
  )
}
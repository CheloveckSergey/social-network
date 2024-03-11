import { FC } from "react";
import { Music, MusicListInterface, MyMusic } from "../../model";
import { SharedUi } from "../../../../shared/sharedUi";

interface MLProps {
  renderMusicLine: (music: Music, index: number) => React.ReactNode | React.ReactNode[],
  musics: Music[],
  isLoading: boolean,
  isError: boolean,
}
export const MusicList: FC<MLProps> = ({ musics, isLoading, isError, renderMusicLine }) => {

  return (
    <div className="music-list">
      <SharedUi.Helpers.LoadErrorHandler
        isLoading={isLoading}
        isError={isError}
      >
        {musics ? (
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
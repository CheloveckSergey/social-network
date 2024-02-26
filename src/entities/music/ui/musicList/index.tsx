import { FC } from "react";
import { MusicListInterface } from "../../model";
import { SharedUi } from "../../../../shared/sharedUi";
import { MusicUi } from "..";

interface MLProps {
  musicList: MusicListInterface,
}
export const MusicList: FC<MLProps> = ({ musicList }) => {

  return (
    <div className="music-list">
      <SharedUi.Helpers.LoadErrorHandler
        isLoading={musicList.isLoading}
        isError={musicList.isError}
      >
        {musicList.musics ? (
          musicList.musics.map((music, index) => <MusicUi.MusicLine 
            key={index}
            music={music}
          />)
        ) : (
          <SharedUi.Divs.Empty 
            body="Here's no music yet"
          />
        )}
      </SharedUi.Helpers.LoadErrorHandler>
    </div>
  )
}
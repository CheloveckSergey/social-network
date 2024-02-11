import { FC } from "react";
import Upbar from "../../widgets/upbar";
import LeftMenu from "../../widgets/leftMenu";
import './styles.scss';
import { useNavigate, useParams } from "react-router-dom";
import { ImageUi, ImagesLib } from "../../entities/image";
import { BiArrowBack } from "react-icons/bi";
import { useAppSelector } from "../../app/store";

interface IPProps {
  authorId: number,
}
const ImagesPanel: FC<IPProps> = ({ authorId }) => {

  const {
    albums,
    isLoading,
    isError,
    setIsLiked,
    addAlbum,
  } = ImagesLib.useAlbums(authorId);

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
        setIsLiked={setIsLiked}
        addAlbum={addAlbum}
      />
    </div>
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
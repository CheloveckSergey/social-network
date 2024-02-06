import { FC } from "react";
import Upbar from "../../widgets/upbar";
import LeftMenu from "../../widgets/leftMenu";
import './styles.scss';
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ImageApi, ImagesLib } from "../../entities/image";
import { getImgSrc } from "../../shared/service/images";
import { BiArrowBack } from "react-icons/bi";
import { SharedUi } from "../../shared/sharedUi";

interface ImagesProps {
  userId: number,
}

// const Images: FC<ImagesProps> = ({ userId }) => {

//   return (
//     <SharedUi.Helpers.LoadErrorHandler
//       isLoading={isLoading}
//       isError={isError}
//     >
//       <div className="images">
//         {data && data.map((image, index) => (
//           <ImageCard 
//             key={index}
//             index={index}
//             images={data} 
//             imageClass="image-class"
//           />
//         ))}
//       </div>
//     </LoadErrorHandler>
//   )
// }

const Album: FC = () => {
  const { authorId: _authorId } = useParams();
  const authorId = Number(_authorId);
  const navigate = useNavigate();

  const {
    albums,
    isLoading,
    isError,
  } = ImagesLib.useAlbums(authorId);

  return (
    <>
      <Upbar />
      <main>
        <LeftMenu />
        <div className="images-page">
          <div className="regular-panel images-panel">
            <h3>Images</h3>
            <button
              className="back-button white"
              onClick={() => navigate(-1)}
            >
              <BiArrowBack size={20} />
            </button>
            <hr/>
            {/* <Images userId={_userId} /> */}
          </div>
        </div>
      </main>
    </>
  )
}

export default Album;

export const adsf: FC = () => {
  return (
    <div>asdf</div>
  )
}
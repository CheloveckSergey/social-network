// import { FC } from "react";
// import Upbar from "../../widgets/upbar";
// import LeftMenu from "../../widgets/leftMenu";
// import './styles.scss';
// import { useNavigate, useParams } from "react-router-dom";
// import { useQuery } from "react-query";
// import { ImageApi } from "../../entities/image";
// import LoadErrorHandler from "../../shared/loadErrorHandler";
// import { getImgSrc } from "../../shared/service/images";
// import { BiArrowBack } from "react-icons/bi";
// import { ImageCard } from "../../entities/image/ui";

import { FC } from "react";

// interface ImagesProps {
//   userId: number,
// }

// const Images: FC<ImagesProps> = ({ userId }) => {

//   const { data, isLoading, isError } = useQuery(
//     ['getUserImages', userId],
//     () => {
//       if (userId) {
//         return ImageApi.getAllImagesByUserId(userId);
//       }
//     }
//   );

//   return (
//     <LoadErrorHandler
//       data={data}
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

// const UserAlbum: FC = () => {
//   const { userId } = useParams();
//   const _userId = Number(userId);
//   const navigate = useNavigate();

//   return (
//     <>
//       <Upbar />
//       <main>
//         <LeftMenu />
//         <div className="images-page">
//           <div className="regular-panel images-panel">
//             <h3>Images</h3>
//             <button
//               className="back-button white"
//               onClick={() => navigate(-1)}
//             >
//               <BiArrowBack size={20} />
//             </button>
//             <hr/>
//             {userId && <Images userId={_userId} />}
//           </div>
//         </div>
//       </main>
//     </>
//   )
// }

// export default UserAlbum;

export const adsf: FC = () => {
  return (
    <div>asdf</div>
  )
}
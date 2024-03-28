import { FC, useRef, useState } from "react";
import Upbar from "../../widgets/upbar";
import LeftMenu from "../../widgets/leftMenu";
import './styles.scss';
import { useNavigate, useParams } from "react-router-dom";
import { ImageUi, ImagesLib, OneAlbum, OneImage } from "../../entities/image";
import { BiArrowBack } from "react-icons/bi";
import { useAppSelector } from "../../app/store";
import Favourites from "../../fetures/favourites";
import { CommentsLib, CommentsUi, OneComment } from "../../entities/comment";
import { CommentsActionsUi } from "../../fetures/comments/actions";
import { OneCreation } from "../../entities/creation";

interface IWCProps {
  creation: OneCreation,
}
const ImageWindowComments: FC<IWCProps> = ({ creation }) => {

  const { user } = useAppSelector(state => state.user);

  const [responseToComment, setResponseToComment] = useState<OneComment>();

  function cancelResponse() {
    setResponseToComment(undefined);
  }

  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    comments,
    isLoading,
    isError,
    addComment,
    setIsLiked,
  } = CommentsLib.useComments(creation.id);

  return (
    <>
      <div className="comments">
        <CommentsUi.ImageCommentFeed 
          comments={comments}
          isLoading={isLoading}
          isError={isError}
          addComment={addComment}
          renderComment={(comment: OneComment) => {

            function _setCommentLiked(isLiked: boolean) {
              return setIsLiked(comment.id, isLiked);
            }

            return (
              <CommentsUi.ImageCommentLine 
                key={comment.id}
                comment={comment}
                addComment={addComment}
                setResponseToComment={setResponseToComment}
                likeButton={<Favourites.Actions.SmallLikeButton 
                  creation={comment.ownCreation}
                  effects={{
                    setIsLiked: _setCommentLiked,
                  }}
                />}
              />
            )
          }} 
        />
        <div ref={scrollRef}></div>
      </div>
      
      {user && <CommentsActionsUi.ImageCommentCreator 
        user={user}
        creation={creation}
        addComment={addComment}
        responseToComment={responseToComment}
        cancelResponse={cancelResponse}
      />}
    </>
  )
}

interface IPProps {
  authorId: number,
}
const ImagesPanel: FC<IPProps> = ({ authorId }) => {

  const [curImageIndex, setCurImageIndex] = useState<number>(0);

  const {
    albums,
    isLoading,
    isError,
    setIsLiked,
    addAlbum,
    addImage,
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
        addImage={addImage}
        renderAlbum={(album: OneAlbum, index: number) => <ImageUi.Album 
          key={index}
          album={album}
          setIsLiked={setIsLiked}
          addImage={addImage}
          renderImage={(image: OneImage, index: number) => <ImageUi.ImageCard 
            key={index}
            image={image}
            images={album.images}
            index={index}
            curImageIndex={curImageIndex}
            setCurImageIndex={setCurImageIndex}
            imageClass=""
            actions={[
              <Favourites.Actions.LikeButton 
                creation={image.creation}
                effects={{
                  setIsLiked: (isLiked: boolean) => {
                    setIsLiked(image.id, isLiked);
                  }
                }}
              />
            ]}
            renderComments={<ImageWindowComments creation={image.creation} />}
          />}
        />}
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
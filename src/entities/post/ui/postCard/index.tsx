import { FC, useEffect, useState } from "react";
import { OnePost, Post } from "../../model";
import "./styles.scss";
import { useAppSelector } from "../../../../app/store";
import { CommentSection } from "./commentSection";
import { HeadSection } from "./headSection";
import { ContentSection } from "./contentSection";
import { BottomSection } from "./bottomSection";
import { OneCreation } from "../../../creation";
import { PostsLib } from "../../lib";
import { MyMusic } from "../../../music";
import { OneImage } from "../../../image";

function getTargetPost(post: OnePost): OnePost {
  let targetPost = post;
  while (targetPost.type !== 'ownPost') {
    targetPost = targetPost.repost;
  }
  return targetPost;
}

export interface PostEffects {
  setIsLiked: (isLiked: boolean) => void,
}

interface PostProps {
  post: OnePost
  actions: React.ReactNode | React.ReactNode[],
  renderMusicList: React.ReactNode | React.ReactNode,
  renderPostImage: (
    image: OneImage, 
    images: OneImage[],
    curImageIndex: number,
    setCurIndex: (index: number) => void,
  ) => React.ReactNode | React.ReactNode[],
  renderCommentsWidget: (creation: OneCreation) => React.ReactNode | React.ReactNode[],
}
export const PostCard: FC<PostProps> = ({ post, actions, renderMusicList, renderPostImage, renderCommentsWidget }) => {

  const { user } = useAppSelector(state => state.user);

  const [commentsOpened, setCommentsOpened] = useState<boolean>(false);

  if (post.type === 'repost' && post.repost) {
    return (
      <div className="post regular-panel">
        <div className="post-main">
          <HeadSection 
            author={post.creation.author}
            createdAt={post.creation.createdAt}
          />
          <div className="repost">
            <div className="vertical-line"/>
            <div className="repost-main">
              <HeadSection 
                author={post.repost.creation.author}
                createdAt={post.repost.creation.createdAt}
              />
              <ContentSection 
                description={post.repost.description}
                images={post.repost.postImages}
                renderPostImage={renderPostImage}
                musics={post.repost.musics}
                renderMusicList={renderMusicList}
              />
              <BottomSection
                commentNumber={post.repost.creation.commentNumber} 
                commentsOpened={commentsOpened}
                setCommentsOpened={setCommentsOpened}
                actions={actions}
              />
            </div>
          </div>
        </div>
        {commentsOpened && user && <CommentSection
          creation={post.repost.creation}
          renderCommentsWidget={renderCommentsWidget}
        />}
      </div>
    )
  }

  return (
    <div className="post regular-panel">
      <div className="post-main">
        <HeadSection 
          author={post.creation.author}
          createdAt={post.creation.createdAt}
        />
        <ContentSection 
          description={post.description}
          images={post.postImages}
          renderPostImage={renderPostImage}
          musics={post.musics}
          renderMusicList={renderMusicList}
        />
        <BottomSection
          commentNumber={post.creation.commentNumber} 
          commentsOpened={commentsOpened}
          setCommentsOpened={setCommentsOpened}
          actions={actions}
        />
      </div>
      {commentsOpened && user && <CommentSection
        creation={post.creation}
        renderCommentsWidget={renderCommentsWidget}
      />}
    </div>
  )
}

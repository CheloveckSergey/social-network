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

export interface PostEffects {
  setIsLiked: (isLiked: boolean) => void,
}

interface PostProps {
  post: OnePost
  actions: React.ReactNode | React.ReactNode[],
  renderAddMusicButton: (music: MyMusic) => React.ReactNode | React.ReactNode[],
}
export const PostCard: FC<PostProps> = ({ post: _post, actions, renderAddMusicButton }) => {
  const { user } = useAppSelector(state => state.user);

  const {
    post,
    setIsLiked,
    setImageLiked,
    addComment,
  } = PostsLib.usePostInterface(_post);

  const [commentsOpened, setCommentsOpened] = useState<boolean>(false);

  const effects: PostEffects = {
    setIsLiked,
  }

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
                setImageLiked={setImageLiked}
                musics={post.musics}
                renderAddMusicButton={renderAddMusicButton}
              />
              <BottomSection
                commentNumber={post.repost.creation.commentNumber} 
                effects={effects}
                commentsOpened={commentsOpened}
                setCommentsOpened={setCommentsOpened}
                actions={actions}
              />
            </div>
          </div>
        </div>
        {commentsOpened && user && <CommentSection
          user={user}
          creation={post.repost.creation}
          addComment={addComment}
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
          setImageLiked={setImageLiked}
          musics={post.musics}
          renderAddMusicButton={renderAddMusicButton}
        />
        <BottomSection
          commentNumber={post.creation.commentNumber} 
          effects={effects}
          commentsOpened={commentsOpened}
          setCommentsOpened={setCommentsOpened}
          actions={actions}
        />
      </div>
      {commentsOpened && user && <CommentSection
        user={user}
        creation={post.creation}
        addComment={addComment}
      />}
    </div>
  )
}

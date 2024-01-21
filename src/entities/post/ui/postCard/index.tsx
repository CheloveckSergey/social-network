import { FC, useEffect, useState } from "react";
import { OnePost, Post } from "../../model";
import "./styles.scss";
import { useAppSelector } from "../../../../app/store";
import { CommentSection } from "./commentSection";
import { HeadSection } from "./headSection";
import { ContentSection } from "./contentSection";
import { BottomSection } from "./bottomSection";
import { CommentsLib } from "../../../comment";
import { OneCreation } from "../../../creation";
import { PostsLib } from "../../lib";

export interface PostEffects {
  setIsLiked: (isLiked: boolean) => void,
}

interface PostProps {
  post: OnePost
  actions: React.FC<{creation: OneCreation, effects: PostEffects}>[],
}
export const PostCard: FC<PostProps> = ({ post: _post, actions }) => {
  const { user } = useAppSelector(state => state.user);

  const {
    post,
    setIsLiked,
  } = PostsLib.usePostInterface(_post);

  const [commentsOpened, setCommentsOpened] = useState<boolean>(false);

  const { 
    isLoading,
    isError,
    comments,
    addComment,
    connectComments,
    connected
  } = CommentsLib.useComments(post.creationId);

  const effects: PostEffects = {
    setIsLiked,
  }

  return (
    <div className="post regular-panel">
      <div className="post-main">
        <HeadSection post={post} />
        <ContentSection post={post} />
        <BottomSection
          post={post} 
          effects={effects}
          commentsOpened={commentsOpened}
          setCommentsOpened={setCommentsOpened}
          connected={connected}
          connectComments={connectComments}
          actions={actions}
        />
      </div>
      {commentsOpened && user && <CommentSection
        user={user}
        post={post}
        commentsStatus={{
          data: comments,
          isLoading,
          isError
        }}
        addComment={addComment}
      />}
    </div>
  )
}

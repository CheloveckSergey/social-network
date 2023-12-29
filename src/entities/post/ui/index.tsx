import { FC, useState } from "react";
import { OnePost, Post } from "../model";
import "./styles.scss";
import { useAppSelector } from "../../../app/store";
import { CommentSection } from "./commentSection";
import { HeadSection } from "./headSection";
import { ContentSection } from "./contentSection";
import { BottomSection } from "./bottomSection";
import { CommentsLib } from "../../comment";

export interface Effects {
  setIsLiked: (isLiked: boolean) => void,
}

interface PostProps {
  post: OnePost
}
export const PostCard: FC<PostProps> = ({ post: _post }) => {

  const [post, setPost] = useState<OnePost>(_post);

  const [commentsOpened, setCommentsOpened] = useState<boolean>(false);
  const { user } = useAppSelector(state => state.user);

  function setIsLiked(isLiked: boolean): void {
    setPost({
      ...post,
      creation: {
        ...post.creation,
        isLiked,
        likeNumber: isLiked ? post.creation.likeNumber + 1 : post.creation.likeNumber - 1,
      }
    });
  }

  const { 
    isLoading,
    isError,
    comments,
    error,
    addComment,
    connectComments,
    connected
  } = CommentsLib.useComments(post.creationId);


  const effects = {
    setIsLiked,
  }

  return (
    <div className="post regular-panel">
      <div className="post-main">
        <HeadSection post={post} />
        <ContentSection post={post} />
        <BottomSection
          post={post} 
          commentsOpened={commentsOpened}
          setCommentsOpened={setCommentsOpened}
          effects={effects}
          connectComments={connectComments}
          connected={connected}
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

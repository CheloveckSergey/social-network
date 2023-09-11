import { FC, useRef, useState } from "react";
import { Like, Post } from "../model";
import { BsFileEarmarkPlay, BsThreeDots } from 'react-icons/bs';
import "./styles.scss";
import Favourites from "../../../fetures/favourites";
import { useQuery } from "react-query";
import { PostCommentButton } from "../../comment/ui";
import { getImageSrc } from "../../../shared/service/images";
import { useAppSelector } from "../../../app/store";
import { User } from "../../user/model/redux";
import CommentFeed from "../../../widgets/commentFeed";
import CommentApi from "../../comment/api";

interface PCFProps {
  post: Post,
  user: User,
}

const PostCommentFeed: FC<PCFProps> = ({ post, user }) => {

  const { data, isLoading, isError } = useQuery(
    ['getCommentsByPostId', post.id],
    () => CommentApi.getCommentsByPostId(post.id),
  )

  return (
    <>
      {data && <CommentFeed comments={data} />}
    </>
  )
}

interface CSProps {
  user: User | undefined,
  post: Post,
}

const CommentSection: FC<CSProps> = ({ user, post }) => {
  const [text, setText] = useState<string>('');

  const formRef= useRef<HTMLFormElement>(null);

  const { refetch } = useQuery(
    ['loadComment', user?.id, text],
    () => {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        formData.append('creationId', String(post.id));
        return CommentApi.createPostComment(formData);
      }
    },
    {
      enabled: false,
    }
  )

  return (
    <div className="comments-section">
      {user && <PostCommentFeed user={user} post={post} />}
      <div className="create-comment">
        <img 
          src={getImageSrc(user?.avatar)} 
          alt="IMG" 
          className="avatar-image"
        />
        <form ref={formRef}>
          <label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              name="text"
              className="comment-input" 
            />
          </label>
          <button
            className="inherit-to-green"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.preventDefault();
              refetch();
            }}
          >
            <BsFileEarmarkPlay size={40} />
          </button>
        </form>
      </div>
    </div>
  )
}

interface PostProps {
  post: Post
}

export const PostCard: FC<PostProps> = ({ post }) => {

  const [opened, setOpened] = useState<boolean>(false);
  const { user } = useAppSelector(state => state.user);

  const avatarPost = process.env.REACT_APP_BACK_URL ?  process.env.REACT_APP_BACK_URL + post.author.avatar : 'asdfsadf';
  const postImage = process.env.REACT_APP_BACK_URL && post.image ?  process.env.REACT_APP_BACK_URL + post.image : undefined;


  return (
    <div className="post">
      <div className="up">
        <div className="group-info">
          <img src={avatarPost} alt="IMG" />
          <div>
            <h3 className="title">{post.author.name}</h3>
            <p className="extra">{post.createdAt}</p>
          </div>
        </div>
        <button className="white">
          <BsThreeDots size={25}/>
        </button>
      </div>
      <div className="post-main">
        <p className="description">{post.description}</p>
        {postImage && <img className="post-img" src={postImage} alt="PostIMG" />}
      </div>
      <div className="bottom">
        <Favourites.Actions.PostLike post={post} />
        <PostCommentButton 
          opened={opened} 
          setOpened={setOpened}
          post={post}
        />
      </div>
      {opened && <CommentSection user={user} post={post} />}
    </div>
  )
}

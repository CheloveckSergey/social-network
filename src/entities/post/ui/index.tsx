import { FC, useRef, useState } from "react";
import { Like, Post } from "../model";
import { BsFileEarmarkPlay, BsThreeDots } from 'react-icons/bs';
import "./styles.scss";
import Favourites from "../../../fetures/favourites";
import { useQuery } from "react-query";
import { CreateComment, PostCommentButton } from "../../comment/ui";
import { getImageSrc } from "../../../shared/service/images";
import { useAppSelector } from "../../../app/store";
import CommentFeed from "../../../widgets/commentFeed";
import CommentApi from "../../comment/api";
import { User } from "../../user";

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
      {data && data.length > 0 && <CommentFeed comments={data} />}
    </>
  )
}

interface CSProps {
  user: User,
  post: Post,
}

const CommentSection: FC<CSProps> = ({ user, post }) => {

  return (
    <div className="comments-section">
      {user && <PostCommentFeed user={user} post={post} />}
      <CreateComment post={post} user={user} />
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
    <div className="post regular-panel">
      <div className="post-main">
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
        <div className="body">
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
      </div>
      {opened && user && <CommentSection user={user} post={post} />}
    </div>
  )
}

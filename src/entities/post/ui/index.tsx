import { FC, useState } from "react";
import { Like, Post } from "../model";

import { BsThreeDots } from 'react-icons/bs';
import "./styles.scss";
import Favourites from "../../../fetures/favourites";
import { useAppSelector } from "../../../app/store";
import { PostApi } from "../api";


interface PostProps {
  post: Post
}

export const PostCard: FC<PostProps> = ({ post }) => {



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
      </div>
    </div>
  )
}

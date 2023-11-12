import { FC } from "react";
import { OnePost, Post } from "../../model";
import { Helpers } from "../../../../shared/helpers";
import './styles.scss';

interface HSProps {
  post: OnePost,
}
export const HeadSection: FC<HSProps> = ({ post }) => {
  
  return (
    <div className="post-head">
      <div className="group-info">
        <img src={Helpers.getImageSrc(post.creation.author.avatar)} alt="IMG" />
        <div>
          <h3 className="title">{post.creation.author.name}</h3>
          <p className="extra">{post.creation.createdAt}</p>
        </div>
      </div>
    </div>
  )
}
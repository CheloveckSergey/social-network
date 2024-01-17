import { FC } from "react";
import './styles.scss';
import { Helpers } from "../../../../../shared/helpers";
import { OnePost } from "../../..";
import { useNavigate } from "react-router-dom";

interface HSProps {
  post: OnePost,
}
export const HeadSection: FC<HSProps> = ({ post }) => {

  const navigate = useNavigate();
  //Не определяется тип автора
  return (
    <div className="post-head">
      <div className="group-info">
        <img src={Helpers.getImageSrc(post.creation.author.avatar)} alt="IMG" />
        <div>
          <h3 
            className="title ref"
          >
            {post.creation.author.name}
          </h3>
          <p className="extra">{post.creation.createdAt}</p>
        </div>
      </div>
    </div>
  )
}